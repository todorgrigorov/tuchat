import BasicRouter from "./BasicRouter";
import Specialty from "../models/Specialty";
import routeTypes from "./route-types";

const router = new BasicRouter({
    schema: Specialty,
    routes: [routeTypes.GET_ALL]
});

export default router;