# Evoltsoft - Smart EV Charging Network

Welcome to **Evoltsoft**, the most comprehensive electric vehicle charging network platform. Our mission is to make EV charging accessible, reliable, and convenient for everyone.

## 🚗 About Evoltsoft

Evoltsoft is a full-stack web application that helps electric vehicle owners find, book, and manage charging sessions at our network of charging stations. With real-time availability, smart routing, and seamless payment integration, we're revolutionizing the EV charging experience.

## ✨ Key Features

- **🗺️ Interactive Station Map** - Find charging stations near you with real-time availability
- **📱 Smart Booking System** - Reserve your charging slot in advance
- **⚡ Fast Charging Network** - DC fast chargers for quick top-ups
- **🌱 100% Green Energy** - All stations powered by renewable energy
- **💳 Flexible Pricing** - Pay-per-use, subscriptions, and corporate plans
- **📊 Usage Analytics** - Track your charging history and carbon savings
- **🔔 Smart Notifications** - Get alerts when your vehicle is ready
- **24/7 Support** - Round-the-clock customer assistance

## 🛠️ Technology Stack

### Frontend

- **React.js** - Modern UI framework
- **React Bootstrap** - Responsive design components
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Google Maps API** - Interactive mapping

### Backend

- **Node.js** - Server runtime
- **Express.js** - Web application framework
- **MongoDB** - Database for storing user and station data
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication and authorization
- **bcrypt** - Password hashing

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/evoltsoft.git
   cd evoltsoft
   ```

2. **Install server dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**

   ```bash
   cd ../client
   npm install
   ```

4. **Environment Configuration**
   Create `.env` files in both server and client directories:

   **Server `.env`:**

   ```
   MONGODB_URI=mongodb://localhost:27017/evoltsoft
   JWT_SECRET=your_jwt_secret_here
   PORT=5000
   ```

   **Client `.env`:**

   ```
   VITE_BASE_URL=http://localhost:5000
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

5. **Start the development servers**

   **Terminal 1 (Server):**

   ```bash
   cd server
   npm run dev
   ```

   **Terminal 2 (Client):**

   ```bash
   cd client
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 🌐 Deployment

### Vercel Deployment (Frontend)

1. **Push your code to GitHub**

2. **Connect to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Select the `client` folder as the root directory

3. **Configure Environment Variables in Vercel**
   In your Vercel project settings, add these environment variables:

   ```
   VITE_BASE_URL=https://your-backend-url.com
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

4. **Deploy**
   - Vercel will automatically build and deploy your frontend

### Backend Deployment Options

- **Railway/Render**: For Node.js backend hosting
- **MongoDB Atlas**: For cloud database
- **Heroku**: Alternative backend hosting

**Important**: Make sure to update `VITE_BASE_URL` to point to your deployed backend URL, not localhost.

## 📱 Usage

1. **Sign Up/Login** - Create your Evoltsoft account
2. **Find Stations** - Use the map or search to locate charging stations
3. **Check Availability** - View real-time port availability and pricing
4. **Book a Slot** - Reserve your preferred time slot
5. **Navigate & Charge** - Get directions and start your charging session
6. **Monitor Progress** - Track charging status in real-time
7. **Complete & Pay** - Automatic payment processing when done

## 🗂️ Project Structure

```
evoltsoft/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── Components/     # Reusable UI components
│   │   ├── Pages/          # Application pages
│   │   ├── Context/        # React context providers
│   │   └── styles/         # CSS and styling files
│   └── public/             # Static assets
├── server/                 # Backend Node.js application
│   ├── Controllers/        # Route controllers
│   ├── Models/            # Database models
│   ├── Router/            # API routes
│   └── middleware/        # Custom middleware
└── README.md
```

## 🔗 API Endpoints

### Authentication

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/profile` - Get user profile

### Stations

- `GET /ev/all-stations` - Get all charging stations
- `POST /ev/create` - Create new station (admin)
- `GET /ev/station-id/:id` - Get station by ID
- `DELETE /ev/delete/:id` - Delete station (admin)

### Bookings

- `POST /booking/new-booking` - Create new booking
- `GET /booking/user/get-all-bookings/:userId` - Get user bookings
- `DELETE /booking/delete-slot-by-id/:id` - Cancel booking

## 🤝 Contributing

We welcome contributions to Evoltsoft! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@evoltsoft.com or join our Discord community.

## 🚀 Roadmap

- [ ] Mobile app development (iOS/Android)
- [ ] Integration with vehicle APIs
- [ ] Solar panel monitoring
- [ ] Carbon footprint calculator
- [ ] Fleet management dashboard
- [ ] AI-powered route optimization

---

**Evoltsoft** - _Powering the Future of Electric Mobility_ ⚡🚗🌱
