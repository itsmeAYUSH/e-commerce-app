import React, { useState } from "react";
import { TextField } from "@mui/material";
import styles from "./Checkout.module.css";
import Footer from "../../components/Footer/Footer";
import Collection from "../../components/Collection/Collection";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import { useCart } from "../../store/CartContext";
import RazorpayPayment from "../../components/RazorpayPayment/RazorpayPayment";
import { useSnackbar } from "../../contexts/SnackbarContext";

const Checkout = () => {
  const { state } = useCart();
  const { items } = state;
  const { showSnackbar } = useSnackbar();
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
  const [showPayment, setShowPayment] = useState(false);

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
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.zipCode) newErrors.zipCode = "ZIP Code is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      showSnackbar("Please fill in all required fields.", "error");
      return false;
    }

    return true;
  };

  const calculateTotal = () => {
    return items
      .reduce(
        (total, item) => total + parseFloat(item.price) * (item.quantity || 1),
        0
      )
      .toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);

    if (validateForm()) {
      setShowPayment(true);
    }
  };

  const handleConfirmPayment = () => {
    const form = document.querySelector("form");
    if (form) {
      const submitEvent = new Event("submit", {
        cancelable: true,
        bubbles: true,
      });
      form.dispatchEvent(submitEvent);
    }
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
            {/* Hidden submit button to make form submission work */}
            <button type="submit" style={{ display: "none" }}></button>
          </form>
        </div>
        <OrderSummary items={items} onConfirmPayment={handleConfirmPayment} />
      </div>
      <Collection />
      <Footer />

      {showPayment && (
        <RazorpayPayment
          formData={formData}
          amount={calculateTotal()}
          onSuccess={() => setShowPayment(false)}
          onError={() => setShowPayment(false)}
        />
      )}
    </div>
  );
};

export default Checkout;
