const express = require('express')
const cors = require('cors')
const { sendMail } = require('./mail')

const app = express()
app.use(cors())
app.use(express.json())

app.post('/signup', async (req, res) => {
  const { email } = req.body
  if (!email) return res.status(400).json({ error: 'Missing email' })

  const verificationLink = `http://example.com/verify?email=${encodeURIComponent(email)}`
  await sendMail({
    to: email,
    subject: 'Verify your email address',
    html: `<p>Thanks for signing up!</p><p><a href="${verificationLink}">Verify your email</a></p>`
  })

  res.json({ message: 'Verification email sent' })
})

app.post('/forgot-password', async (req, res) => {
  const { email } = req.body
  if (!email) return res.status(400).json({ error: 'Missing email' })

  const resetLink = `http://example.com/reset-password?email=${encodeURIComponent(email)}`
  await sendMail({
    to: email,
    subject: 'Reset your password',
    html: `<p>Forgot your password?</p><p><a href="${resetLink}">Reset Password</a></p>`
  })

  res.json({ message: 'Reset email sent' })
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`)
})