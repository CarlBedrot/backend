// controllers/usersController.js

const User = require('../models/User');

exports.getAllUsers = (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
};

// Add this to your usersController.js

exports.getUserStats = (req, res) => {
  const userId = req.params.id;
  console.log('Fetching user stats for user:', userId);

  User.findById(userId)
    .then(user => {
      if (!user) {
        console.log('User not found:', userId);
        return res.status(404).json({ message: "User not found." });
      }

      console.log('User found:', user);
      console.log('Sending user stats:', user.spirits);
      res.json(user.spirits);
    })
    .catch(err => {
      console.error('Error fetching user:', err);
      res.status(400).json({ message: 'Error: ' + err });
    });
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
  console.log('Received ID:', req.body.id); // Log the received ID
  User.findById(req.body.id)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      /**
       * Represents an array of valid spirit types.
       * @type {string[]}
       */
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