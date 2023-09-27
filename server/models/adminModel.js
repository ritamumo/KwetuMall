import { model, Schema } from 'mongoose';

const admin = new Schema({
    fistName: {
        type: String,
        required: [true, 'Please add a first name']
    },
    lastName: {
        type: String,
        required: [true, 'please provide last name']
    },
    email: {
        type: String,
        required: [true, 'please provide email']
    },
    phoneNumber: {
        type: Number,
        required: [true, 'please provide contact']
    },
    password: {
        type: String,
        required: [true, 'enter your password']
    }
})

export default model('adminModel', adminSchema)