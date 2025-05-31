// Centralized configuration with fallback
export const BASE_URL =
  import.meta.env.VITE_BASE_URL ||
  "https://electric-vehicle-charging-booking-a.vercel.app";

// Debug environment variables
console.log("App Configuration:", {
  VITE_BASE_URL: import.meta.env.VITE_BASE_URL,
  BASE_URL: BASE_URL,
  isDev: import.meta.env.DEV,
  mode: import.meta.env.MODE,
  prod: import.meta.env.PROD,
});

// Validate configuration
if (!BASE_URL || BASE_URL === "undefined") {
  console.error("❌ BASE_URL is not properly configured!");
}
