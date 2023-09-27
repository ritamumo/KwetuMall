import { model, Schema } from 'mongoose';

const salesSchema= new Schema({
    productId: {
        type: String,
        required: [true, 'Please add a product ID']
    },
    userId: {
        type: String,
        required: [true, 'please provide user ID']
    },
    quantity: {
        type: Number,
        required: [true, 'enter number']
    },    
    buyingPrice: {
        type: Number,
        required: [true, 'please provide buying price']
    },
    sellingPrice: {
        type: Number,
        required: [true, 'please provide selling price']
    },
    discount: {
        type: Number,
        required: [true, 'please provide discount']
    },

});

export default model('salesModel', salesSchema)