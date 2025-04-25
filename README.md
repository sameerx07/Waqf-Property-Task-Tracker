# 🏠 Waqf Property Task Tracker

A sleek MERN stack application for property managers to efficiently track tasks related to Waqf properties.

---

**Visit website:** [Waqf Property Task Tracker](https://waqf-task-tracker.netlify.app/) 🌐


## 🚀 Key Features

- **Property Management** 📁 - Add, edit, and list properties
- **Task Creation** ✅ - Assign tasks with deadlines
- **Status Tracking** ⏳ - Monitor progress with overdue alerts
- **Smart Filtering** 🔍 - Organize tasks by property and status

---

## 🛠️ Tech Stack

- **MongoDB** 🐘 - Robust database solution
- **Express.js** 🚀 - Lightweight backend framework
- **React** 🌟 - Interactive frontend components
- **Node.js** 📦 - JavaScript runtime environment
- **TypeScript** 📝 - Strict type checking
- **Tailwind CSS** 🎨 - Utility-first styling

---

## 💻 Getting Started

### 👨‍💻 Prerequisites

- **Node.js** 🔧 installed
- **MongoDB** 🐘 local or Atlas account

### 🚀 Setup Instructions

1. **Clone Repository** 📋
   ```bash
   git clone [repository-url]

2. **Install Dependencies 📦**
     npm install

3. **Environment Setup 🔑**
     PORT=3000
     MONGO_URI=mongodb://localhost:27017/waqf-tracker
     NODE_ENV=development
     JWT_SECRET= YOUR_JWT_SECRETE
     **Frontend:** VITE_API_URL=http://localhost:3000


4. **Run Application ▶️**
     # Concurrent development mode
       npm run dev

     # Separate environments
       npm run dev:frontend
       npm run dev:backend

**🌐 API Endpoints**
    Properties
    GET /api/properties 📄 - Get all properties
    POST /api/properties ✏️ - Create new property
    GET /api/properties/:id 🔍 - Get single 
    
    Tasks
    GET /api/tasks 📋 - Retrieve tasks (with filters)
    POST /api/tasks ✅ - Create new task
    PUT /api/tasks/:id/status ⚙️ - Update task status


 **🗂️ Project Structure**
        project/
├── backend/ 🖥️
│   ├── config/     - Database settings 📄
│   ├── controllers/ - Route handlers 🧰
│   ├── middleware/ - Security layers 🔒
│   ├── models/     - Data schemas 📊
│   ├── routes/     - API endpoints 📦
│   └── server.js   - Application core 🚀
├── src/            - React frontend 🌟
│   ├── components/ - UI elements 🧩
│   ├── pages/      - View templates 📄
│   ├── services/   - API integration 🛠️
│   └── types/      - Type definitions 📝
└── package.json    - Project dependencies 📦

**🔓 License**
   MIT License © 2023 - Feel free to fork and modify! 🛠️

For more information and live demo, visit website: [Waqf Property Task Tracker](https://waqf-task-tracker.netlify.app/) 🌐
   
