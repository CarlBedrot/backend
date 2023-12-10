// controllers/usersController.js

const User = require('../models/User');

exports.getAllUsers = (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
};

exports.addUser = (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ message: "Invalid name." });
  }

  const newUser = new User({ ...req.body });

  newUser.save()
    .then(() => res.json('User added!' + req.body.name))
    .catch(err => res.status(400).json('Error: ' + err));
};


exports.updateSpirit = (req, res) => {
  User.findById(req.body.id)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      const validSpiritTypes = Object.keys(user.spirits);
      const { spiritType, amount } = req.body;

      if (!validSpiritTypes.includes(spiritType)) {
        return res.status(400).json({ message: "Invalid spirit type." });
      }

      if (!Number.isFinite(amount) || amount < 0) {
        return res.status(400).json({ message: "Invalid amount." });
      }

      user.spirits[spiritType] += Number(amount);
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