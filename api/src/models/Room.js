import mongoose from "mongoose";
import ModelSchema from "./ModelSchema";
import _ from 'lodash';

import Student from './Student';
import Room from "./Room";
import Message from "./Message";
import User from "./User";
import Teacher from "./Teacher";

const schema = new ModelSchema({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    purpose: {
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
    isDefault: {
        type: Boolean
    },
    isSystem: {
        type: Boolean
    }
});

schema.statics.createWithIntroMessages = async function (data) {
    const room = await Room.create(data);

    await Message.create({
        roomId: room.id,
        content: `This marks the begining of #${room.name}.`,
        isSystem: true,
        isIntro: true
    });
    await Message.create({
        roomId: room.id,
        content: room.purpose ? room.purpose : 'Room does not have concrete purpose.',
        isSystem: true
    });

    const students = await Student.find({
        facultyId: data.facultyId,
        specialtyId: data.specialtyId,
        group: data.group
    });

    for (const student of students) {
        student.rooms.push({
            id: room.id
        });

        await student.save();
    }

    return room;
}

schema.statics.loadWithLastMessages = async function (studentId) {
    const result = [];

    const student = await Student.findById(studentId);
    for (const r of student.rooms) {
        const room = await Room.findById(r.id);
        const lastMessage = await Message.findOne({
            roomId: room.id,
        }).sort({
            createdAt: -1
        });

        let lastMessageUsername = null;
        let lastMessagePhotoId = null;
        if (lastMessage && lastMessage.userId) {
            const user = await User.findById(lastMessage.userId);

            if (user.studentId) {
                const lastMessageStudent = await Student.findById(user.studentId);
                lastMessageUsername = lastMessageStudent.fullName;
            } else {
                const lastMessageTeacher = await Teacher.findById(user.teacherId);
                lastMessageUsername = lastMessageTeacher.fullName;
            }

            lastMessagePhotoId = user.photoId;
        }

        result.push({
            id: room.id,
            name: room.name,
            isSystem: room.isSystem,
            lastMessage: lastMessage ? {
                userId: lastMessage.userId,
                userName: lastMessageUsername,
                photoId: lastMessagePhotoId,
                content: lastMessage.content,
                type: lastMessage.type,
                posted: lastMessage.createdAt,
            } : {},
        });
    }

    return result;
}

export default mongoose.model("Room", schema);
