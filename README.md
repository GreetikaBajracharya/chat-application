#  Real-Time Chat Application (MERN + Socket.IO)

A real-time chat application built with the **MERN stack** (MongoDB, Express, React, Node.js) and **Socket.IO** for instant messaging.  
This project allows users to send and receive messages instantly, with authentication, responsive UI, and chat room features.

---

##  Features
-  **User Authentication** (Register & Login)  
-  **One-to-One Chat** in real-time  
-  **Chat Rooms** / Group Chats  
-  **Instant Messaging** using **Socket.IO**  
-  **Online/Offline Status** indicators  
-  **Responsive UI** (works on mobile & desktop)  
-  Styled with **TailwindCSS / CSS (depending on your implementation)**  

---

##  Tech Stack
- **Frontend:** React, Context API / Redux, TailwindCSS (or CSS)  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose ODM)  
- **Real-time Engine:** Socket.IO  
- **Authentication:** JWT (JSON Web Tokens), bcrypt  

---
##  Project Structure

```
chat-application/
│
├── backend/ # Express + MongoDB + Socket.IO server
│   ├── models/ # Mongoose models
│   ├── routes/ # API routes (auth, chat, messages)
│   ├── controllers/ # Business logic
│   └── server.js # App entry point
│
├── frontend/ # React client
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/ # Login, Register, Chat UI
│   │   ├── context/ # State management
│   │   └── App.js
│   │
└── README.md
```
##  Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Cloudinary account (for image uploads)

