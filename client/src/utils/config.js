// Centralized configuration for environment variables
export const getBaseURL = () => {
  // Check if we're in development mode
  const isDevelopment =
    import.meta.env.DEV ||
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  // Default fallback URL
  const defaultProductionURL =
    "https://electric-vehicle-charging-booking-a.vercel.app";
  const defaultDevelopmentURL = "http://localhost:3000";

  if (isDevelopment) {
    return import.meta.env.VITE_BASE_URL || defaultDevelopmentURL;
  }

  // Production environment with multiple fallback options
  const productionURL =
    import.meta.env.VITE_BASE_URL ||
    window.VITE_BASE_URL ||
    defaultProductionURL;

  console.log("Using BASE_URL:", productionURL);
  return productionURL;
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

// Validate configuration and provide helpful error messages
export const validateConfig = () => {
  const baseUrl = getBaseURL();

  if (!baseUrl || baseUrl === "undefined" || baseUrl === "null") {
    console.error(
      "❌ BASE_URL is not properly configured. Using fallback URL."
    );
    return false;
  }

  console.log("✅ Configuration validated. BASE_URL:", baseUrl);
  return true;
};
