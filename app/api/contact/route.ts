import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, subject, message } = await request.json()

    // Here you would typically use an email service like Resend, SendGrid, or Nodemailer
    // For this example, I'll simulate the email sending process

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real application, you would send the email here
    // Example with a hypothetical email service:
    /*
    await emailService.send({
      to: 'shaheermalik03@gmail.com',
      from: 'noreply@careerai.com',
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    })
    */

    // For demonstration, we'll just log the data
    console.log("Contact form submission:", {
      to: "shaheermalik03@gmail.com",
      from: email,
      name: `${firstName} ${lastName}`,
      subject,
      message,
    })

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ success: false, message: "Failed to send message" }, { status: 500 })
  }
}
