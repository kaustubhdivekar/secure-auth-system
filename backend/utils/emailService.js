const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' }); // Ensure .env from backend root is loaded

const sendEmail = async (options) => {
  let transporter;

  // For development, use Ethereal.email (or Mailtrap, etc.)
  if (process.env.NODE_ENV === 'development' || !process.env.EMAIL_HOST) {
    // // Generate test SMTP service account from ethereal.email
    // // Only needed if you don't have a Ethereal account already set in .env
    // if (!process.env.ETHEREAL_USER || !process.env.ETHEREAL_PASS) {
    //   console.log('No Ethereal credentials in .env, generating temporary ones...');
    //   let testAccount = await nodemailer.createTestAccount();
    //   console.log('--------------------------------------------------------------------------------------');
    //   console.log('Ethereal Test Account Created (use these in your .env for persistent dev emailing):');
    //   console.log(`ETHEREAL_HOST=${testAccount.smtp.host}`);
    //   console.log(`ETHEREAL_PORT=${testAccount.smtp.port}`);
    //   console.log(`ETHEREAL_SECURE=${testAccount.smtp.secure}`); // false for Ethereal usually
    //   console.log(`ETHEREAL_USER=${testAccount.user}`);
    //   console.log(`ETHEREAL_PASS=${testAccount.pass}`);
    //   console.log('Preview URL for sent messages (will also be logged per email): %s', nodemailer.getTestMessageUrl(null)); // Placeholder
    //   console.log('--------------------------------------------------------------------------------------');

    //   // Use these dynamically created credentials for this run
    //   transporter = nodemailer.createTransport({
    //     host: testAccount.smtp.host,
    //     port: testAccount.smtp.port,
    //     secure: testAccount.smtp.secure, // true for 465, false for other ports
    //     auth: {
    //       user: testAccount.user, // generated ethereal user
    //       pass: testAccount.pass, // generated ethereal password
    //     },
    //     tls: {
    //         rejectUnauthorized: false // Often needed for local/development SMTP servers
    //     }
    //   });
    // } else {
    //   // Use Ethereal credentials from .env
    //   transporter = nodemailer.createTransport({
    //     host: process.env.ETHEREAL_HOST,
    //     port: parseInt(process.env.ETHEREAL_PORT || "587", 10),
    //     secure: process.env.ETHEREAL_SECURE === 'true',
    //     auth: {
    //       user: process.env.ETHEREAL_USER,
    //       pass: process.env.ETHEREAL_PASS,
    //     },
    //     tls: {
    //         rejectUnauthorized: false
    //     }
    //   });
    // }

        // Use Ethereal credentials directly for testing
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // Ethereal usually uses TLS on port 587
      auth: {
        user: 'timothy.runolfsdottir82@ethereal.email',
        pass: 'ng1PxpWMUuFW7r4Enj',
      },
      tls: {
        rejectUnauthorized: false // Often needed for local/development SMTP servers
      }
    });

  } else {
    // For production, use a real email service (e.g., SendGrid, Mailgun, Gmail - with caution)
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || "587", 10),
      secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports (like 587 with STARTTLS)
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // Add other options like TLS for production if necessary
    });
  }

  // Define email options
  const mailOptions = {
    from: `"SecureAuth App" <timothy.runolfsdottir82@ethereal.email>`, // Explicit Ethereal sender
    // from: `"<span class="math-inline">\{process\.env\.EMAIL\_FROM\_NAME \|\| 'SecureAuth App'\}" <</span>{process.env.EMAIL_FROM_ADDRESS || 'noreply@example.com'}>`,
    to: options.email,       // Recipient's email address
    subject: options.subject,  // Subject line
    text: options.text,        // Plain text body (optional)
    html: options.html,        // HTML body
  };

  // Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);

    // Preview URL for Ethereal emails
    if (transporter.options.host.includes('ethereal.email')) {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email could not be sent.');
  }
};

module.exports = sendEmail;