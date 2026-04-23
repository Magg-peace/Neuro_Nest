import express from 'express';
import cors from 'cors';
import { sendEmail } from './utils/emailService.js';
import { taskAssignedTemplate, alertTemplate, successTemplate } from './utils/templates.js';

const app = express();
app.use(cors());
app.use(express.json());

// Fake DB for parent emails
const parentEmail = process.env.PARENT_TEST_EMAIL || 'testparent@gmail.com';

app.post('/api/notify', async (req, res) => {
  const { type, childName, taskTitle } = req.body;

  try {
    if (type === 'task') {
      await sendEmail({
        to: parentEmail,
        subject: "New Task Assigned for Your Child 📘",
        html: taskAssignedTemplate(childName, taskTitle)
      });
    } else if (type === 'alert') {
      await sendEmail({
        to: parentEmail,
        subject: "Attention Needed 🚨",
        html: alertTemplate(childName)
      });
    } else if (type === 'success') {
      await sendEmail({
        to: parentEmail,
        subject: "Great Progress! 🎉",
        html: successTemplate(childName)
      });
    }

    res.status(200).json({ success: true, message: 'Notification processed' });
  } catch (error) {
    console.error('Failed to send notification', error);
    res.status(500).json({ success: false, error: error.message });
  }
});
app.get("/test-email", async (req, res) => {
  try {
    await sendEmail({
      to: process.env.PARENT_TEST_EMAIL || 'testparent@gmail.com',
      subject: "Test Email from NeuroNest 🚀",
      html: "<h2>It works!</h2><p>Your environment variables are correctly configured.</p>"
    });
    res.send("Email sent! Check your inbox.");
  } catch (err) {
    res.status(500).send("Error sending email.");
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Notification service running on port ${PORT}`);
  console.log(`Test endpoint available at: http://localhost:${PORT}/test-email`);
});
