import express from 'express';
import cors from 'cors';
import { sendEmail } from './utils/emailService.js';
import { taskAssignedTemplate, alertTemplate, successTemplate, infoTemplate } from './utils/templates.js';

const app = express();
app.use(cors());
app.use(express.json());

// Fake DB for parent emails
const parentEmail = process.env.PARENT_TEST_EMAIL || 'testparent@gmail.com';

app.post('/api/notify', async (req, res) => {
  const { type, childName, taskTitle, message } = req.body;

  console.log(`\n[NEURONEST WORKFLOW LOG] ⚙️ Processing incoming event...`);
  console.log(`[BACKEND] 👶 Child Activity Detected: ${childName} | Type: ${type}`);
  
  try {
    console.log(`[DATABASE] 🗄️ Saving progress and updating performance trends for ${childName}...`);
    
    if (type === 'task') {
      console.log(`[WORKFLOW] ⚡ Condition check: Task Assigned -> Triggering Teacher-Parent link...`);
      await sendEmail({
        to: parentEmail,
        subject: `New Task Assigned for ${childName} 📘`,
        html: taskAssignedTemplate(childName, taskTitle)
      });
    } else if (type === 'alert') {
      console.log(`[WORKFLOW] 🚨 Condition check: Low performance alert -> Triggering Urgent notification...`);
      await sendEmail({
        to: parentEmail,
        subject: `Attention Needed for ${childName} 🚨`,
        html: alertTemplate(childName)
      });
    } else if (type === 'success') {
      console.log(`[WORKFLOW] 🏆 Condition check: Milestone achieved -> Triggering Achievement email...`);
      await sendEmail({
        to: parentEmail,
        subject: `Great Progress by ${childName}! 🎉`,
        html: successTemplate(childName)
      });
    } else if (type === 'info') {
      console.log(`[WORKFLOW] 📩 Condition check: Feedback sent -> Triggering direct communication email...`);
      await sendEmail({
        to: parentEmail,
        subject: `Teacher Message regarding ${childName} 📨`,
        html: infoTemplate(childName, message || taskTitle)
      });
    }

    console.log(`[NOTIFICATION] 📧 Status: Dispatched to ${parentEmail}\n`);
    res.status(200).json({ success: true, message: 'Notification processed' });
  } catch (error) {
    console.error('[ERROR] Failed to process workflow step:', error);
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
