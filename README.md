# E-commerce Web Application

## Overview

This is a full-stack E-commerce web application designed to provide a seamless online shopping experience. It features user authentication, product browsing, cart management, order processing, and more. The project is organized into a **frontend** (React) and a **backend** (Node.js/Express + MongoDB).

---

## Tech Stack

### Frontend

- **React.js**: UI library for building interactive user interfaces.
- **React Router**: For client-side routing and navigation.
- **Redux**: State management for authentication and cart.
- **Context API**: For local state management (e.g., Snackbar, Cart, Favorites).
- **CSS Modules**: Scoped and modular CSS for styling components.
- **Axios/Fetch**: For making HTTP requests to the backend.
- **Firebase**: (Optional) For additional services like authentication or storage.

### Backend

- **Node.js**: JavaScript runtime for server-side logic.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing users, products, and orders.
- **Mongoose**: ODM for MongoDB, providing schema and model support.
- **dotenv**: For environment variable management.
- **CORS**: Middleware to handle Cross-Origin Resource Sharing.
- **body-parser**: Middleware to parse incoming request bodies.

---

## Features

### User
- User registration and login (authentication)
- Profile management
- Password security (hashed storage)
- Protected routes (only accessible to logged-in users)

### Product
- Product listing and details
- Product categories and featured sections
- Search and filter products
- Add to cart and manage cart items
- Add to favorites/wishlist

### Cart & Checkout
- Cart management (add, remove, update quantity)
- Order summary and checkout process
- Payment integration (e.g., Razorpay)
- Order success and confirmation page

### Blog & Content
- Latest blog section
- About Us, Contact Us, and FAQ pages

### Miscellaneous
- Responsive design for mobile and desktop
- Loader and Snackbar notifications
- Offline notice and error handling
- 404 Not Found page

---

## Project Structure

```
E-commerce/
  my-app/
    backend/
      Controllers/         # Express controllers for business logic
      middleware/          # Custom middleware (e.g., auth)
      Models/              # Mongoose models (User, Product)
      Routes/              # Express route definitions
      server.js            # Main server entry point
      package.json         # Backend dependencies
    frontend/
      public/              # Static assets
      src/
        components/        # Reusable React components
        contexts/          # React Context providers
        Pages/             # Page-level React components
        Redux/             # Redux store and slices
        services/          # API service functions
        store/             # Context stores (Cart, Favorites)
        util/              # Utility functions and data
        App.js             # Main React app
        index.js           # Entry point
      package.json         # Frontend dependencies
```

---

## Getting Started

### Backend Setup

1. **Install dependencies:**
   ```bash
   cd my-app/backend
   npm install
   ```

2. **Create a `.env` file:**
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   PORT=5000
   ```

3. **Start the backend server:**
   ```bash
   # For development (with auto-reload)
   npm run dev

   # For production
   npm start
   ```

   The backend will run on `http://localhost:5000` by default.

---

### Frontend Setup

1. **Install dependencies:**
   ```bash
   cd my-app/frontend
   npm install
   ```

2. **Firebase Configuration:**
   - The Firebase config is located in `src/firebase.js`.
   - If you want to use your own Firebase project, replace the config object with your credentials.
   - **Important:** In the Firebase Console, add your deployed domain (e.g., `furniflexx.netlify.app`) to the list of authorized domains for authentication.

3. **Start the frontend:**
   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000` by default.

---

## Environment Variables

### Backend (`my-app/backend/.env`)

- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT token signing
- `NODE_ENV` - (optional) `development` or `production`
- `PORT` - (optional) Port for backend server (default: 5000)

### Frontend

- Firebase config is hardcoded in `src/firebase.js`. For production, consider using environment variables or a secure config method.

---

## API Endpoints

### Product Routes

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Add a new product
- `POST /api/products/bulk` - Add multiple products

### Auth & User

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/google` - Google OAuth login
- `GET /api/user/profile` - Get user profile (protected)
- `POST /api/user/order` - Add order to user history (protected)

### Contact

- `POST /api/contact` - Submit contact form

---

## Authentication

- Uses JWT for backend API protection.
- Google login and email/password via Firebase Auth.
- To enable Google login on production, add your domain to Firebase Console → Authentication → Settings → Authorized domains.

---

## Deployment

- **Frontend:** Deploy the `frontend` build folder to Netlify, Vercel, or any static hosting.
- **Backend:** Deploy the `backend` to a Node.js server (Heroku, Render, etc.). Make sure to set environment variables.

---

## Notes

- For local development, add `localhost` to Firebase authorized domains.
- If you encounter `Unrecognized feature: 'otp-credentials'`, it is a browser warning and can be ignored unless using Web OTP API.
- For Google login issues, ensure your domain is authorized in Firebase.

---

**Happy coding!**