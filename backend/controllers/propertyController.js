import { Property } from '../models/Property.js';

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500);
    throw new Error('Error fetching properties');
  }
};

// @desc    Create new property
// @route   POST /api/properties
// @access  Public
export const createProperty = async (req, res) => {
  try {
    const { name, location, type } = req.body;

    if (!name || !location || !type) {
      res.status(400);
      throw new Error('Please provide all required fields');
    }

    const property = await Property.create({
      name,
      location,
      type,
    });

    res.status(201).json(property);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

// @desc    Get property by ID
// @route   GET /api/properties/:id
// @access  Public
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      res.status(404);
      throw new Error('Property not found');
    }

    res.status(200).json(property);
  } catch (error) {
    res.status(404);
    throw new Error('Property not found');
  }
};