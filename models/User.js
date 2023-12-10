const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  spirits: {
    Tuborg: { type: Number, default: 0 },
    Cider: { type: Number, default: 0 },
    Gin: { type: Number, default: 0 },
    Vodka: { type: Number, default: 0 },
    Vin: { type: Number, default: 0 },
  },
  totalCost: { type: Number, default: 0 }
});

userSchema.methods.calculateTotalCost = function() {
  this.totalCost = this.spirits.Tuborg * 3 + this.spirits.Cider * 3 + this.spirits.Gin * 5 + this.spirits.Vodka * 5 + this.spirits.Vin * 5;
};

userSchema.pre('save', function(next) {
  this.calculateTotalCost();
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;