
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

## License

This project is licensed under the MIT License.

---

## Notes

- For local development, add `localhost` to Firebase authorized domains.
- If you encounter `Unrecognized feature: 'otp-credentials'`, it is a browser warning and can be ignored unless using Web OTP API.
- For Google login issues, ensure your domain is authorized in Firebase.

---

**Happy coding!**