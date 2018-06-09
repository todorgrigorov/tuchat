import mongoose from "mongoose";

export default class ModelSchema extends mongoose.Schema {
    constructor(definition = {}, options = {}) {
        super(
            definition,
            Object.assign(
                {
                    timestamps: true
                },
                options
            )
        );

        this.set('toJSON', {
            virtuals: options.serialization ? options.serialization.virtuals : false,
            transform: (doc, ret, o) => {
                // do not provide _id and __v in json results
                ret.id = ret._id;

                if (!options.serialization || !options.serialization._id) {
                    delete ret._id;
                }
                delete ret.__v;
            }
        });
    }
}
