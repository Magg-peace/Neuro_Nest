# 🧠 NeuroNest

### *Emotion-Aware, Gamified Learning Ecosystem for Every Unique Mind*

<p align="center">
  <a href="https://neuro-nest-amber.vercel.app/">
    <img src="https://img.shields.io/badge/Live%20Demo-Visit%20Platform-FF69B4?style=for-the-badge&logo=vercel" alt="Live Demo">
  </a>
  <img src="https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/Built%20With-React%20%7C%20Spring%20Boot-blue?style=for-the-badge" alt="Built With">
</p>

---

## 🌟 Vision

**NeuroNest** transforms early education for neurodivergent children (ADHD, Autism, Dyslexia) into an **interactive, adaptive, and emotionally intelligent experience**. 

It goes beyond content delivery — creating a system where children **learn, play, and grow** through sensory-friendly engagement and deep AI-driven personalization.

---

## 🚀 Key Innovation Pillars

### 🎭 **Emotion-Aware Learning Engine**
The platform dynamically adapts its modules and UI based on the child's recorded mood. Whether they are **Happy, Calm, Tired, or Anxious**, NeuroNest adjusts the difficulty and sensory input to match their cognitive state.

### 🎮 **High-Stakes Gamification**
Integrated XP system, target rewards, streaks, and achievement badges. Children don't just "study"; they go on **"Animated Adventures"** to earn points for their virtual store.

### 🏢 **The Unified Trinity**
*   **Child World**: A safe, bubbly, and engaging interface for learning.
*   **Parent Hub**: Real-time behavioral tracking and AI-generated progress insights.
*   **Teacher Command**: Class-wide roster management and AI-driven intervention alerts.

---

## 🛠️ The Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18 + Vite + Tailwind/Vanilla CSS |
| **Backend** | Spring Boot 3.x (Java 17) |
| **Architecture** | Dockerized Containers (Production Ready) |
| **Database** | MySQL (with H2 In-Memory Fallback) |
| **AI Brain** | Google Gemini 2.0 Flash (Adaptive Content) |
| **Deployment** | Vercel (Frontend) & Render (Backend) |

---

## 🧩 System Architecture

```mermaid
graph TD
    subgraph Frontend
        A[Child Portal]
        B[Parent Dashboard]
        C[Teacher Hub]
    end
    
    subgraph "Backend (Spring Boot)"
        D[Auth & Security]
        E[Learning Logic]
        F[Sync Engine]
    end
    
    subgraph Intelligence
        G[Gemini AI]
        H[Emotion Mapping]
    end
    
    A & B & C <--> D
    D <--> E
    E <--> G
    G <--> H
    E <--> F
```

---

## 🐳 Docker Deployment (Render/Production)

NeuroNest is fully containerized for easy deployment.

```bash
# Build the production JAR
./mvnw clean package

# Run via Docker
docker build -t neuronest-backend .
docker run -p 8080:8080 -e PORT=8080 neuronest-backend
```

---

## 📌 Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/Magg-peace/Neuro_Nest
```

### 2. Launch Local Environment
We've included a one-click launcher for Windows users:
```bash
.\start_application.bat
```

### 3. Manual Setup
**Frontend:**
```bash
cd frontend && npm install && npm run dev
```
**Backend:**
```bash
cd neuronest && ./mvnw spring-boot:run
```

---

## 🤝 Roadmap & Future
*   **AI Voice Tutor**: Real-time safe-speech interaction.
*   **Predictive Burnout Detection**: Alerts parents before sensory overload occurs.
*   **Global Content Library**: Community-driven lesson modules for specific neuro-profiles.

---

## 📜 License & Credit
**Developed for the Hackathon Demo.**
*Built with 💛 by the NeuroNest Team.*

---

> *"Because every mind thinks differently, and every difference is a strength."*
