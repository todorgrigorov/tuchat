import Teacher from "../models/Teacher";
import BasicRouter from "./BasicRouter";
import routeTypes from "./route-types";

const router = new BasicRouter({
    schema: Teacher
});

router.on(routeTypes.POST, '/', async (req, res) => {
    res.status(201).json(await Teacher.createWithUser(req.body));
});

export default router;