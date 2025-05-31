// Centralized configuration for environment variables
export const getBaseURL = () => {
  // Check if we're in development mode
  const isDevelopment =
    import.meta.env.DEV ||
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  if (isDevelopment) {
    return import.meta.env.VITE_BASE_URL || "http://localhost:3000";
  }

  // Production environment
  return (
    import.meta.env.VITE_BASE_URL ||
    "https://electric-vehicle-charging-booking-a.vercel.app"
  );
};

export const API_CONFIG = {
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};

// Debug helper for development
export const debugConfig = () => {
  if (import.meta.env.DEV) {
    console.log("Environment Configuration:", {
      MODE: import.meta.env.MODE,
      DEV: import.meta.env.DEV,
      PROD: import.meta.env.PROD,
      BASE_URL: getBaseURL(),
      VITE_BASE_URL: import.meta.env.VITE_BASE_URL,
      hostname: window.location.hostname,
    });
  }
};
