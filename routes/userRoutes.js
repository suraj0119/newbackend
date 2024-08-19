const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');

// Get all users
router.get('/', authenticate, userController.getAllUsers);

// Get user by ID
router.get('/:id', authenticate, userController.getUserById);

// Update user profile
router.put('/:id', authenticate, userController.updateUser);

// Delete user profile
router.delete('/:id', authenticate, userController.deleteUser);

module.exports = router;
