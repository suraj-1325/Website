// Improved sendMail function (server-side example using nodemailer)
async function sendMail(name, email, message) {
  const nodemailer = require('nodemailer');

  // Create a transporter object (configure with your email service)
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Example: Gmail
    auth: {
      user: process.env.EMAIL_USER, // Use environment variables for security
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // Send mail with dynamic content
    await transporter.sendMail({
      from: `"${Name}" <${Email}>`, // Sender name and email
      to: 'surajtamang1308@gmail.com', // Recipient email
      subject: 'New Message from Portfolio Contact Form', // Subject line
      text: message, // Plain text body
      html: `<p>${Message}</p>`, // HTML body
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}

// Initialize EmailJS (client-side example)
function initEmail() {
  emailjs.init(process.env.EMAILJS_USER_ID); // Use environment variable for security
}
