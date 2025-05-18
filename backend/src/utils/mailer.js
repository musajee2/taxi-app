const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS,
  },
});

const sendStatusEmail = async (to, status, bookingId) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject: `Your Booking #${bookingId} Status Has Been Updated`,
    text: `Hi,\n\nYour taxi booking status is now: ${status.toUpperCase()}.\n\nThank you for using our service.`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendStatusEmail };
