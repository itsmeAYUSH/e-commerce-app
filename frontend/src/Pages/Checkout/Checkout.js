import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import styles from "./Checkout.module.css";
import Footer from "../../components/Footer/Footer";
import Collection from "../../components/Collection/Collection";
import { useNavigate } from "react-router-dom";

const Checkout = ({ cartItems = [] }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    companyName: "",
    country: "",
    city: "",
    address: "",
    zipCode: "",
  });

  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone Number is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.zipCode) newErrors.zipCode = "ZIP Code is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setSnackbarMessage("Please fill in all required fields.");
      setSnackbarOpen(true);
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Submitted", formData);
      setSnackbarMessage("Form submitted successfully!");
      setSnackbarOpen(true);
    }
  };

  const calculateSubtotal = () => {
    if (!cartItems || cartItems.length === 0) {
      return "0.00";
    }
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div>
      <div className={styles.checkoutHeader}>
        <h2>Shopping Cart/Checkout</h2>
      </div>
      <div className={styles.checkoutContainer}>
        <div className={styles.formContainer}>
          <h2>Billing Details</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.row}>
              <div className={styles.textField}>
                <TextField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  fullWidth
                />
              </div>
              <div className={styles.textField}>
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  fullWidth
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.textField}>
                <TextField
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber}
                  fullWidth
                />
              </div>
              <div className={styles.textField}>
                <TextField
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  fullWidth
                />
              </div>
            </div>
            <div className={styles.textField}>
              <TextField
                label="Company Name (Optional)"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                fullWidth
              />
            </div>
            <div className={styles.textField}>
              <TextField
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                error={!!errors.country}
                helperText={errors.country}
                fullWidth
              />
            </div>
            <div className={styles.row}>
              <div className={styles.textField}>
                <TextField
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  error={!!errors.city}
                  helperText={errors.city}
                  fullWidth
                />
              </div>
              <div className={styles.textField}>
                <TextField
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  error={!!errors.address}
                  helperText={errors.address}
                  fullWidth
                />
              </div>
              <div className={styles.textField}>
                <TextField
                  label="ZIP Code"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  error={!!errors.zipCode}
                  helperText={errors.zipCode}
                  fullWidth
                />
              </div>
            </div>
          </form>
        </div>
        <div className={styles.orderSummary}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#2d5356" }}>
                  <TableCell
                    colSpan={2}
                    sx={{ color: "#fff", textAlign: "center" }}
                  >
                    <strong>Order Summary</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell>
                    <strong>Subtotal:</strong>
                  </TableCell>
                  <TableCell align="right">${calculateSubtotal()}</TableCell>
                </TableRow>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell>
                    <strong>Shipping:</strong>
                  </TableCell>
                  <TableCell align="right">Free</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Total:</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>${calculateSubtotal()}</strong>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell
              colSpan={2}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                type="submit"
                className={styles.confirmButton}
                onClick={handleSubmit}
              >
                Confirm Payment
              </Button>
            </TableCell>
          </TableRow>
        </div>
      </div>
      <Collection />
      <Footer />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Checkout;
