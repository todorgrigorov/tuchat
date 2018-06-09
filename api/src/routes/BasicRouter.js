import express from "express";
import _ from "lodash";
import routeTypes from "./route-types";

async function onGet(req, res) {
    if (req.params.id) {
        const item = await this.options.schema.findById(req.params.id);

        if (item) {
            res.status(200).json(item);
        } else {
            res.status(404).send();
        }
    } else {
        res.status(400).send();
    }
}

async function onGetAll(req, res) {
    res.status(200).json(await this.options.schema.find(req.query));
}

async function onPost(req, res) {
    if (req.body) {
        const item = await this.options.schema.create(req.body);
        res.status(201).json(item);
    } else {
        res.status(400).send();
    }
}

async function onPut(req, res) {
    if (req.params.id && req.body) {
        const result = await this.options.schema.findByIdAndUpdate(req.params.id, req.body);

        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).send();
        }
    } else {
        res.status(400).send();
    }
}

async function onDelete(req, res) {
    if (req.params.id) {
        const item = await this.options.schema.findById(req.params.id);

        if (item) {
            await this.options.schema.remove(item);
            res.status(200).send();
        } else {
            res.status(404).send();
        }
    } else {
        res.status(400).send();
    }
}

export default class BasicRouter {
    constructor(options = {}) {
        this.options = options;
        this.expressRouter = express.Router();

        if (options.routes) {
            if (_.includes(options.routes, routeTypes.GET) || _.includes(options.routes, routeTypes.ALL)) {
                this.on(routeTypes.GET, '/:id', onGet.bind(this));
            }
            if (_.includes(options.routes, routeTypes.GET_ALL) || _.includes(options.routes, routeTypes.ALL)) {
                this.on(routeTypes.GET, '/', onGetAll.bind(this));
            }
            if (_.includes(options.routes, routeTypes.POST) || _.includes(options.routes, routeTypes.ALL)) {
                this.on(routeTypes.POST, '/', onPost.bind(this));
            }
            if (_.includes(options.routes, routeTypes.PUT) || _.includes(options.routes, routeTypes.ALL)) {
                this.on(routeTypes.PUT, '/:id', onPut.bind(this));
            }
            if (_.includes(options.routes, routeTypes.DELETE) || _.includes(options.routes, routeTypes.ALL)) {
                this.on(routeTypes.DELETE, '/:id', onDelete.bind(this));
            }
        }
    }

    on(type, route, handle, ...middleware) {
        const method = this.expressRouter[type.toLowerCase()];
        if (method) {
            if (!middleware) {
                middleware = [];
            }

            middleware.push(async (req, res, next) => {
                let result = null;
                try {
                    result = await handle.call(this, req, res, next);
                } catch (error) {
                    result = next(error);
                }
                return result;
            });

            method.call(this.expressRouter, route, ...middleware);
        }
    }
}