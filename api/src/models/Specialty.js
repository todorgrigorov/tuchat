import mongoose from "mongoose";
import ModelSchema from "./ModelSchema";

const schema = new ModelSchema({
    name: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
});

export default mongoose.model("Specialty", schema);
