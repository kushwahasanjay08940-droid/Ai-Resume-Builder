# 🤖 AI Resume Builder (MERN Stack)

**AI-powered Resume Builder built with MERN Stack (MongoDB, Express, React, Node.js)**
Create, customize, and download professional resumes in minutes with AI assistance.

---

## 🚀  Demo

overview

<img width="941" height="472" alt="Screenshot 2026-04-07 235943" src="https://github.com/user-attachments/assets/10577082-cb76-43a7-b4ff-bff2a6af5785" />

Features

<img width="1893" height="961" alt="Screenshot 2026-04-08 000741" src="https://github.com/user-attachments/assets/8fbe00f8-2415-40bc-9abf-2434a85d54e0" />

Dashboard

<img width="1876" height="947" alt="Screenshot 2026-04-08 000957" src="https://github.com/user-attachments/assets/624e3152-437e-4611-a35e-c1c939378509" />

And Many More

## 🧰 Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Deployment

* Vercel (Frontend)
* Render / Railway / VPS (Backend)

---

## ✨ Features

* 🧠 AI-powered resume content generation
* 📝 Rich form for:

  * Personal Information
  * Work Experience
  * Projects
  * Education
* 🎨 Multiple resume templates
* 📄 Export resume as PDF
* 🔗 Shareable live resume link
* 📱 Fully responsive design
* 🔐 Authentication using JWT
* ☁️ Image upload support (ImageKit / Cloud storage)
* ⚡ Fast and smooth UI with React + Vite

---

## 📂 Project Structure

```
Resume-Builder/
│
├── client/        # React Frontend
│   ├── src/
│   └── ...
│
├── server/        # Express Backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── ...
│
└── README.md
```

---

## 🧩 Setup & Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/resume-builder.git
cd Resume-Builder
```

---

### 2️⃣ Install Dependencies

```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

---

### 3️⃣ Environment Variables

#### 📌 Server (`/server/.env`)

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Image Upload
IMAGEKIT_PRIVATE_KEY=your_imagekit_key

# AI APIs
OPENAI_API_KEY=your_openai_key
OPENROUTER_API_KEY=your_openrouter_key
OPENAI_MODEL=gemini-2.5-flash
```

#### 📌 Client (`/client/.env`)

```env
VITE_BASE_URL=http://localhost:3000
```

---

### 4️⃣ Run Locally

#### ▶️ Start Backend

```bash
cd server
npm run server
```

#### ▶️ Start Frontend

```bash
cd client
npm run dev
```

---

## 🔐 API Features

* User Authentication (Login / Signup)
* Resume CRUD operations
* AI content generation endpoint
* Image upload handling
* Secure routes with JWT

---

## 📸 Screenshots

👉 *Add screenshots here (UI, templates, dashboard)*

---



Make sure to update:

```env
VITE_BASE_URL=https://your-backend-url.com
```

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**

---

## 👨‍💻 Author

**Sanjay Kushwaha**

https://www.linkedin.com/in/sanjay-kushwaha-9012713a8?


⭐ If you like this project, don't forget to **star the repo!**
