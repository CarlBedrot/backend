// routes/users.js

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/users', usersController.getAllUsers);
router.post('/adduser', usersController.addUser);
router.post('/updatespirit', usersController.updateSpirit);

module.exports = router;
