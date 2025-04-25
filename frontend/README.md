# Waqf Property Task Tracker

A MERN stack application designed to help Waqf property managers track tasks related to property management.

## Features

- Property management (add and list properties)
- Task creation and assignment to properties
- Task status tracking with overdue detection
- Filtering tasks by property and status

## Tech Stack

- **MongoDB** - Database
- **Express.js** - Backend API
- **React** - Frontend UI
- **Node.js** - Runtime environment
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed locally or MongoDB Atlas account

### Setup Instructions

1. Clone the repository

2. Install dependencies
   ```
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/waqf-tracker
   NODE_ENV=development
   ```

4. Run the application
   ```
   # Run backend and frontend concurrently
   npm run dev
   
   # Or run them separately
   npm run dev:frontend
   npm run dev:backend
   ```

5. Access the application
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3000`

## API Endpoints

### Properties
- `GET /api/properties` - Get all properties
- `POST /api/properties` - Add a new property
- `GET /api/properties/:id` - Get a single property

### Tasks
- `GET /api/tasks` - Get all tasks (with optional filters)
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id/status` - Update a task's status

## Project Structure

```
project/
├── backend/
│   ├── config/     - Database configuration
│   ├── controllers/ - Route controllers
│   ├── middleware/ - Express middleware
│   ├── models/     - Mongoose models
│   ├── routes/     - API routes
│   └── server.js   - Entry point
├── src/            - Frontend React application
│   ├── components/ - React components
│   ├── pages/      - Page components
│   ├── services/   - API service functions
│   └── types/      - TypeScript interfaces
└── package.json    - Project dependencies
```

## License

This project is licensed under the MIT License.