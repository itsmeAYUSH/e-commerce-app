# 🛋️ FurniFlex — Full-Stack E-Commerce Web Application

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.8.2-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.21.2-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.16.0-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Razorpay](https://img.shields.io/badge/Razorpay-Payment_Gateway-0C2340?logo=razorpay&logoColor=white)](https://razorpay.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

FurniFlex is a modern, responsive, full-stack furniture e-commerce web platform engineered for seamless shopping experiences. It features secure JWT and Firebase authentication, dynamic catalog management, interactive shopping cart and wishlist synchronization, multi-step checkout with Razorpay payment processing, order tracking, address book management, and automated email inquiry handling.

---

## 📑 Table of Contents

- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [API Reference](#-api-reference)
  - [Authentication Routes](#1-authentication-routes-apiauth)
  - [Product Routes](#2-product-routes-apiproducts)
  - [User & Cart / Order Routes](#3-user--cart--order-routes-apiuser)
  - [Contact Routes](#4-contact-routes-apicontact)
- [Environment Variables](#-environment-variables)
  - [Backend (.env)](#backend-my-appbackendenv)
  - [Frontend (.env)](#frontend-my-appfrontendenv)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#1-backend-setup)
  - [Frontend Setup](#2-frontend-setup)
- [Third-Party Integrations Setup](#-third-party-integrations-setup)
  - [Firebase Authentication](#firebase-authentication)
  - [Razorpay Payment Gateway](#razorpay-payment-gateway)
  - [Nodemailer Email Setup](#nodemailer-smtp-configuration)
- [Deployment](#-deployment)
- [License](#-license)

---

## ✨ Key Features

### 🔐 Authentication & Security
- **JWT & Token Authentication**: Secure token-based session verification with `bcryptjs` password hashing.
- **Firebase Google OAuth**: One-click sign-in with Google integration.
- **Protected Routing**: Granular route guards restricting cart, checkout, profile, and orders to authenticated sessions.
- **Profile Management**: Update user name, contact details, email, or delete user accounts securely.

### 🛋️ Product Catalog & Discovery
- **Dynamic Product Browsing**: Category-wise sorting, real-time discount calculation, and product codes.
- **Detailed Product Views**: Comprehensive views with image galleries, pricing, stock descriptions, and specifications.
- **Bulk Product Seeding**: Backend endpoints for single and bulk product creation.

### 🛒 Cart & Wishlist Synchronization
- **Persistent State**: Cloud-synced cart and wishlist per user stored directly in MongoDB alongside local context stores.
- **Quantity & Price Computation**: Instant price recalculations, items count updates, and empty/clear cart triggers.
- **Interactive Wishlist**: Single-click toggling of favorite items with optimistic updates.

### 💳 Checkout & Order Processing
- **Saved Address Book**: Add, update, select, and delete multiple shipping addresses with default address logic.
- **Razorpay Payment Gateway**: Integrated checkout modal handling real-time card, UPI, and net banking transactions.
- **Order History & Invoices**: Automatic order record generation with tracking statuses (`pending`, `completed`).

### 📬 Communication & Interactive UI
- **Automated Email Inquiries**: Contact form integration using Nodemailer with Gmail SMTP.
- **Interactive Store Map**: Leaflet and React-Leaflet integration for physical store discovery.
- **Real-Time Feedback**: Global Snackbar notifications, dynamic loaders, offline network detection, and scroll-to-top helpers.

---

## 🛠 Tech Stack

### Frontend
- **Framework & Routing**: [React 19](https://reactjs.org/), [React Router DOM v7](https://reactrouter.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/), React Context API (`CartContext`, `FavoritesContext`, `SnackbarContext`)
- **UI Components & Icons**: [Material UI Icons](https://mui.com/), [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/)
- **Animations & Maps**: [Framer Motion](https://www.framer.com/motion/), [Leaflet](https://leafletjs.com/) & [React Leaflet](https://react-leaflet.js.org/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Authentication & Payments**: [Firebase Auth](https://firebase.google.com/), [Razorpay Checkout](https://razorpay.com/)

### Backend
- **Runtime & Framework**: [Node.js](https://nodejs.org/), [Express.js v4](https://expressjs.com/)
- **Database & ODM**: [MongoDB](https://www.mongodb.com/), [Mongoose v8](https://mongoosejs.com/)
- **Security & Utilities**: [JSON Web Token (jsonwebtoken)](https://github.com/auth0/node-jsonwebtoken), [bcryptjs](https://github.com/dcodeIO/bcrypt.js), [cors](https://github.com/expressjs/cors), [dotenv](https://github.com/motdotla/dotenv)
- **Mailing**: [Nodemailer](https://nodemailer.com/)

---

## 📂 Project Architecture

```
E-commerce/
└── my-app/
    ├── backend/
    │   ├── Controllers/
    │   │   ├── authController.js       # Register, login, Google OAuth, profile, delete account
    │   │   ├── ProductController.js    # Product queries, detail lookup, single & bulk creation
    │   │   └── userDataController.js   # Favorites, cart, shipping addresses, order history
    │   ├── middleware/
    │   │   └── authMiddleware.js       # JWT bearer token verification middleware
    │   ├── Models/
    │   │   ├── Contact.js              # Contact inquiry schema
    │   │   ├── Product.js              # Product catalog schema
    │   │   └── User.js                 # User schema (profile, cart, favorites, addresses, orders)
    │   ├── Routes/
    │   │   ├── authRoutes.js           # /api/auth endpoints
    │   │   ├── contactRoutes.js        # /api/contact/send-email endpoint
    │   │   ├── ProductRoutes.js        # /api/products endpoints
    │   │   └── userDataRoutes.js       # /api/user endpoints
    │   ├── .env                        # Backend environment configuration
    │   ├── package.json
    │   └── server.js                   # Express server entry point, MongoDB connection & CORS
    │
    ├── frontend/
    │   ├── public/                     # Static assets, HTML shell, and manifest
    │   ├── src/
    │   │   ├── components/             # Reusable UI components
    │   │   │   ├── Header/             # Top header bar with auth state
    │   │   │   ├── Navbar/             # Main navigation bar
    │   │   │   ├── Footer/             # Footer links & copyright
    │   │   │   ├── Loader/             # Global loading spinner
    │   │   │   ├── Snackbar/           # Toast notification provider & UI
    │   │   │   ├── ProtectedRoute/     # Auth route wrapper
    │   │   │   ├── RazorpayPayment/    # Razorpay payment handler
    │   │   │   ├── OfflineNotice/      # Network connectivity monitor
    │   │   │   └── ScrollToTop/        # Route transition scroll reset
    │   │   ├── contexts/               # Global SnackbarContext
    │   │   ├── Pages/                  # Application views & pages
    │   │   │   ├── HomePages/          # Hero banner, featured collections, testimonials
    │   │   │   ├── Products/           # Product catalog list & filters
    │   │   │   ├── ProductsDetails/    # Individual product details
    │   │   │   ├── Categories/         # Category browser
    │   │   │   ├── Cart/               # Shopping cart view
    │   │   │   ├── Favorite/           # Wishlist page
    │   │   │   ├── Checkout/           # Multi-step checkout & address picker
    │   │   │   ├── OrderSuccess/       # Post-order confirmation screen
    │   │   │   ├── Profile/            # User profile, address manager & order history
    │   │   │   ├── Login/              # User sign-in page
    │   │   │   ├── Signup/             # User registration page
    │   │   │   ├── AboutUs/            # Company information
    │   │   │   ├── ContactUs/          # Inquiries & store locator map
    │   │   │   ├── Blog/               # Blog articles section
    │   │   │   └── NotFound/           # 404 error page
    │   │   ├── Redux/                  # Redux Toolkit store and authSlice
    │   │   ├── services/               # Axios API service layer (userService.js)
    │   │   ├── store/                  # CartContext and FavoritesContext stores
    │   │   ├── firebase.js             # Firebase initialization & auth export
    │   │   ├── App.js                  # Main routing configuration
    │   │   └── index.js                # React root mount
    │   ├── .env                        # Frontend environment configuration
    │   └── package.json
    └── README.md
```

---

## 📡 API Reference

### 1. Authentication Routes (`/api/auth`)

| Method | Endpoint | Access | Description | Payload Sample |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Public | Register a new user | `{ "firstName": "John", "lastName": "Doe", "email": "john@example.com", "password": "pass" }` |
| `POST` | `/api/auth/login` | Public | Authenticate user & receive JWT | `{ "email": "john@example.com", "password": "pass" }` |
| `POST` | `/api/auth/google` | Public | Authenticate via Firebase Google OAuth | `{ "email": "john@example.com", "name": "John Doe", "photoURL": "..." }` |
| `GET` | `/api/auth/me` | Private | Get authenticated user profile | *Bearer Token Header* |
| `GET` | `/api/auth/verify` | Private | Verify validity of stored JWT | *Bearer Token Header* |
| `PUT` | `/api/auth/update-profile` | Private | Update profile name, email, or phone | `{ "name": "John Updated", "phone": "1234567890" }` |
| `DELETE` | `/api/auth/delete-account` | Private | Permanently remove account | *Bearer Token Header* |

### 2. Product Routes (`/api/products`)

| Method | Endpoint | Access | Description | Payload Sample |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/products` | Public | Fetch all available products | — |
| `GET` | `/api/products/:id` | Public | Fetch single product by MongoDB ObjectId | — |
| `POST` | `/api/products` | Public | Create a single product | `{ "name": "Modern Chair", "price": 199, "category": "Chair", "image": "..." }` |
| `POST` | `/api/products/bulk` | Public | Bulk insert an array of products | `[ { "name": "Item 1", ... }, { "name": "Item 2", ... } ]` |

### 3. User & Cart / Order Routes (`/api/user`)

| Method | Endpoint | Access | Description | Payload Sample |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/user/favorites` | Private | Get populated user favorites list | *Bearer Token Header* |
| `POST` | `/api/user/favorites/:productId` | Private | Toggle add/remove from favorites | *Bearer Token Header* |
| `GET` | `/api/user/cart` | Private | Get user shopping cart items | *Bearer Token Header* |
| `POST` | `/api/user/cart` | Private | Update item quantity or add item | `{ "productId": "...", "quantity": 2 }` |
| `POST` | `/api/user/cart/clear` | Private | Clear all items from user cart | *Bearer Token Header* |
| `GET` | `/api/user/shipping-address` | Private | Get all saved shipping addresses | *Bearer Token Header* |
| `POST` | `/api/user/shipping-address` | Private | Add a new shipping address | `{ "name": "Home", "addressLine1": "...", "city": "...", "postalCode": "..." }` |
| `PUT` | `/api/user/shipping-address/:id` | Private | Update an existing address | `{ "addressLine1": "New Street", "isDefault": true }` |
| `DELETE` | `/api/user/shipping-address/:id` | Private | Remove a shipping address | *Bearer Token Header* |
| `POST` | `/api/user/order` | Private | Record completed order in history | `{ "orderId": "pay_...", "products": [...], "totalAmount": 499 }` |
| `GET` | `/api/user/order-history` | Private | Get user past orders with products | *Bearer Token Header* |

### 4. Contact Routes (`/api/contact`)

| Method | Endpoint | Access | Description | Payload Sample |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/contact/send-email` | Public | Send contact form inquiry via Nodemailer | `{ "name": "Alice", "email": "alice@mail.com", "phone": "...", "message": "..." }` |

---

## ⚙️ Environment Variables

### Backend (`my-app/backend/.env`)

| Variable | Description | Example / Default | Required |
| :--- | :--- | :--- | :--- |
| `PORT` | Port number for Express backend server | `5000` | Yes |
| `MONGO_URI` | MongoDB connection string (Local or MongoDB Atlas) | `mongodb+srv://<user>:<pass>@cluster.mongodb.net/furniflex` | Yes |
| `JWT_SECRET` | Secret key used to sign and verify JSON Web Tokens | `your_jwt_super_secret_key` | Yes |
| `NODE_ENV` | Application environment mode | `development` or `production` | Optional |
| `EMAIL_USER` | Gmail address for Nodemailer SMTP service | `furniflex123@gmail.com` | Optional (for email) |
| `EMAIL_PASSWORD` | Google App Password for Gmail SMTP | `abcd efgh ijkl mnop` | Optional (for email) |

### Frontend (`my-app/frontend/.env`)

| Variable | Description | Example / Default | Required |
| :--- | :--- | :--- | :--- |
| `REACT_APP_BACKEND_URL` | Base URL of the backend API server | `http://localhost:5000` (Dev) / `https://your-api.onrender.com` (Prod) | Yes |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.x or higher)
- [npm](https://www.npmjs.com/) (version 9.x or higher)
- [MongoDB](https://www.mongodb.com/) (running locally or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)

---

### 1. Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd my-app/backend
   ```

2. **Install backend dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file inside `my-app/backend/`:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/furniflex
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_gmail_app_password
   ```

4. **Start the backend server:**
   ```bash
   # Development mode with Nodemon (auto-reload)
   npm run dev

   # Production mode
   npm start
   ```
   The backend will be live on `http://localhost:5000`.

---

### 2. Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd my-app/frontend
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file inside `my-app/frontend/`:
   ```env
   REACT_APP_BACKEND_URL=http://localhost:5000
   ```

4. **Start the React development server:**
   ```bash
   npm start
   ```
   The frontend will open on `http://localhost:3000`.

---

## 🔌 Third-Party Integrations Setup

### Firebase Authentication
1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a project.
2. Enable **Authentication** and activate the **Google** sign-in provider.
3. Add your authorized domains under **Authentication > Settings > Authorized domains** (`localhost` for development, and your deployed domain such as `furniflexx.netlify.app`).
4. Update credentials in `my-app/frontend/src/firebase.js` if using your own Firebase project.

### Razorpay Payment Gateway
1. Create a free merchant account on [Razorpay](https://razorpay.com/).
2. Navigate to **Settings > API Keys** and generate a Test Key ID.
3. Add the Key ID in `my-app/frontend/src/components/RazorpayPayment/RazorpayPayment.js`.

### Nodemailer SMTP Configuration
1. To enable automated contact form emails via Gmail:
   - Enable 2-Step Verification in your Google Account.
   - Generate an **App Password** (under Security > 2-Step Verification > App Passwords).
   - Set `EMAIL_USER` and `EMAIL_PASSWORD` in `my-app/backend/.env`.

---

## 🌐 Deployment

### Frontend (Netlify / Vercel)
1. Build the production bundle:
   ```bash
   cd my-app/frontend
   npm run build
   ```
2. Deploy the generated `build/` directory to Netlify, Vercel, or GitHub Pages.
3. Configure environment variable: `REACT_APP_BACKEND_URL=https://your-backend-domain.com`.
4. Ensure redirect rules for client-side routing are configured (`_redirects` file with `/* /index.html 200`).

### Backend (Render / Railway / VPS)
1. Deploy the `backend/` directory to Render, Railway, or AWS EC2.
2. Set Environment Variables (`PORT`, `MONGO_URI`, `JWT_SECRET`, `NODE_ENV=production`, `EMAIL_USER`, `EMAIL_PASSWORD`).
3. Set Start Command to `npm start` (or `node server.js`).
4. Add your deployed frontend URL to the CORS whitelist in `server.js`.

---

## 📄 License

This project is licensed under the **ISC License**.