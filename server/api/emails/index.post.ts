import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "smtp.eu.mailgun.org",
    port: 587,
    auth: {
        user: `veloris@mail.codywakeford.com`,
        pass: "ezcWNTbc7sz!WiG",
    },
})

export default eventHandler(async (event) => {
    const { email }: { email: Email } = await readBody(event)

    email.from = "codypwakeford@gmail.com"

    try {
        await transporter.sendMail(email)
    } catch (error) {
        throw createError({ statusCode: 500, message: `Error sending email: ${error}.` })
    }
})
