# Health Data Management System

A full-stack web application for managing health data across different facilities and departments. The application includes features for user management, facility management, department management, and health data reporting.

## Project Structure

```
├── backend/           # Backend Node.js application
│   ├── controllers/   # Route controllers
│   ├── middleware/    # Custom middleware
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   └── utils/        # Utility functions
├── frontend/         # React frontend application
│   ├── public/       # Static files
│   └── src/         
│       ├── components/  # Reusable React components
│       ├── features/    # Redux features
│       ├── pages/       # Page components
│       └── services/    # API services
```

## Features

- User Authentication & Authorization
- Facility Management
- Department Management
- Health Data Reporting
- Mobile Responsive Design
- PWA Support with Offline Capabilities
- Interactive Data Visualization
- Real-time Form Validation

## Technology Stack

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Docker support

### Frontend
- React 18
- Redux Toolkit
- Material-UI
- React Router
- Axios
- PWA enabled
- Recharts for data visualization

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB
- Docker (optional)

### Installation

1. Clone the repository
```bash
git clone https://github.com/pdonda06/SGP_6.git
cd SGP_6
```

2. Install Backend Dependencies
```bash
cd backend
npm install
```

3. Install Frontend Dependencies
```bash
cd frontend
npm install
```

### Running the Application

1. Start the Backend Server
```bash
cd backend
npm start
```
The server will start on http://localhost:5001

2. Start the Frontend Development Server
```bash
cd frontend
npm start
```
The frontend will start on http://localhost:3000

### Docker Setup (Optional)
```bash
cd backend
docker-compose up
```

## Environment Variables

### Backend (.env)
```
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## API Endpoints

### Auth Routes
- POST /api/auth/register - Register a new user
- POST /api/auth/login - User login

### Facility Routes
- GET /api/facilities - Get all facilities
- POST /api/facilities - Create new facility
- GET /api/facilities/:id - Get facility by ID

### Department Routes
- GET /api/departments - Get all departments
- POST /api/departments - Create new department
- PUT /api/departments/:id - Update department

### Health Data Routes
- GET /api/health-data - Get all health data
- POST /api/health-data - Create new health data entry
- GET /api/health-data/:id - Get specific health data
- PUT /api/health-data/:id - Update health data

## Progressive Web App (PWA)

The frontend is PWA-enabled with features including:
- Offline functionality
- Install prompt
- Splash screens
- Icon support for various devices

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

