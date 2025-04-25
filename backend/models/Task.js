import mongoose from 'mongoose';

const taskSchema = mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Property',
    },
    title: {
      type: String,
      required: [true, 'Please add a task title'],
    },
    type: {
      type: String,
      required: [true, 'Please select a task type'],
      enum: ['rent collection', 'maintenance', 'legal follow-up', 'inspection', 'documentation', 'other'],
    },
    dueDate: {
      type: Date,
      required: [true, 'Please add a due date'],
    },
    status: {
      type: String,
      required: [true, 'Please select a status'],
      enum: ['Pending', 'In Progress', 'Completed'],
      default: 'Pending',
    },
    description: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model('Task', taskSchema);