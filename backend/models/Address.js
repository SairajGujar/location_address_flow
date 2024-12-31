import mongoose from "mongoose";

const Address = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
  addressType: {
    type: String,
    required: true,
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});


export default mongoose.model('Address', Address)

