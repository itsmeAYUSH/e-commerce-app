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
import { useCart } from "../../store/CartContext";
import OrderSummmary from "../../components/OrderSummary/OrderSummary";

const Cart = () => {
  const navigate = useNavigate();
  const { state, removeItem, addItem } = useCart(); // Import addItem from context
  const { items } = state;

  // const calculateSubtotal = () => {
  //   return items
  //     .reduce((total, item) => total + item.price * item.quantity, 0)
  //     .toFixed(2);
  // };

  const handleQuantityChange = (index, change) => {
    const newQuantity = (items[index].quantity|| 1) + change;
    if (newQuantity <= 0) {
      removeItem(items[index]); // Completely remove the item if quantity is 0
    } else {
      const updatedItem = { ...items[index], quantity: newQuantity };
      removeItem(items[index]); // Remove the old item
      addItem(updatedItem); // Add the updated item
    }
  };

  // const checkoutHandler = () => {
  //   navigate("/checkout");
  // };

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
            {items.length === 0 ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <p>Your cart is empty.</p>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {items.map((item, index) => (
                  <TableRow key={index} sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableCell>{item.name}</TableCell>
                    {/* <TableCell>₹{item.price.toFixed(2)}</TableCell> */}
                    {/* <TableCell>₹{(parseFloat(item.price)* item.quantity).toFixed(2)}</TableCell> */}
                    <TableCell>₹{(Number(item.price) * (item.quantity || 1)).toFixed(2)}</TableCell>

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
                        <span style={{ margin: "0 10px" }}>
                          {item.quantity}
                        </span>
                        <Button
                          className={styles.circularButton}
                          variant="outlined"
                          onClick={() => handleQuantityChange(index, 1)}
                        >
                          +
                        </Button>
                      </div>
                    </TableCell>
                    {/* <TableCell>
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </TableCell> */}
                    <TableCell>₹{(parseFloat(item.price) * item.quantity).toFixed(2)}</TableCell>

                    <TableCell>
                      <Button
                        className={styles.circularButton}
                        onClick={() => removeItem(item)}
                      >
                        X
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <OrderSummmary items={items} />
      </div>
      <Collection />
      <Footer />
    </div>
  );
};

export default Cart;
