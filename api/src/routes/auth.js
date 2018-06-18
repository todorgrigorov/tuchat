import BasicRouter from "./BasicRouter";
import routeTypes from "./route-types";
import User from '../models/User';
import Teacher from "../models/Teacher";
import Student from '../models/Student';

const router = new BasicRouter({
    useAuth: false
});

router.on(routeTypes.POST, "/", async (req, res) => {
    const user = await User.findOne({
        code: req.body.code
    });

    if (user && user.isValidPassword(req.body.password)) {
        res.status(200).json(user.toAuth());
    } else {
        res.status(400).send();
    }
});

router.on(routeTypes.POST, '/student', async (req, res) => {
    res.status(201).json(await Student.createWithUser(req.body));
});

router.on(routeTypes.POST, '/teacher', async (req, res) => {
    res.status(201).json(await Teacher.createWithUser(req.body));
});

export default router;