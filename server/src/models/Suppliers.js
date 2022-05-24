import mongoose from "mongoose";

const suppliersSchema = new mongoose.Schema(
    {
        id: {type: String},
        name: {type: String, required: true},
        price: {type: Number, required: true},
        tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'tags', required: true}],
        rate: {type: Number, required: true},
        latitude: {type: Number, required: true},
        longitude: {type: Number, required: true},
        range: {type: Number, required: true},
        image: {type: String, required: true},
        description: {type: String, required: true}

    },
    {
        versionKey: false
    }
)

const suppliers = mongoose.model('suppliers', suppliersSchema);
export default suppliers;