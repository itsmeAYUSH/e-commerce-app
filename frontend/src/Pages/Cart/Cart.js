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
import styles from "./Cart.module.css";
import Footer from "../../components/Footer/Footer";
import Collection from "../../components/Collection/Collection";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../store/CartContext";
import OrderSummmary from "../../components/OrderSummary/OrderSummary";
import { useSnackbar } from "../../contexts/SnackbarContext";

const Cart = () => {
  const navigate = useNavigate();
  const { items, loading, removeItem, addItem, updateItem } = useCart();
  const { showSnackbar } = useSnackbar();

  const handleQuantityChange = (index, change) => {
    const item = items[index];
    const newQuantity = (item.quantity || 1) + change;

    if (newQuantity <= 0) {
      // Only remove the item if quantity reaches zero
      removeItem(item);
      showSnackbar(`${item.name} removed from cart`, 'info');
    } else {
      // Update the item with the new quantity
      const updatedItem = { ...item, quantity: newQuantity };
      updateItem(updatedItem);
      showSnackbar(`Updated ${item.name} quantity to ${newQuantity}`, 'success');
    }
  };

  const handleRemoveItem = (item) => {
    removeItem(item);
    showSnackbar(`${item.name} removed from cart`, 'info');
  };

  if (loading) {
    return <div className={styles.loading}>Loading cart...</div>;
  }

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
            {!items || items.length === 0 ? (
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
                    <TableCell>₹{Number(item.price).toFixed(2)}</TableCell>
                    <TableCell>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Button
                          className={styles.circularButton}
                          variant="outlined"
                          onClick={() => handleQuantityChange(index, -1)}
                          disabled={item.quantity <= 1} // Changed from <= 0 to <= 1
                        >
                          -
                        </Button>
                        <span style={{ margin: "0 10px" }}>
                          {item.quantity || 1}
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
                    <TableCell>
                      ₹
                      {(parseFloat(item.price) * (item.quantity || 1)).toFixed(
                        2
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        className={styles.circularButton}
                        onClick={() => handleRemoveItem(item)}
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
        <OrderSummmary items={items || []} />
      </div>
      <Collection />
      <Footer />
    </div>
  );
};

export default Cart;
