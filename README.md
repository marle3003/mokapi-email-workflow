# Email Workflow Testing with Vue 3, Express, Playwright & Mokapi

This repository demonstrates how to build and test email workflows—like signup verification and forgot password—using a Vue 3 frontend, Express backend, and Playwright tests with a mocked mail server powered by Mokapi.

## Features

- Vue 3 signup and forgot password forms
- Express backend sending emails via Mokapi SMTP
- Mokapi mock mail server captures and exposes emails via API
- Playwright tests trigger workflows and verify emails automatically

## Prerequisites

- Node.js
- [Mokapi](https://mokapi.io)

## Getting Started

### 1. Install dependencies

Before running anything, install npm dependencies in the project root:

```bash
npm install
```

### 2. Start Mokapi mock mail server

From project root, run:
```bash
mokapi mocks/mail.yaml
```
This starts Mokapi’s SMTP and mock mail API.

### 3. Start backend server

In a new terminal:
```bash
node backend/index.js
````
The backend will send emails to Mokapi SMTP server.

### 4. Run Playwright tests

In another terminal, run:
```bash
npx playwright test
````
Playwright will launch the Vue 3 frontend app, run end-to-end tests by submitting forms, and verify emails using Mokapi’s REST API.

## Project Structure

```bash
/backend           # Express backend code
/mocks/mail.yaml   # Mokapi mock mail server configuration
/tests             # Playwright test scripts
/frontend          # Vue 3 frontend app
README.md
```

## License

MIT License