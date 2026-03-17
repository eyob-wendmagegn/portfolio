const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create transporter for email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Test email connection
transporter.verify((error, success) => {
  if (error) {
    console.log('Email connection error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Store subscribers (in memory - for production, use a database)
let subscribers = [];

// ==================== CONTACT FORM ENDPOINT ====================
app.post(
  '/api/contact',
  [
    body('name').trim().notEmpty().withMessage('Name is required').escape(),
    body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('message').trim().notEmpty().withMessage('Message is required').escape()
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { name, email, message } = req.body;

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'eyobwende18@gmail.com',
      replyTo: email,
      subject: `New Portfolio Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <h2 style="color: #3b82f6;">New Contact Form Submission</h2>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong style="color: #3b82f6;">Name:</strong> ${name}</p>
            <p><strong style="color: #3b82f6;">Email:</strong> ${email}</p>
            <p><strong style="color: #3b82f6;">Message:</strong></p>
            <p style="background-color: white; padding: 15px; border-radius: 5px;">${message}</p>
          </div>
          
          <p style="color: #6b7280; font-size: 14px;">
            This message was sent from your portfolio contact form.
          </p>
        </div>
      `
    };

    // Auto-reply to sender
    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting me',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <h2 style="color: #3b82f6;">Thank You for Reaching Out!</h2>
          
          <p>Dear ${name},</p>
          
          <p>Thank you for contacting me through my portfolio. I have received your message and will get back to you as soon as possible.</p>
          
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Your message:</strong></p>
            <p>${message}</p>
          </div>
          
          <p>Best regards,<br>
          <strong style="color: #3b82f6;">Eyob Wendmagegn</strong></p>
        </div>
      `
    };

    try {
      // Send email to you
      await transporter.sendMail(mailOptions);
      
      // Send auto-reply to sender
      await transporter.sendMail(autoReplyOptions);

      res.status(200).json({ 
        success: true, 
        message: 'Message sent successfully!' 
      });
    } catch (error) {
      console.error('Email sending error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to send message. Please try again.' 
      });
    }
  }
);

// ==================== NEWSLETTER SUBSCRIBE ENDPOINT ====================
app.post(
  '/api/subscribe',
  [
    body('email').isEmail().withMessage('Valid email is required').normalizeEmail()
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { email } = req.body;

    // STRICT CHECK: If email already exists, reject with error - NO EMAIL SENT
    if (subscribers.includes(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'This email is already subscribed to the newsletter.'
      });
    }

    // Add to subscribers list (only for NEW emails)
    subscribers.push(email);
    
    // Send welcome email ONLY to new subscribers
    const confirmationOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to Eyob.dev Newsletter!',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <h2 style="color: #3b82f6;">Welcome to the Newsletter! 🎉</h2>
          
          <p>Thank you for subscribing to my newsletter. You'll now receive updates about:</p>
          
          <ul style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <li>🚀 New projects and portfolio updates</li>
            <li>📚 Tech tutorials and learning resources</li>
            <li>💡 Web development tips and tricks</li>
            <li>🔧 Open source contributions</li>
          </ul>
          
          <p>I promise not to spam you. You'll only get quality content about web development.</p>
          
          <p style="margin-top: 30px;">Best regards,<br>
          <strong style="color: #3b82f6;">Eyob Wendmagegn</strong></p>
          
          <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
          <p style="color: #6b7280; font-size: 12px;">
            You're receiving this because you subscribed to eyob.dev newsletter. 
            If you didn't subscribe, please ignore this email.
          </p>
        </div>
      `
    };

    // Send notification to you about new subscriber
    const notificationOptions = {
      from: process.env.EMAIL_USER,
      to: 'eyobwende18@gmail.com',
      subject: 'New Newsletter Subscriber!',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <h2 style="color: #3b82f6;">New Newsletter Subscriber! 🎉</h2>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px;">
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Total subscribers:</strong> ${subscribers.length}</p>
          </div>
        </div>
      `
    };

    try {
      // Send welcome email to new subscriber
      await transporter.sendMail(confirmationOptions);
      
      // Send notification to you
      await transporter.sendMail(notificationOptions);

      res.status(200).json({ 
        success: true, 
        message: 'Successfully subscribed to the newsletter!' 
      });
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      // If email fails, remove from subscribers list to maintain consistency
      subscribers = subscribers.filter(s => s !== email);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to subscribe. Please try again.' 
      });
    }
  }
);

// Get subscriber count (optional endpoint)
app.get('/api/subscribers/count', (req, res) => {
  res.json({ 
    success: true, 
    count: subscribers.length 
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});