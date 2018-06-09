import mongoose from "mongoose";

import ModelSchema from "./ModelSchema";
import SubDocumentSchema from "./SubDocumentSchema";
import User from "./User";
import Teacher from "./Teacher";

const schema = new ModelSchema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date
    },
    gender: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    facultyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
});

schema.virtual('fullName').get(function () {
    return `${this.title} ${this.firstName} ${this.lastName}`;
});

schema.statics.createWithUser = async function (data) {
    const teacher = await Teacher.create(data);
    const user = await User.create({
        teacherId: teacher.id,
        code: data.code,
        password: User.generatePassword(),
        email: data.email
    });

    return {
        user: await User.findById(user.id, {
            password: 0
        }),
        teacher: await Teacher.findById(teacher.id),
    };
}

export default mongoose.model("Teacher", schema);