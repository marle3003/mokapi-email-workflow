import { test, expect } from '@playwright/test';

test('Email verification after signup', async ({ page, request }) => {
  // use a random mail address to ensure test is isolated
  const recipient = randomEmail()

  // Step 1: Go to page and submit signup form
  await page.goto('');
  const form = page.getByRole('form', { name: 'Sign Up' })
  await form.getByLabel('Email').fill(recipient)
  await form.getByLabel('Password').fill('SuperSecure123!')
  await form.getByRole('button', { name: 'Sign Up' }).click()
  await expect(form.getByText('Check your inbox to verify your email')).toBeVisible()

  // Step 2: Wait and fetch latest mail from Mokapi (limit=1)
  const mails = await request.get(`http://localhost:8080/api/services/mail/Email%20Workflows/mailboxes/${recipient}/messages?limit=1`);
  const mailList = await mails.json();
  await expect(mailList.length).toBe(1)
  await expect(mailList[0]).toEqual(expect.objectContaining({
    subject: 'Verify your email address',
    from: expect.arrayContaining([expect.objectContaining({
      address: 'noreply@example.com'
    })]),
    to: expect.arrayContaining([expect.objectContaining({
      address: recipient
    })])
  }))

  // Step 3: Fetch the mail body
  const res = await request.get(`http://localhost:8080/api/services/mail/messages/${mailList[0].messageId}`);
  const mail = await res.json()
  await expect(mail.data).toEqual(expect.objectContaining({
    body: `<p>Thanks for signing up!</p><p><a href="http://example.com/verify?email=${encodeURIComponent(recipient)}">Verify your email</a></p>`
  }))
});

test('Forgot password sends reset link', async ({ page, request }) => {
  // use a random mail address to ensure test is isolated
  const recipient = randomEmail()

  // Step 1: Go to page and submit forget password form
  await page.goto('');
  const form = page.getByRole('form', { name: 'Forgot Password' })
  await form.getByLabel('Email').fill(recipient)
  await form.getByRole('button', { name: 'Reset Password' }).click()
  await expect(page.getByText('Check your email for the reset link')).toBeVisible()

  // Step 2: Wait and fetch latest mail from Mokapi (limit=1)
  const mails = await request.get(`http://localhost:8080/api/services/mail/Email%20Workflows/mailboxes/${recipient}/messages?limit=1`);
  const mailList = await mails.json();
  await expect(mailList.length).toBe(1)
  await expect(mailList[0]).toEqual(expect.objectContaining({
    subject: 'Reset your password',
    from: expect.arrayContaining([expect.objectContaining({
      address: 'noreply@example.com'
    })]),
    to: expect.arrayContaining([expect.objectContaining({
      address: recipient
    })])
  }))

  // Step 3: Fetch the mail body
  const res = await request.get(`http://localhost:8080/api/services/mail/messages/${mailList[0].messageId}`);
  const mail = await res.json()
  await expect(mail.data).toEqual(expect.objectContaining({
    body: `<p>Forgot your password?</p><p><a href=\"http://example.com/reset-password?email=${encodeURIComponent(recipient)}">Reset Password</a></p>`
  }))
});

function randomEmail(domain = 'example.com') {
  const randomStr = Math.random().toString(36).substring(2, 10); // 8 random characters
  return `test-${randomStr}@${domain}`;
}