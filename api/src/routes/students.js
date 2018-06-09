import Student from '../models/Student';
import BasicRouter from "./BasicRouter";
import routeTypes from "./route-types";

const router = new BasicRouter({
    schema: Student,
    routes: [routeTypes.GET, routeTypes.GET_ALL, routeTypes.PUT]
});

router.on(routeTypes.POST, '/', async (req, res) => {
    res.status(201).json(await Student.createWithUser(req.body));
});

export default router;