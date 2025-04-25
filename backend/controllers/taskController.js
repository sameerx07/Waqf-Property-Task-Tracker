import { Task } from '../models/Task.js';
import { Property } from '../models/Property.js';

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Public
export const getTasks = async (req, res) => {
  try {
    const { status, propertyId } = req.query;
    let query = {};

    if (status) {
      query.status = status;
    }

    if (propertyId) {
      query.property = propertyId;
    }

    const tasks = await Task.find(query)
      .populate('property', 'name type location')
      .sort({ dueDate: 1 });

    // Add isOverdue field to each task
    const tasksWithOverdue = tasks.map(task => {
      const taskObj = task.toObject();
      const currentDate = new Date();
      taskObj.isOverdue = 
        taskObj.status !== 'Completed' && 
        new Date(taskObj.dueDate) < currentDate;
      return taskObj;
    });

    res.status(200).json(tasksWithOverdue);
  } catch (error) {
    res.status(500);
    throw new Error('Error fetching tasks');
  }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Public
export const createTask = async (req, res) => {
  try {
    const { property, title, type, dueDate, status, description } = req.body;

    if (!property || !title || !type || !dueDate) {
      res.status(400);
      throw new Error('Please provide all required fields');
    }

    // Check if property exists
    const propertyExists = await Property.findById(property);
    if (!propertyExists) {
      res.status(404);
      throw new Error('Property not found');
    }

    const task = await Task.create({
      property,
      title,
      type,
      dueDate,
      status: status || 'Pending',
      description: description || '',
    });

    const populatedTask = await Task.findById(task._id).populate(
      'property',
      'name type location'
    );

    res.status(201).json(populatedTask);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

// @desc    Update task status
// @route   PUT /api/tasks/:id/status
// @access  Public
export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      res.status(400);
      throw new Error('Please provide a status');
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    task.status = status;
    await task.save();

    const updatedTask = await Task.findById(req.params.id).populate(
      'property',
      'name type location'
    );

    // Add isOverdue field
    const taskObj = updatedTask.toObject();
    const currentDate = new Date();
    taskObj.isOverdue = 
      taskObj.status !== 'Completed' && 
      new Date(taskObj.dueDate) < currentDate;

    res.status(200).json(taskObj);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};