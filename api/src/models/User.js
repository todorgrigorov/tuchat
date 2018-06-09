import mongoose from "mongoose";
import crypto from 'crypto';
import ModelSchema from "./ModelSchema";
import SubDocumentSchema from "./SubDocumentSchema";
import User from "./User";

const config = {
    USER_PASSWORD_LENGTH: 10
};

const schema = new ModelSchema({
    code: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    device: new SubDocumentSchema({
        type: {
            type: String,
            required: true
        },
        pushToken: {
            type: String
        }
    }),
    timezone: {
        type: String
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId
    },
    photoId: {
        type: mongoose.Schema.Types.ObjectId
    }
});

schema.statics.generatePassword = function () {
    // TODO: implement pass hashing
    return crypto.randomBytes(config.USER_PASSWORD_LENGTH / 2).toString('hex');
}

schema.statics.getTimezone = async function (filter) {
    const user = await User.findOne(filter);
    return user ? user.timezone : undefined;
}

schema.methods.setDevice = async function (device) {
    const usersWithSameToken = await User.find({
        id: {
            $ne: this.id
        },
        device: {
            pushToken: device.pushToken
        }
    });

    for (const user of usersWithSameToken) {
        user.device.pushToken = null;
        await user.save();
    }

    this.device = {
        type: device.type,
        pushToken: device.pushToken
    };
    return this.save();
}

export default mongoose.model("User", schema);
