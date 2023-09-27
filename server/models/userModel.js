import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'Please add a first name'],
  },
  lastName: {
    type: String,
    required: [true, 'please provide last name'],
  },
  email: {
    type: String,
    required: [true, 'please provide email'],
  },
  shippingDetails: [
    {
      country: {
        type: String,
        required: [true, 'please provide country'],
      },

      town: {
        type: String,
        required: [true, 'please provide town'],
      },
      address: {
        type: String,
        required: [true, 'please provide address'],
      },
    },
  ],
  phoneNumber: {
    type: Number,
    required: [true, 'please provide contact'],
  },
  password: {
    type: String,
    required: [true, 'enter your password'],
  },
  cart: {
    type: [Object],
  },
  wishlist: {
    type: [String],
  },
});
 
export default model('userModel', userSchema);
