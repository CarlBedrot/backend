/**
 * @file This file contains the server configuration and setup for the TodoApp API.
 * @module server
 */
require('dotenv').config();
const express = require('express');
const app = express();
const port = 3001;
const mongoose = require('mongoose');
const cors = require('cors');
const usersRouter = require('./routes/users');
app.use(express.json());
app.use(cors());
require ('./models/User');

app.use('/', usersRouter);


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully! Good job, Carl!'))
  .catch(err => console.error('MongoDB connection error:', err));




app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});