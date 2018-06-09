import User from "../models/User";
import BasicRouter from "./BasicRouter";
import routeTypes from "./route-types";
import Student from "../models/Student";

const router = new BasicRouter({
    schema: User
});

router.on(routeTypes.GET, '/student/:code', async (req, res) => {
    const user = await User.findOne({
        code: req.params.code
    }, {
            password: 0,
            device: 0
        });

    if (user && user.studentId) {
        res.status(200).json({
            user,
            student: await Student.findById(user.studentId)
        });
    } else {
        res.status(404).send();
    }
});

router.on(routeTypes.POST, '/login', async (req, res) => {
    // TODO: implement pass hashing, JWT auth
    const user = await User.findOne({
        code: req.body.code,
        password: req.body.password
    }, {
            password: 0,
            device: 0
        });

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(403).send();
    }
});

router.on(routeTypes.POST, '/device', async (req, res) => {
    const user = await User.findById(req.body.id, {
        password: 0,
        device: 0
    });

    if (user) {
        res.status(200).json(await user.setDevice({
            type: req.body.deviceType,
            pushToken: req.body.deviceToken
        }));
    } else {
        res.status(400).send();
    }
});

router.on(routeTypes.POST, '/timezone', async (req, res) => {
    const user = await User.findById(req.body.id, {
        password: 0,
        device: 0
    });

    if (user) {
        user.timezone = req.body.timezone;
        res.status(200).json(await user.save());
    } else {
        res.status(400).send();
    }
});

router.on(routeTypes.POST, '/photo', async (req, res) => {
    const user = await User.findById(req.body.id, {
        password: 0,
        device: 0
    });

    if (user) {
        user.photoId = req.body.photoId;
        res.status(200).json(await user.save());
    } else {
        res.status(400).send();
    }
});

export default router;