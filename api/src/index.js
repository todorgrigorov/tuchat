import express from "express";
import http from "http";
import mongoose from "mongoose";
import _ from "lodash";
import bodyParser from "body-parser";
import Promise from "bluebird";
import cors from "cors";
import logger from "morgan";
import helmet from "helmet";
import util from "util";
import debug from "debug";
import io from 'socket.io';
import "babel-polyfill"; // imports dependencies when running transpiled code

import envConfig from "./config/env-config";
import dataImport from "./services/data-import";
import routes from "./routes/routes";
import errorHandler from "./middleware/error-handler";
import globalHandler from "./middleware/global-handler";
import chat from "./services/chat";

// MONGO
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/tuchat', {
    useMongoClient: true
});

if (envConfig.mongo.useDebug) {
    mongoose.set("debug", (collectionName, method, query, doc) => {
        debug(
            `${collectionName}.${method}`,
            util.inspect(query, false, 20),
            doc
        );
    });
}

dataImport.seed();

// EXPRESS
const app = express();
const server = http.Server(app);

if (envConfig.isDevelopment()) {
    app.use(logger("dev"));
}

app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));
app.use(helmet());
app.use(cors());

// ROUTES
_.forEach(routes, r => app.use(r.route, r.router.expressRouter));

// handles all non-registered routes (404 page)
app.get("/*", globalHandler);

app.use(errorHandler);

app.listen(envConfig.port, () => console.info(`Listening on ${envConfig.port}...`));

// SOCKET.IO
const sockets = io(server).listen(envConfig.socketsPort);
chat.configure(sockets);