const express = require('express');
const User = require('../models/User');
const Booking = require('../models/Booking');
const { authenticate, isAdmin } = require('../middleware/jwt');
const { sendStatusEmail } = require('../utils/mailer');
const router = express.Router();

router.get('/users', authenticate, isAdmin, async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    console.log('[ADMIN GET USERS]');
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/bookings', authenticate, isAdmin, async (req, res, next) => {
  try {
    const bookings = await Booking.find().populate('userId', 'email');
    console.log('[ADMIN GET BOOKINGS]');
    res.json(bookings);
  } catch (err) {
    next(err);
  }
});

router.put('/bookings/:bookingId/status', authenticate, isAdmin, async (req, res, next) => {
  try {
    const { status } = req.body;
    const bookingId = parseInt(req.params.bookingId);

    const validStatuses = ['pending', 'confirmed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const updatedBooking = await Booking.findOneAndUpdate(
      { bookingId },
      { status },
      { new: true }
    ).populate('userId', 'email');

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // ✉️ Send email
    await sendStatusEmail(updatedBooking.userId.email, status, bookingId);
    console.log(`[EMAIL SENT] to ${updatedBooking.userId.email} for booking ${bookingId}`);

    console.log(`[ADMIN UPDATE] Booking ${bookingId} → ${status}`);
    res.json({ message: 'Booking updated and email sent', booking: updatedBooking });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
