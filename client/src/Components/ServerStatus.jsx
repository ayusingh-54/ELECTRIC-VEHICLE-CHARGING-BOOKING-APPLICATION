import { useState, useEffect } from "react";
import { Alert, Spinner } from "react-bootstrap";
import axios from "axios";

const ServerStatus = () => {
  const [serverStatus, setServerStatus] = useState("checking");
  const [lastChecked, setLastChecked] = useState(null);

  // Add debugging and fallback for BASE_URL
  const BASE_URL =
    import.meta.env.VITE_BASE_URL ||
    "https://electric-vehicle-charging-booking-a.vercel.app";

  console.log("Environment variables:", {
    VITE_BASE_URL: import.meta.env.VITE_BASE_URL,
    BASE_URL: BASE_URL,
    allEnvVars: import.meta.env,
  });

  useEffect(() => {
    checkServerStatus();
    // Check server status every 30 seconds
    const interval = setInterval(checkServerStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const checkServerStatus = async () => {
    try {
      console.log("Checking server status at:", BASE_URL);

      // Validate BASE_URL before making request
      if (!BASE_URL || BASE_URL === "undefined") {
        throw new Error("BASE_URL is not defined properly");
      }

      const response = await axios.get(`${BASE_URL}/health`, {
        timeout: 10000,
      });
      if (response.status === 200) {
        setServerStatus("online");
      } else {
        setServerStatus("offline");
      }
    } catch (error) {
      console.error("Server status check failed:", error.message);
      setServerStatus("offline");
    }
    setLastChecked(new Date().toLocaleTimeString());
  };

  if (serverStatus === "checking") {
    return (
      <Alert variant="info" className="d-flex align-items-center">
        <Spinner size="sm" className="me-2" />
        Checking server connection...
      </Alert>
    );
  }

  if (serverStatus === "offline") {
    return (
      <Alert variant="danger">
        <Alert.Heading>Server Connection Issue</Alert.Heading>
        <p>Unable to connect to the Evoltsoft server. This could be due to:</p>
        <ul>
          <li>Server maintenance</li>
          <li>Network connectivity issues</li>
          <li>Server deployment in progress</li>
          <li>Environment variable not loaded properly</li>
        </ul>
        <p className="mb-0">
          <small>
            Last checked: {lastChecked} | Server URL: {BASE_URL}
          </small>
        </p>
        <div className="mt-2">
          <button
            className="btn btn-outline-danger btn-sm me-2"
            onClick={checkServerStatus}
          >
            Retry Connection
          </button>
          <button
            className="btn btn-outline-info btn-sm"
            onClick={() =>
              console.log("Debug info:", { BASE_URL, env: import.meta.env })
            }
          >
            Debug Info
          </button>
        </div>
      </Alert>
    );
  }

  return (
    <Alert variant="success" className="mb-2">
      <small>✅ Server online | Last checked: {lastChecked}</small>
    </Alert>
  );
};

export default ServerStatus;
