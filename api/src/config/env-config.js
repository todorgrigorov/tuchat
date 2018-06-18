import dotenv from "dotenv";
import path from "path";
import ConfigError from "../errors/ConfigError";

dotenv.config();

const config = {
    path: __dirname.replace('/config', ''),
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
    socketsPort: process.env.SOCKETS_PORT,
    jwtSecret: process.env.JWT_SECRET,
    mongo: {
        host: process.env.MONGO_HOST,
        useDebug: process.env.MONGO_DEBUG
    },
    push: {
        apn: {
            cert: '',
            keyId: process.env.PUSH_APN_KEY_ID,
            teamId: process.env.PUSH_APN_TEAM_ID
        },
        gcm: {
            id: process.env.PUSH_GCM_ID
        }
    }
};

if (!config.environment) {
    config.environment = "development";
} else if (!config.mongo.host) {
    throw new ConfigError("MONGO_HOST");
} else if (!config.mongo.useDebug) {
    config.mongo.useDebug = false;
}

// enable dev config
if (config.environment === "development") {
    config.port = 3000;
    config.socketsPort = 3001;
}

if (!config.push.apn.cert) {
    config.push.apn.cert = path.join(config.path, `certs/apn-push-${config.environment}.p8`);
}

config.isDevelopment = () => config.environment === "development";
config.push.apn.isEnabled = () => config.push.apn.cert && config.push.apn.keyId && config.push.apn.teamId;
config.push.gcm.isEnabled = () => config.push.gcm.id;

export default config;
