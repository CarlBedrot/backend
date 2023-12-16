// routes/users.js

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
// Add this to your routes file


router.get('/userstats/:id', usersController.getUserStats);


router.get('/users', usersController.getAllUsers);
router.post('/adduser', usersController.addUser);
router.post('/updatespirit', usersController.updateSpirit);

module.exports = router;
