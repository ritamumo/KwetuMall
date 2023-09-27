import { model, Schema } from 'mongoose';

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please add a product name']
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
        
    },
    image: {
        type: String,
        required: [true, 'please provide image']
    },
    description: {
        type: String,
        required: [true, 'please provide description']
    },
    stock: {
        type: Number,
        required: [true, 'please provide product quantity']
    },
    categories: {
        type: [String]
    },
    reviews: [{
            userName: String,
            comment: String,
            rating: Number
        }]
    

});

export default model('productModel', productSchema)