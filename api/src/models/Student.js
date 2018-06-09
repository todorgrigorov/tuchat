import mongoose from "mongoose";

import ModelSchema from "./ModelSchema";
import SubDocumentSchema from "./SubDocumentSchema";
import Student from "./Student";
import User from "./User";
import Room from "./Room";

const schema = new ModelSchema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
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
    specialtyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    group: {
        type: String,
        required: true
    },
    rooms: [new SubDocumentSchema({
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    })]
});

schema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

schema.statics.createWithUser = async function (data) {
    const student = await Student.create(data);
    const user = await User.create({
        studentId: student.id,
        code: data.code,
        password: User.generatePassword(),
        email: data.email
    });

    const defaultRooms = await Room.find({
        facultyId: student.facultyId,
        specialtyId: student.specialtyId,
        group: student.group,
        isDefault: true
    });
    for (const r of defaultRooms) {
        student.rooms.push({
            id: r.id
        });
    }
    await student.save();

    return {
        user: await User.findById(user.id, {
            password: 0
        }),
        student: await Student.findById(student.id),
    };
}

schema.statics.loadByGroup = async function (studentId) {
    const result = [];

    const student = await Student.findById(studentId);
    const students = await Student.find({
        _id: {
            $ne: student.id
        },
        facultyId: student.facultyId,
        specialtyId: student.specialtyId,
        group: student.group
    });

    for (const s of students) {
        const user = await User.findOne({
            studentId: s.id
        });

        result.push(Object.assign(s.toJSON(), {
            photoId: user.photoId
        }));
    }

    return result;
}

export default mongoose.model("Student", schema);
