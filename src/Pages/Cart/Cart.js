import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
} from "@mui/material";
import styles from "./Cart.module.css"; // Import the CSS Module
import Footer from "../../components/Footer/Footer";
import Collection from "../../components/Collection/Collection";
import { useNavigate } from "react-router-dom";

const Cart = ({ cartItems, updateQuantity, removeItem }) => {
  const navigate = useNavigate();
  const calculateSubtotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleQuantityChange = (index, change) => {
    const newQuantity = cartItems[index].quantity + change;
    if (newQuantity >= 0) {
      updateQuantity(index, newQuantity);
    }
  };

  const checkoutHandler = () => {
    navigate("/checkout");
  };
  return (
    <div>
      <div className={styles.cartHeader}>
        <h2>Shopping Cart</h2>
      </div>
      <div className={styles.cartContainer}>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#2d5356" }}>
                <TableCell sx={{ color: "#fff" }}>Product</TableCell>
                <TableCell sx={{ color: "#fff" }}>Price</TableCell>
                <TableCell sx={{ color: "#fff" }}>Quantity</TableCell>
                <TableCell sx={{ color: "#fff" }}>Subtotal</TableCell>
                <TableCell sx={{ color: "#fff" }}>Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item, index) => (
                <TableRow key={index} sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Button
                        className={styles.circularButton}
                        variant="outlined"
                        onClick={() => handleQuantityChange(index, -1)}
                        disabled={item.quantity <= 0}
                      >
                        -
                      </Button>
                      <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                      <Button
                        className={styles.circularButton}
                        variant="outlined"
                        onClick={() => handleQuantityChange(index, 1)}
                      >
                        +
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    ${(item.price * item.quantity).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Button
                      className={styles.circularButton}
                      onClick={() => removeItem(index)}
                    >
                      X
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Order Summary */}
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
              <Button className={styles.btnCheckout} onClick={checkoutHandler}>
                Proceed To Checkout
              </Button>
            </TableCell>
          </TableRow>
        </div>
      </div>
      <Collection />
      <Footer />
    </div>
  );
};

export default Cart;
