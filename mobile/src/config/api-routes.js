import envConfig from "./env-config";

export default {
    ADDRESS: `${envConfig.api.address}:${envConfig.api.port}`,
    SOCKETS_ADDRESS: `${envConfig.api.address}:${envConfig.api.socketsPort}`,
    USERS: '/users',
    USERS_STUDENT_BY_CODE: '/users/student',
    USERS_LOGIN: '/users/login',
    USERS_TIMEZONE: '/users/timezone',
    USERS_DEVICE: '/users/device',
    USERS_PHOTO: '/users/photo',
    STUDENTS: '/students',
    ROOMS: '/rooms',
    MESSAGES_BY_ROOM: '/messages/room',
    ATTACHMENTS: '/attachments',
    ATTACHMENTS_UPLOAD_SINGLE: '/attachments/single',
    FEED: '/feed',
    FEED_ROOMS_BY_STUDENT: '/feed/rooms',
    FEED_PEOPLE_BY_STUDENT: '/feed/people',
}
