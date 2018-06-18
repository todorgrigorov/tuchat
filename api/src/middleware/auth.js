import jwt from "jsonwebtoken";

import User from "../models/User";
import envConfig from "../config/env-config";

export default (req, res, next) => {
    const header = req.headers.authorization;

    let token;
    if (header) {
        token = header.split(" ")[1]
    }

    if (token) {
        jwt.verify(token, envConfig.jwtSecret, async (err, decoded) => {
            if (err) {
                res.status(401).send();
            } else {
                const user = await User.findOne({
                    code: decoded.code
                });

                if (user) {
                    req.currentUser = user;
                    next();
                } else {
                    res.status(401).send();
                }
            }
        });
    } else {
        res.status(401).send();
    }
};
