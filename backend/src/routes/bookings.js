const express = require('express');
const Booking = require('../models/Booking');
const { authenticate } = require('../middleware/jwt');
const router = express.Router();

router.post('/', authenticate, async (req, res, next) => {
  try {
    const { pickupLocation, dropoffLocation } = req.body;
    if (!pickupLocation || !dropoffLocation) {
      return res.status(400).json({ message: 'Missing pickup or dropoff location' });
    }

    const booking = new Booking({
      userId: req.user.id,
      pickupLocation,
      dropoffLocation,
    });

    await booking.save();
    console.log(`[BOOKING CREATED] User ${req.user.id}`);
    res.json(booking);
  } catch (err) {
    next(err);
  }
});

router.get('/', authenticate, async (req, res, next) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id });
    console.log(`[GET BOOKINGS] User ${req.user.id}`);
    res.json(bookings);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    const deleted = await Booking.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deleted) {
      return res.status(404).json({ message: 'Booking not found or unauthorized' });
    }

    console.log(`[BOOKING DELETED] ID ${req.params.id} by user ${req.user.id}`);
    res.json({ message: 'Booking cancelled' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
