import users from "./users";
import students from "./students";
import faculties from "./faculties";
import specialties from "./specialties";
import rooms from "./rooms";
import feed from "./feed";
import messages from "./messages";
import attachments from "./attachments";
import teachers from "./teachers";

export default [{
    route: '/users',
    router: users
}, {
    route: '/students',
    router: students
}, {
    route: '/faculties',
    router: faculties
}, {
    route: '/specialties',
    router: specialties
}, {
    route: '/rooms',
    router: rooms
}, {
    route: '/feed',
    router: feed
}, {
    route: '/messages',
    router: messages
}, {
    route: '/attachments',
    router: attachments
}, {
    route: '/teachers',
    router: teachers
}];