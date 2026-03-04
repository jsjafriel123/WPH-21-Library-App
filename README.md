# WPH-21-Library-App
Library App Project of JSjafriel123

📚 Library Web App

A modern full-stack Library Management Web Application built with React + TypeScript, featuring authentication, URL-driven UI state, infinite scrolling, and optimized server-state management with TanStack Query.

🚀 Live Demo

(Add deployed frontend link here if available)
(Add backend API link if public)

🛠 Tech Stack
Frontend

⚡ Vite

⚛ React

🟦 TypeScript

🧠 Redux Toolkit (Authentication + Hydration)

🔄 TanStack Query v5 (Server State Management)

🎯 React Router v6

🎨 Tailwind CSS

🧩 shadcn/ui

Backend

🌐 REST API (Railway deployment)

🔐 JWT Authentication

✨ Features
🔐 Authentication

JWT-based login & register

Token persisted in localStorage

Axios interceptor for auth header

Auth restore flow (/api/me)

Protected routes

Hydration flag to prevent premature rendering

📖 Book Browsing

Paginated book listing

URL-driven search:

?q=

?categoryId=

?minRating=

Infinite scroll using IntersectionObserver

Book detail page

🛒 Borrow System

Borrow books

Optimistic UI updates

Cart selection flow

Loan status support:

BORROWED

LATE

RETURNED

👤 User Profile Page

URL-driven tab system:

/user?tab=profile
/user?tab=loans
/user?tab=reviews

Profile summary (Redux-powered)

Loan history (Infinite Query)

Reviews list (Paginated)

🧠 Architecture Overview
🔹 State Separation Strategy
Type	Tool
Auth identity	Redux Toolkit
Server collections	TanStack Query
UI state (tabs, filters)	URL params

This keeps:

Global identity predictable

Server state cacheable

UI shareable via URL

📂 Project Structure
src/
├── app/                 # Store + typed hooks
├── components/          # Reusable UI components
├── features/            # Feature-based architecture
│   ├── auth/
│   └── books/
├── services/            # API calls
├── pages/               # Route pages
├── layouts/             # Layout wrappers
├── types/               # Global TypeScript types
└── lib/                 # Axios & utilities

Feature-based folder structure ensures scalability.

🔄 API Endpoints Used
POST   /api/auth/login
POST   /api/auth/register
GET    /api/me
GET    /api/me/loans
GET    /api/me/reviews
GET    /api/books
GET    /api/books/:id
⚙️ Environment Variables

Create a .env file:

VITE_API_BASE_URL=https://library-backend-production-b9cf.up.railway.app

.env is ignored in .gitignore

🖥 Installation
# Clone repository
git clone [https://github.com/jsjafriel123/WPH-21-Library-App]

cd library-web-app

# Install dependencies
npm install

# Run development server
npm run dev

Build for production:

npm run build
📈 Future Improvements

Return book mutation with optimistic update

Overdue badge detection

Review editing & deletion

Role-based access (Admin)

E2E testing

Performance monitoring

👨‍💻 Author

Jeffrey Sjafriel
Frontend Developer
