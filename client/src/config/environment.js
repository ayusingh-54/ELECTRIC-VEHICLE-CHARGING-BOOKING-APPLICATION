export const getBaseURL = () => {
  // Development environment detection
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

export const axiosConfig = {
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};
