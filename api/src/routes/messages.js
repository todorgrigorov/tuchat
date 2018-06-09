import BasicRouter from "./BasicRouter";
import routeTypes from "./route-types";
import Message from "../models/Message";

const router = new BasicRouter({
    schema: Message,
    routes: [routeTypes.GET_ALL, routeTypes.POST]
});

router.on(routeTypes.GET, '/room/:roomId', async (req, res) => {
    if (!req.params.roomId) {
        res.status(400).send();
    } else {
        res.status(200).json(await Message.loadByRoom(req.params.roomId));
    }
});

router.on(routeTypes.POST, '/system', async (req, res) => {
    res.status(201).json(await Message.createSystem(req.body));
});

export default router;