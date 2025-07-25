const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 2525, // Mokapi's SMTP port
  secure: false,
  tls: { rejectUnauthorized: false }
})

async function sendMail({ to, subject, html }) {
  return transporter.sendMail({
    from: '"Test App" <noreply@example.com>',
    to,
    subject,
    html
  })
}

module.exports = { sendMail }