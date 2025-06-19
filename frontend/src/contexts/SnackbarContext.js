import React, { createContext, useContext, useState, useCallback } from "react";
import Snackbar from "../components/Snackbar/Snackbar";

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
    autoHideDuration: 4000,
    position: { vertical: "bottom", horizontal: "left" },
  });

  const showSnackbar = useCallback((message, severity = "info", autoHideDuration = 4000, position) => {
    setSnackbar({
      open: true,
      message,
      severity,
      autoHideDuration,
      position: position || { vertical: "bottom", horizontal: "left" },
    });
  }, []);

  const handleClose = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        autoHideDuration={snackbar.autoHideDuration}
        position={snackbar.position}
        onClose={handleClose}
      />
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext); 