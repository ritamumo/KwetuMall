import { model, Schema } from 'mongoose';

const pickupSchema = new Schema({
  location: {
    type: String,
    required: [true, 'Please add a location'],
  },
  name: {
    type: String,
    required: [true, 'please provide pickup station'],
  },
});

export default model('pickupModel', pickupSchema);
