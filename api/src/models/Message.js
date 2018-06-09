import mongoose from "mongoose";
import ModelSchema from "./ModelSchema";
import messageType from "./message-type";
import Message from './Message';
import Student from "./Student";
import User from "./User";
import Teacher from "./Teacher";

const schema = new ModelSchema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    content: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        default: messageType.text
    },
    attachmentId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    isIntro: {
        type: Boolean,
        default: false
    },
    isSystem: {
        type: Boolean,
        default: false
    }
});

schema.statics.loadByRoom = async function (roomId) {
    const data = [];

    const messages = await Message.find({
        roomId,
    }).sort({
        createdAt: -1
    });

    for (const m of messages) {
        data.push(await m.getFormattedMessage());
    }

    return data;
}

schema.methods.getFormattedMessage = async function () {
    let result = this.toJSON();

    if (this.userId) {
        const user = await User.findById(this.userId);
        if (!this.isSystem) {
            const student = await Student.findById(user.studentId);
            result = Object.assign({}, this.toJSON(), {
                user: {
                    id: user.id,
                    photoId: user.photoId,
                    name: student.fullName
                }
            });
        } else {
            const teacher = await Teacher.findById(user.teacherId);
            result = Object.assign({}, this.toJSON(), {
                user: {
                    id: user.id,
                    photoId: user.photoId,
                    name: teacher.fullName
                }
            });
        }
    }

    return result;
}

schema.statics.createSystem = async function (data) {
    return Message.create({
        userId: data.userId,
        roomId: data.roomId,
        content: data.content,
        type: data.type,
        isSystem: true
    });
}

export default mongoose.model("Message", schema);
