import BasicRouter from "./BasicRouter";
import routeTypes from "./route-types";
import Room from "../models/Room";

const router = new BasicRouter({
    schema: Room,
    routes: [routeTypes.GET_ALL]
});

router.on(routeTypes.POST, '/', async (req, res) => {
    res.status(201).json(await Room.createWithIntroMessages(req.body));
});

export default router;