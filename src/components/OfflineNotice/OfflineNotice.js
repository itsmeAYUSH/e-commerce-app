import React, { useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import WifiOffIcon from "@mui/icons-material/WifiOff";

const OfflineNotice = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOffline = () => {
      console.log("User is offline");
      setIsOffline(true);
    };
    const handleOnline = () => {
      console.log("User is online");
      setIsOffline(false);
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return (
    <Snackbar
      open={isOffline}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={null} // Keeps it open while offline
    >
      <Alert severity="error" icon={<WifiOffIcon />} sx={{ width: "100%" }}>
        You are offline. Please check your internet connection.
      </Alert>
    </Snackbar>
  );
};

export default OfflineNotice;
