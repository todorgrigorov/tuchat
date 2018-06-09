import BasicRouter from "./BasicRouter";
import storage from "../services/storage";
import routeTypes from "./route-types";
import Attachment from "../models/Attachment";

const router = new BasicRouter({
    schema: Attachment
});

router.on(routeTypes.GET, '/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).send();
    } else {
        const attachment = await Attachment.findById(req.params.id);
        if (attachment) {
            storage.pipeFileToHttpResponse(attachment.name, res);
        } else {
            res.status(404).send();
        }
    }
});

router.on(routeTypes.POST, '/single', async (req, res) => {
    const name = storage.saveFile(req.body);
    res.status(201).json(await Attachment.create({
        name
    }));
});

export default router;