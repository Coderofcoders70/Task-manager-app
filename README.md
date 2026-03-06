Task Management System

A robust, full-stack Task Management application built with a primary focus on a secure, modular Backend API and a supportive, responsive Frontend UI. This project implements JWT Authentication, Role-Based Access Control (RBAC) , and full CRUD operations for managing tasks.

🛠️ Tech Stack

1. Backend (Primary Focus) 

Runtime: Node.js

Framework: Express.js (Modular Architecture) 

Authentication: JWT (JSON Web Tokens) with bcryptjs for password hashing 

Documentation: Swagger UI & OpenApi 3.0 

Logging: Morgan (Streamed to local file system) 


2. Database

Primary DB: MongoDB (NoSQL) 

ORM: Mongoose (Schema-based modeling) 


3. Frontend (Supportive UI) 

Framework: React.js (Vite) 

Styling: Tailwind CSS (Responsive Design)

API Client: Axios (With interceptors for JWT handling) 

✨ Key Features

1. Secure Auth: User registration and login with encrypted passwords.

2. Role-Based Access (RBAC): Admin users can view/manage all tasks, while standard users only see their own.

3. Task CRUD: Create, Read, Update, and Delete tasks with real-time UI feedback.

4. API Versioning: All routes are prefixed with /api/v1/ for future-proofing.

5. Input Validation: Sanitization and validation for all incoming requests.

6. Live Logging: Every request is logged into backend/logs/access.log for auditing.


🚀 Scalability Note: 

To prepare this system for high-traffic production environments, the following strategies would be implemented:

1. Horizontal Scaling: Move to a Microservices architecture where the Auth and Task modules reside on separate servers to scale independently.

2. Caching: Implement Redis for the GET /tasks endpoints to reduce database read pressure and improve response times.

3. Load Balancing: Deploy multiple Node.js instances behind an Nginx Load Balancer to distribute incoming traffic evenly.Database

4. Optimization: Transition to MongoDB Sharding to distribute large datasets across multiple clusters.Containerization: Use Docker to ensure deployment consistency across different cloud environments.

⚙️ Installation & Setup1. Backend SetupBashcd backend

npm install

# Create a .env file with: PORT, MONGO_URI, JWT_SECRET

npm run dev
API Documentation: Visit http://localhost:5000/api-docs.

2. Frontend SetupBashcd frontend
npm install
npm run dev
