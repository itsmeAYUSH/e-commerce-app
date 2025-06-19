import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../store/CartContext";
import { useSnackbar } from "../../contexts/SnackbarContext";

const RazorpayPayment = ({ formData, amount, onSuccess, onError }) => {
    const { clearCart } = useCart();
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();
    const paymentTriggered = useRef(false);

    useEffect(() => {
      if (paymentTriggered.current) return;
      paymentTriggered.current = true;

      const loadAndPay = () => {
        if (!window.Razorpay) {
          showSnackbar("Payment gateway is loading. Please try again.", "warning");
          return;
        }

        const amountInPaise = Math.round(Number(amount) * 100);

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
              showSnackbar("Payment failed. Please try again.", "error");
              if (onError) onError(response);
            }
          },
          modal: {
            ondismiss: function () {
              showSnackbar("Payment cancelled", "info");
              document.body.style.overflow = 'auto';
              document.documentElement.style.overflow = 'auto';
              if (onError) onError();
            },
          },
        };

        try {
          const razorpayInstance = new window.Razorpay(options);
          razorpayInstance.on("payment.failed", function (response) {
            showSnackbar(`Payment failed: ${response.error.description}`, "error");
            if (onError) onError(response);
          });
          razorpayInstance.open();
        } catch (error) {
          showSnackbar("Error initializing payment. Please try again.", "error");
          if (onError) onError(error);
        }
      };

      if (window.Razorpay) {
        loadAndPay();
      } else {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = loadAndPay;
        script.onerror = () => {
          showSnackbar(
            "Failed to load payment gateway. Please refresh and try again.",
            "error"
          );
          if (onError) onError();
        };
        document.body.appendChild(script);
        return () => {
          if (document.body.contains(script)) {
            document.body.removeChild(script);
          }
        };
      }
    }, [amount, formData, clearCart, navigate, onSuccess, onError, showSnackbar]);

    return null;
};

export default RazorpayPayment;
