// This script demonstrates how to set up email sending with Resend
// You would need to install the resend package and set up your API key

console.log("Email Service Setup Instructions:")
console.log("================================")
console.log("")
console.log("1. Install Resend (recommended email service):")
console.log("   npm install resend")
console.log("")
console.log("2. Get your API key from https://resend.com")
console.log("")
console.log("3. Add to your environment variables:")
console.log("   RESEND_API_KEY=your_api_key_here")
console.log("")
console.log("4. Update the API route to use Resend:")
console.log(`
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// In your API route:
await resend.emails.send({
  from: 'noreply@yourdomain.com',
  to: 'shaheermalik03@gmail.com',
  subject: \`Contact Form: \${subject}\`,
  html: \`
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> \${firstName} \${lastName}</p>
    <p><strong>Email:</strong> \${email}</p>
    <p><strong>Subject:</strong> \${subject}</p>
    <p><strong>Message:</strong></p>
    <p>\${message}</p>
  \`
});
`)
console.log("")
console.log("Alternative email services:")
console.log("- SendGrid: https://sendgrid.com")
console.log("- Nodemailer with Gmail: https://nodemailer.com")
console.log("- AWS SES: https://aws.amazon.com/ses/")
