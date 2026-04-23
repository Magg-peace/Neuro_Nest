export const taskAssignedTemplate = (childName, task) => `
  <h2>📘 New Task for ${childName}</h2>
  <p>A new learning activity has been assigned by the teacher.</p>
  <p><strong>Task:</strong> ${task}</p>
  <button style="padding:10px 20px;background:#6366f1;color:white;border:none;border-radius:8px;cursor:pointer;">
    Open NeuroNest
  </button>
`;

export const alertTemplate = (childName) => `
  <h2>⚠️ Attention Needed</h2>
  <p>${childName} may need support in learning today.</p>
  <p>Please check the Parent Dashboard for insights and new recommendations.</p>
`;

export const successTemplate = (childName) => `
  <h2>🎉 Great Progress!</h2>
  <p>${childName} completed today's learning successfully!</p>
`;
