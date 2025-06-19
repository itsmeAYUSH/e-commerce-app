import React, { useState, useEffect } from "react";
import { useSnackbar } from "../../contexts/SnackbarContext";

const OfflineNotice = () => {
  const { showSnackbar } = useSnackbar();
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOffline = () => {
      console.log("User is offline");
      setIsOffline(true);
      showSnackbar("You are offline. Please check your internet connection.", "error");
    };
    const handleOnline = () => {
      console.log("User is online");
      setIsOffline(false);
      showSnackbar("You are back online!", "success");
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    // Show initial offline state if offline
    if (isOffline) {
      showSnackbar("You are offline. Please check your internet connection.", "error");
    }

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, [showSnackbar, isOffline]);

  return null;
};

export default OfflineNotice;
