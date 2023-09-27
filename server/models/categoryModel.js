import { model, Schema } from 'mongoose';

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'add category']
    }
})

export default model ('categoryModel', categorySchema)