import BasicRouter from "./BasicRouter";
import Faculty from "../models/Faculty";
import routeTypes from "./route-types";

const router = new BasicRouter({
    schema: Faculty,
    routes: [routeTypes.GET_ALL]
});

export default router;