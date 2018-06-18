import Teacher from "../models/Teacher";
import BasicRouter from "./BasicRouter";
import routeTypes from "./route-types";

const router = new BasicRouter({
    schema: Teacher
});

export default router;