# 🚖 Taxi Management System – Cloud-Native App

This is a cloud-native web application built with **Node.js**, **React**, and **MongoDB Atlas**, deployed on **Google Kubernetes Engine (GKE)**.

---

## 📦 Project Structure

```
taxi-app/
├── backend/
│   ├── src/              # Express backend
│   ├── dist/             # Copied React build
│   └── Dockerfile
├── frontend/             # Vite + React
├── deployment.yaml       # Kubernetes deployment spec
├── service.yaml          # Kubernetes service spec
└── docker-compose.yml    # For local development
```

---

## 🚀 Deployment Overview

### ✅ Built With:
- Node.js + Express.js (API)
- React (Frontend)
- MongoDB Atlas (Database)
- Docker + DockerHub (Image hosting)
- Google Kubernetes Engine (Deployment)
- Vite (Frontend bundler)

### ✅ Features:
- User/Admin login
- Bookings management
- Email notifications with Nodemailer
- Cloud-native deployment via GKE

---

## ⚙️ Deployment Steps

### 🐳 Docker

```bash
docker build -t musahx/taxi-app:prod-v4 .
docker push musahx/taxi-app:prod-v4
```

### ☁️ Kubernetes

```bash
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

Access via:
```
http://<EXTERNAL-IP>
```

### 🗂 MongoDB Atlas

Ensure MONGO_URI is set in `.env` or directly in Kubernetes deployment.

---

## 📁 Environment Variables

```env
PORT=4000
MONGO_URI=mongodb://root:root@mongo:27017
JWT_SECRET=supersecretkey
EMAIL_FROM=musajee10122002@gmail.com
EMAIL_PASS=your-app-password
```


## 👨‍💻 Author

**Musa** – SIT323/SIT737 Cloud-Native Application Development (10.2HD)
