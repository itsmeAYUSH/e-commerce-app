import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../store/CartContext";
import { useSnackbar } from "../../contexts/SnackbarContext";

const RazorpayPayment = ({ formData, amount, onSuccess, onError }) => {
    const { clearCart } = useCart();
    const navigate = useNavigate();
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);
    const { showSnackbar } = useSnackbar();
  
    const handlePayment = useCallback(() => {
      if (!window.Razorpay) {
        showSnackbar("Payment gateway is loading. Please try again.", "warning");
        return;
      }
  
      const amountInPaise = Math.round(parseFloat(amount) * 100);
  
      const options = {
        key: "rzp_test_j0YBQZzJfH5P5J",
        amount: amountInPaise,
        currency: "INR",
        name: "FurniFlex",
        description: "Purchase from Your Store",
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phoneNumber,
        },
        notes: {
          address: `${formData.address}, ${formData.city}, ${formData.country}, ${formData.zipCode}`,
        },
        theme: {
          color: "#2d5356",
        },
        handler: function (response) {
          if (response.razorpay_payment_id) {
            console.log("Payment successful", response);
            showSnackbar(
              `Payment Successful! Payment ID: ${response.razorpay_payment_id}`,
              "success"
            );
  
            setTimeout(() => {
              clearCart();
              document.body.style.overflow = 'auto';
              document.documentElement.style.overflow = 'auto';
              navigate("/order-success", {
                state: {
                  orderId: response.razorpay_payment_id,
                  amount: amount,
                },
              });
              if (onSuccess) onSuccess(response);
            }, 2000);
          } else {
            console.error("Payment response missing payment ID", response);
            showSnackbar("Payment failed. Please try again.", "error");
            if (onError) onError(response);
          }
        },
        modal: {
          ondismiss: function () {
            console.log("Payment modal closed without completing payment");
            showSnackbar("Payment cancelled", "info");
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
          },
        },
      };
  
      try {
        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.on("payment.failed", function (response) {
          console.error("Payment failed", response.error);
          showSnackbar(`Payment failed: ${response.error.description}`, "error");
          if (onError) onError(response);
        });
        razorpayInstance.open();
      } catch (error) {
        console.error("Razorpay error", error);
        showSnackbar("Error initializing payment. Please try again.", "error");
        if (onError) onError(error);
      }
    }, [amount, formData, clearCart, navigate, onSuccess, onError, showSnackbar]);
  
    // Load Razorpay script and trigger payment when ready
    useEffect(() => {
      if (window.Razorpay) {
        setRazorpayLoaded(true);
        handlePayment();
        return;
      }
  
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
  
      script.onload = () => {
        console.log("Razorpay script loaded successfully");
        setRazorpayLoaded(true);
        handlePayment();
      };
  
      script.onerror = () => {
        console.error("Failed to load Razorpay script");
        showSnackbar(
          "Failed to load payment gateway. Please refresh and try again.",
          "error"
        );
      };
  
      document.body.appendChild(script);
  
      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }, [handlePayment]);
  
    return null;
  };

export default RazorpayPayment;
