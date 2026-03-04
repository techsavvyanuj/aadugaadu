const nodemailer = require('nodemailer');

// Create reusable transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

// Verify transporter on startup
transporter.verify((error) => {
  if (error) {
    console.error('❌ Email transporter error:', error.message);
  } else {
    console.log('✅ Email service ready (Gmail)');
  }
});

/**
 * Send notification email to Aadugaadu team when a new form is submitted
 */
const sendNotificationToTeam = async ({ name, email, company, service, message }) => {
  const mailOptions = {
    from: `"Aadugaadu Website" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_RECEIVER,
    subject: `🚀 New Project Inquiry from ${name}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; border-radius: 16px; overflow: hidden; border: 1px solid #222;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #7c3aed, #6d28d9); padding: 32px 28px;">
          <h1 style="margin: 0; color: #fff; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">
            New Project Inquiry 🎯
          </h1>
          <p style="margin: 6px 0 0; color: rgba(255,255,255,0.8); font-size: 13px;">
            Received via aadugaadu.com contact form
          </p>
        </div>

        <!-- Body -->
        <div style="padding: 28px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 120px;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #fff; font-size: 15px; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #7c3aed; font-size: 15px;">
                <a href="mailto:${email}" style="color: #7c3aed; text-decoration: none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Company</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #fff; font-size: 15px;">${company || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Service</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #fff; font-size: 15px;">${service || 'Not specified'}</td>
            </tr>
          </table>

          <!-- Message box -->
          <div style="margin-top: 20px; background: #111; border: 1px solid #222; border-radius: 10px; padding: 18px;">
            <p style="margin: 0 0 8px; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Project Details</p>
            <p style="margin: 0; color: #e4e4e7; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${message}</p>
          </div>

          <!-- Reply button -->
          <div style="margin-top: 24px; text-align: center;">
            <a href="mailto:${email}?subject=Re: Your Project Inquiry — Aadugaadu" 
               style="display: inline-block; background: #7c3aed; color: #fff; text-decoration: none; padding: 12px 32px; border-radius: 8px; font-size: 14px; font-weight: 700; letter-spacing: 0.5px;">
              Reply to ${name} →
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="padding: 16px 28px; border-top: 1px solid #1a1a1a; text-align: center;">
          <p style="margin: 0; color: #555; font-size: 11px;">
            This email was automatically sent from your Aadugaadu website contact form.
          </p>
        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

/**
 * Send confirmation email to the user acknowledging their submission
 */
const sendConfirmationToUser = async ({ name, email, service }) => {
  const mailOptions = {
    from: `"Aadugaadu" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Thank you for reaching out, ${name}! 🙌`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; border-radius: 16px; overflow: hidden; border: 1px solid #222;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #7c3aed, #6d28d9); padding: 36px 28px; text-align: center;">
          <h1 style="margin: 0; color: #fff; font-size: 26px; font-weight: 800;">
            We got your message! 🎉
          </h1>
        </div>

        <!-- Body -->
        <div style="padding: 32px 28px;">
          <p style="color: #e4e4e7; font-size: 15px; line-height: 1.8; margin: 0 0 16px;">
            Hi <strong style="color: #fff;">${name}</strong>,
          </p>
          <p style="color: #a1a1aa; font-size: 14px; line-height: 1.8; margin: 0 0 16px;">
            Thank you for reaching out to <strong style="color: #7c3aed;">Aadugaadu</strong>! We've received your inquiry${service ? ` regarding <strong style="color: #fff;">${service}</strong>` : ''} and our team is already looking into it.
          </p>
          <p style="color: #a1a1aa; font-size: 14px; line-height: 1.8; margin: 0 0 24px;">
            We typically respond within <strong style="color: #fff;">24 hours</strong>. In the meantime, feel free to reply to this email if you have any additional details to share.
          </p>

          <!-- What's next box -->
          <div style="background: #111; border: 1px solid #222; border-radius: 10px; padding: 20px;">
            <p style="margin: 0 0 12px; color: #fff; font-size: 14px; font-weight: 700;">What happens next?</p>
            <ol style="margin: 0; padding-left: 18px; color: #a1a1aa; font-size: 13px; line-height: 2;">
              <li>Our team reviews your project requirements</li>
              <li>We schedule a discovery call to understand your vision</li>
              <li>You receive a detailed proposal & timeline</li>
            </ol>
          </div>
        </div>

        <!-- Footer -->
        <div style="padding: 20px 28px; border-top: 1px solid #1a1a1a; text-align: center;">
          <p style="margin: 0 0 4px; color: #888; font-size: 13px; font-weight: 600;">Aadugaadu</p>
          <p style="margin: 0; color: #555; font-size: 11px;">
            Building digital experiences that matter.
          </p>
          <p style="margin: 8px 0 0; color: #555; font-size: 11px;">
            <a href="mailto:info.aadugaadu@gmail.com" style="color: #7c3aed; text-decoration: none;">info.aadugaadu@gmail.com</a>
          </p>
        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendNotificationToTeam, sendConfirmationToUser };
