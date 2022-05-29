import mongoose from "mongoose";

const tagSchema = new mongoose.Schema(
    {
        id: {type: String},
        tag: {type: String, required: true}
    },
    {
        versionKey: false
    }
)

const tags = mongoose.model('tags', tagSchema);
export default tags;