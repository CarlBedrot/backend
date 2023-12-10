// controllers/usersController.js

const User = require('../models/User');

exports.getAllUsers = (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
};

exports.addUser = (req, res) => {
  const newUser = new User({ ...req.body });

  newUser.save()
    .then(() => res.json('User added!' + req.body.name))
    .catch(err => res.status(400).json('Error: ' + err));
};

exports.updateSpirit = (req, res) => {
  User.findById(req.body.id)
    .then(user => {
      user.spirits[req.body.spiritType] += Number(req.body.amount);

      user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
};

exports.deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
    };