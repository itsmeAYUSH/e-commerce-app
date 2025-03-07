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
} from "@mui/material";
import styles from "./Cart.module.css";
import Footer from "../../components/Footer/Footer";
import Collection from "../../components/Collection/Collection";

const Cart = ({ cartItems, updateQuantity }) => {
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
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  {/* <TableCell>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Button
                        variant="outlined"
                        onClick={() => handleQuantityChange(index, -1)}
                        disabled={item.quantity <= 0}
                      >
                        -
                      </Button>
                      <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                      <Button
                        variant="outlined"
                        onClick={() => handleQuantityChange(index, 1)}
                      >
                        +
                      </Button>
                    </div>
                  </TableCell> */}
                  <TableCell>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Button
                        className={styles.circularButton} // Apply the circular button class
                        variant="outlined"
                        onClick={() => handleQuantityChange(index, -1)}
                        disabled={item.quantity <= 0}
                      >
                        -
                      </Button>
                      <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                      <Button
                        className={styles.circularButton} // Apply the circular button class
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={styles.orderSummary}>
          <h3>Order Summary</h3>
          <p>Subtotal: ${calculateSubtotal()}</p>
          <p>Shipping: Free</p>
          <p>Total: ${calculateSubtotal()}</p>
          <Button
            variant="contained"
            color="primary"
            className={styles.btnCheckout}
          >
            Proceed To Checkout
          </Button>
        </div>
      </div>
      <Collection />
      <Footer />
    </div>
  );
};

export default Cart;
