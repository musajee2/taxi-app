const mongoose = require('mongoose');
const Counter = require('./Counter');

const bookingSchema = new mongoose.Schema({
  bookingId: { type: Number, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pickupLocation: String,
  dropoffLocation: String,
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

bookingSchema.pre('save', async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { name: 'bookingId' },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );
    this.bookingId = counter.value;
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
