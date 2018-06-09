import envConfig from "../config/env-config";

export default (error, req, res, next) => {
    if (envConfig.isDevelopment()) {
        res.status(500).json({
            error: error.stack
        });
    } else {
        res.status(500).send();
    }

    next(error);
};