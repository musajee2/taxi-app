# === Base Stage ===
FROM node:18-alpine AS base
WORKDIR /app

# === Install backend dependencies ===
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# === Build frontend ===
COPY frontend ./frontend/
RUN cd frontend && npm install && npm run build

# === Copy full source ===
COPY . .

# === Copy frontend build into backend ===
RUN cp -r frontend/dist backend/dist

# === Final Stage ===
WORKDIR /app/backend
EXPOSE 4000

CMD ["node", "src/index.js"]
