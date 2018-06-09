import BasicRouter from "./BasicRouter";
import routeTypes from './route-types';
import Room from "../models/Room";
import Student from "../models/Student";

const router = new BasicRouter();

router.on(routeTypes.GET, '/rooms/:studentId', async (req, res) => {
    if (!req.params.studentId) {
        res.status(400).send();
    } else {
        res.status(200).json(await Room.loadWithLastMessages(req.params.studentId));
    }
});

router.on(routeTypes.GET, '/people/:studentId', async (req, res) => {
    if (!req.params.studentId) {
        res.status(400).send();
    } else {
        res.status(200).json(await Student.loadByGroup(req.params.studentId));
    }
});

export default router;