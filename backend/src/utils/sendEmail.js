import nodemailer from "nodemailer";

// Create transporter once when the application starts
const transporter =
  process.env.EMAIL_USER && process.env.EMAIL_PASS
    ? nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      })
    : null;

/**
 * Sends an email notification
 * @param {Object} options
 * @param {string} options.name
 * @param {string} options.email
 * @param {string} options.subject
 * @param {string} options.message
 */
export const sendEmail = async ({
  name,
  email,
  subject,
  message,
}) => {
  // Skip email sending if not configured
  if (!transporter) {
    console.warn(
      "Email configuration missing. Skipping email sending."
    );
    return null;
  }

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO || process.env.EMAIL_USER,
    replyTo: email,
    subject: `New Message: ${subject || "No Subject"}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563eb;">
          New Portfolio Message
        </h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || "No Subject"}</p>

        <hr style="margin: 20px 0;" />

        <div>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; line-height: 1.6;">
            ${message}
          </p>
        </div>

        <hr style="margin: 20px 0;" />

        <p style="font-size: 12px; color: #64748b;">
          Sent from your portfolio website.
        </p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.messageId);

    return info;
  } catch (error) {
    console.error("Nodemailer Error:", error);

    throw new Error(
      error.message || "Failed to send email notification"
    );
  }
};