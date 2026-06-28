<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
  <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" alt="Flask" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white" alt="Firebase" />
  
  <h1 align="center">Sustainable Waste Management AI</h1>

  <p align="center">
    A full-stack AI-powered sustainable waste management web application that identifies waste types and provides eco-friendly disposal instructions.
    <br />
    <br />
    <a href="#features">Features</a>
    ·
    <a href="#tech-stack">Tech Stack</a>
    ·
    <a href="#setup-instructions">Setup</a>
  </p>
</div>

## 🌟 Introduction

Sustainable Waste Management AI is an innovative platform designed to help individuals and communities make environmentally conscious decisions. By leveraging advanced AI models, the app classifies waste from user inputs and provides actionable, eco-friendly disposal instructions. 

Users can track their sustainability impact over time, find local collection centers via an interactive map, and manage their scan history through a seamless, fully responsive user interface.

## ✨ Features

- **🔐 Secure Authentication**: Firebase-powered Email/Password Login & Signup.
- **🤖 AI Waste Classification**: Input waste details and instantly receive AI-generated disposal and recycling instructions.
- **⚡ Quick Select**: Convenient buttons for common waste items to streamline the scanning process.
- **📊 Impact Dashboard**: Visualize your recycling habits and environmental impact with beautiful Chart.js analytics.
- **📜 Scan History**: Track past scans with categorized tags (Recyclable, Hazardous, etc.).
- **🗺️ Interactive Map**: Locate nearby waste collection and recycling centers using an interactive Leaflet.js map.
- **📱 Fully Responsive**: A modern, mobile-first UI with Dark/Light theme support that looks great on any device.
- **🔄 Real-time Data**: Seamless integration with Firebase Firestore for real-time history and dashboard updates.

## 🛠 Tech Stack

### Frontend
- **React.js** (Vite) - Component-based UI
- **Tailwind CSS** - Utility-first styling and theme management
- **Chart.js & React-Chartjs-2** - Data visualization
- **Leaflet & React-Leaflet** - Interactive maps
- **Lucide React** - Beautiful iconography

### Backend
- **Python (Flask)** - Lightweight RESTful API server
- **Groq API** - AI-powered LLM for fast waste classification

### Database & Services (Firebase)
- **Firebase Authentication** - User identity management
- **Firebase Firestore** - NoSQL database for storing user scan histories

## 🏗 System Architecture

1. **Client (React/Vite)**: The user interacts with the responsive web interface. Auth state is managed via React Context and Firebase Auth.
2. **Backend (Flask)**: The frontend sends scan requests and fetches data from the Flask API.
3. **AI Engine**: The Flask backend communicates with the Groq API to analyze waste inputs and generate structured classification data.
4. **Database (Firestore)**: The backend saves and retrieves user-specific scan records and dashboard analytics from Firebase Firestore.

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16+)
- Python (3.8+)
- Firebase Account
- Groq API Key

### 1. Clone the repository
```bash
git clone https://github.com/Dileep0610/Sustainable-Waste-Management.git
cd Sustainable-Waste-Management
```

### 2. Backend Setup (Flask)
```bash
cd backend
python -m venv venv
# On Windows
venv\Scripts\activate
# On Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
```

### 3. Frontend Setup (React/Vite)
```bash
cd ../frontend
npm install
```

### 4. Environment Variables
Create a `.env` file in the `frontend` directory:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Create a `.env` file in the `backend` directory:
```env
GROQ_API_KEY=your_groq_api_key
```

### 5. Firebase Configuration Setup
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project or select an existing one.
3. Enable **Authentication** (Email/Password provider).
4. Enable **Firestore Database**.
5. Generate a new Private Key from `Project Settings > Service Accounts` and save it as `backend/serviceAccountKey.json`.
6. Copy the web app configuration into the frontend `.env` file.

### 6. Run Locally
**Start the Backend:**
```bash
cd backend
python app.py
```
**Start the Frontend:**
```bash
cd frontend
npm run dev
```
Navigate to `http://localhost:5173` in your browser.

## 📸 Screenshots

*(Placeholders for future screenshots)*
- `assets/screenshots/dashboard.png`
- `assets/screenshots/scanner.png`
- `assets/screenshots/map.png`

## 🔮 Future Enhancements
- Social Login Integration (Google, GitHub).
- Image-based AI scanning (upload photos of waste).
- Community leaderboards and gamification.
- Mobile application using React Native.

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

## 👨‍💻 Author
**Dileep** - [GitHub Profile](https://github.com/Dileep0610)
