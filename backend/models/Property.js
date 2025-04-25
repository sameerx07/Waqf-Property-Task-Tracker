import mongoose from 'mongoose';

const propertySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a property name'],
    },
    location: {
      type: String,
      required: [true, 'Please add a property location'],
    },
    type: {
      type: String,
      required: [true, 'Please select a property type'],
      enum: ['mosque', 'school', 'land', 'commercial', 'residential', 'other'],
    },
  },
  {
    timestamps: true,
  }
);

export const Property = mongoose.model('Property', propertySchema);