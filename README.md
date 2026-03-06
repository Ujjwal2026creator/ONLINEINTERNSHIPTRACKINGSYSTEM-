# Online Internship Tracking System

A full-stack web application for tracking internship opportunities and applications.

## Features
- Create and view internship listings
- Track internship applications
- User-friendly interface

## Tech Stack
- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: MongoDB

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Git

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd ONLINEINTERNSHIPTRACKING
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

### Environment Variables

Create a `.env` file in the `backend` directory:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=development
```

### Running the Application

1. Start the backend server
```bash
cd backend
npm start
```

2. Start the frontend development server (in another terminal)
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`

## Deployment

### Render.com Deployment
1. Push the code to GitHub
2. Create a new Web Service on Render.com
3. Connect your GitHub repository
4. Set up environment variables in Render dashboard
5. Configure build and start commands

## License
MIT
