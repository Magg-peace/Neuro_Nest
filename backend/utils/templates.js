export const taskAssignedTemplate = (childName, tasks) => {
  const taskList = Array.isArray(tasks) ? tasks : [tasks];
  return `
  <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #edf2f7; border-radius: 16px; overflow: hidden; color: #2d3748;">
    <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 40px; text-align: center; color: white;">
      <h1 style="margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">🧠 NeuroNest</h1>
      <p style="margin: 10px 0 0; opacity: 0.9; font-size: 16px;">Intelligent Learning Ecosystem</p>
    </div>
    
    <div style="padding: 40px; line-height: 1.6;">
      <h2 style="color: #1a202c; margin-top: 0; font-size: 22px;">Hi there 👋</h2>
      <p style="font-size: 16px;">New learning activities have been assigned to <strong>${childName}</strong> by the teacher.</p>
      
      <div style="margin: 30px 0; background: #f7fafc; padding: 25px; border-radius: 12px; border-left: 5px solid #6366f1;">
        <h3 style="margin: 0 0 15px 0; font-size: 14px; text-transform: uppercase; color: #718096; letter-spacing: 1px;">📘 Assigned Tasks</h3>
        ${taskList.map(t => `<div style="padding: 8px 0; font-size: 18px; font-weight: 600; color: #2d3748;">🚀 ${t}</div>`).join('')}
      </div>

      <div style="margin-bottom: 30px;">
        <h3 style="margin: 0 0 10px 0; font-size: 18px; color: #1a202c;">💡 Why this matters</h3>
        <p style="margin: 0; color: #4a5568;">These activities help improve <strong>focus, memory, and pattern recognition skills</strong>, making learning more engaging and effective for ${childName}.</p>
      </div>

      <div style="margin-bottom: 40px;">
        <h3 style="margin: 0 0 10px 0; font-size: 18px; color: #1a202c;">🎯 What ${childName} should do</h3>
        <ul style="padding-left: 20px; color: #4a5568; margin: 0;">
          <li>Open NeuroNest and complete the activity</li>
          <li>Try to score maximum points ⭐</li>
        </ul>
      </div>

      <div style="text-align: center;">
        <a href="http://localhost:5173" style="display: inline-block; background: #6366f1; color: white; padding: 16px 35px; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 18px; box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);">
          🚀 Open NeuroNest
        </a>
      </div>
    </div>

    <div style="background: #f8fafc; padding: 30px; text-align: center; color: #718096; font-size: 14px; border-top: 1px solid #edf2f7;">
      <p style="margin: 0 0 5px 0;">💛 Keep encouraging ${childName} — small steps lead to big growth!</p>
      <p style="margin: 0;">— Team NeuroNest</p>
    </div>
  </div>
`;
};

export const alertTemplate = (childName) => `
  <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; border: 1px solid #fff5f5; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
    <div style="background: #fc8181; padding: 30px; text-align: center; color: white;">
      <h1 style="margin: 0; font-size: 24px;">🚨 Attention Needed</h1>
    </div>
    <div style="padding: 40px; color: #2d3748; line-height: 1.6;">
      <h2 style="color: #c53030; margin-top: 0;">Support needed for ${childName} 💛</h2>
      <p>Our AI system has detected that <strong>${childName}</strong> is experiencing a drop in focus or elevated stress levels during today's sessions.</p>
      
      <div style="background: #fff5f5; padding: 20px; border-radius: 12px; border-left: 4px solid #fc8181; margin: 25px 0;">
        <p style="margin: 0; color: #9b2c2c;"><strong>🧠 AI Insight:</strong> Focus typically improves after a 10-minute break with visual stimulation.</p>
      </div>

      <p>Please review the behavioral insights on your parent dashboard.</p>
      
      <div style="text-align: center; margin-top: 30px;">
        <a href="http://localhost:5173" style="background: #fc8181; color: white; padding: 14px 28px; text-decoration: none; border-radius: 10px; font-weight: bold; display: inline-block;">View Dashboard</a>
      </div>
    </div>
  </div>
`;

export const successTemplate = (childName) => `
  <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; border: 1px solid #f0fff4; border-radius: 16px; overflow: hidden;">
    <div style="background: #68d391; padding: 30px; text-align: center; color: white;">
      <h1 style="margin: 0; font-size: 24px;">🎉 Achievement Unlocked!</h1>
    </div>
    <div style="padding: 40px; color: #2d3748; line-height: 1.6;">
      <h2 style="color: #276749; margin-top: 0;">Great Progress, ${childName}!</h2>
      <p style="font-size: 18px;"><strong>${childName}</strong> has just reached a new milestone! Consistency is the key to mastery.</p>
      
      <div style="background: #f0fff4; padding: 30px; border-radius: 12px; text-align: center; margin: 25px 0;">
        <div style="font-size: 60px; margin-bottom: 10px;">🏆</div>
        <p style="margin: 0; font-weight: bold; color: #2f855a; font-size: 20px;">Mastery Level: Patterns</p>
      </div>
      
      <p style="text-align: center; color: #4a5568;">"Focus and patterns are improving by 15% this week." — AI Assistant</p>
    </div>
  </div>
`;

export const infoTemplate = (childName, message) => `
  <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; border-radius: 16px; overflow: hidden; border: 1px solid #ebf8ff;">
    <div style="background: #63b3ed; padding: 25px; text-align: center; color: white;">
      <h1 style="margin: 0; font-size: 22px;">📧 Message from Teacher</h1>
    </div>
    <div style="padding: 40px; color: #2d3748; line-height: 1.6;">
      <p>Hello,</p>
      <p>The teacher shared an update regarding <strong>${childName}</strong>:</p>
      <div style="background: #ebf8ff; padding: 25px; border-radius: 12px; font-style: italic; color: #2b6cb0; font-size: 16px; border-left: 4px solid #63b3ed;">
        "${message}"
      </div>
      <div style="text-align: center; margin-top: 35px;">
        <a href="http://localhost:5173" style="background: #63b3ed; color: white; padding: 14px 28px; text-decoration: none; border-radius: 10px; font-weight: bold; display: inline-block;">Reply in Dashboard</a>
      </div>
    </div>
  </div>
`;
