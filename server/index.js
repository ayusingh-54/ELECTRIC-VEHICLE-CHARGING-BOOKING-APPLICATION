const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Import routes
const userRouter = require("./Router/user.router.js");
const evRouter = require("./Router/ev.router.js");
const bookingRouter = require("./Router/booking.router.js");

const app = express();

// Global mongoose connection
let isConnected = false;

const connectDB = async () => {
  if (isConnected && mongoose.connection.readyState === 1) {
    console.log("Using existing database connection");
    return;
  }

  try {
    console.log("Connecting to database...");

    // Check if MONGODB_URI exists
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI environment variable is not set");
    }

    console.log("MongoDB URI exists, attempting connection...");

    const mongooseOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4, // Use IPv4, skip trying IPv6
    };

    await mongoose.connect(process.env.MONGODB_URI, mongooseOptions);

    isConnected = true;
    console.log("📦 Connected to MongoDB successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    isConnected = false;
    throw error;
  }
};

// Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, etc.)
      if (!origin) return callback(null, true);

      const allowedOrigins = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        process.env.FRONTEND_URL,
        process.env.CLIENT_URL,
        // Add common Vercel patterns
        /^https:\/\/.*\.vercel\.app$/,
      ].filter(Boolean);

      // Allow any origin that matches the pattern for local development
      const isLocalDevelopment = origin.match(
        /^http:\/\/(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+):\d+$/
      );

      // Check if origin matches Vercel pattern
      const isVercelApp = /^https:\/\/.*\.vercel\.app$/.test(origin);

      if (allowedOrigins.some(allowed => {
        if (allowed instanceof RegExp) return allowed.test(origin);
        return allowed === origin;
      }) || isLocalDevelopment || isVercelApp) {
        callback(null, true);
      } else {
        // For now, allow all origins to prevent CORS issues
        callback(null, true);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    optionsSuccessStatus: 200
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Security headers
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

// Root route for API (no database connection needed)
app.get("/", (req, res) => {
  res.json({
    message: "Evoltsoft API Server is running!",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
    mongoUri: process.env.MONGODB_URI ? "Set" : "Not set",
    // Add debug info for environment variables
    debug: {
      allEnvKeys: Object.keys(process.env).filter(
        (key) =>
          key.startsWith("MONGODB") ||
          key.startsWith("JWT") ||
          key.startsWith("MONGO") ||
          key.startsWith("DATABASE")
      ),
      nodeEnv: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV,
      // Check exact variable names
      mongodbUri: typeof process.env.MONGODB_URI,
      mongoDbUrl: typeof process.env.MONGO_DB_URL,
      jwtSecret: typeof process.env.JWT_SECRET_KEY,
      // Show first 10 chars of URI if it exists
      mongoUriPreview: process.env.MONGODB_URI
        ? process.env.MONGODB_URI.substring(0, 20) + "..."
        : "undefined",
    },
  });
});

// Health check endpoint
app.get("/health", async (req, res) => {
  try {
    await connectDB();
    res.status(200).json({
      status: "OK",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      database:
        mongoose.connection.readyState === 1 ? "connected" : "disconnected",
      mongoUri: process.env.MONGODB_URI ? "Set" : "Not set",
    });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      message: "Database connection failed",
      error: error.message,
      mongoUri: process.env.MONGODB_URI ? "Set" : "Not set",
    });
  }
});

// Database connection middleware for API routes
const dbMiddleware = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database middleware error:", error);
    res.status(500).json({
      message: "Database connection failed",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
      mongoUri: process.env.MONGODB_URI ? "Set" : "Not set",
    });
  }
};

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('Request body:', req.body);
  next();
});

// API Routes with database middleware
app.use("/user", dbMiddleware, userRouter);
app.use("/ev", dbMiddleware, evRouter);
app.use("/booking", dbMiddleware, bookingRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : "Something went wrong",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// 404 handler for API routes
app.use("*", (req, res) => {
  res.status(404).json({
    message: "API endpoint not found",
    path: req.originalUrl,
  });
});

// Export for Vercel
module.exports = app;
