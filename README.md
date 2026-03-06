$env:Path += ";C:\Program Files\Git\bin"
cd d:\ONLINEINTERNSHIPTRACKING
git remote add origin https://github.com/YOUR_USERNAME/ONLINEINTERNSHIPTRACKING.git
git branch -M main
git push -u origin main# Online Internship Tracking

A web application for tracking online internships with a backend API and frontend interface.

## Project Structure

```
├── backend/          # Node.js backend server
│   ├── config/       # Database configuration
│   ├── controllers/  # Route controllers
│   ├── models/       # Database models
│   ├── routes/       # API routes
│   ├── server.js     # Server entry point
│   └── package.json
│
└── frontend/         # Vite + React frontend
    ├── src/
    │   ├── components/  # React components
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    └── package.json
```

## Getting Started

### Prerequisites
- Node.js and npm installed

### Installation

1. **Backend Setup**
```bash
cd backend
npm install
npm start
```

2. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

## License

MIT
