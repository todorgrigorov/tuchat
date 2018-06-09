import mongoose from "mongoose";

export default class SubDocumentSchema extends mongoose.Schema {
    constructor(definition = {}, options = {}) {
        super(
            definition,
            Object.assign({
                _id: false
            }, options)
        );
    }
}
