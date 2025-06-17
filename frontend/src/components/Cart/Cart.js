import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import styles from "./Cart.module.css";

const Cart = ({ cartItems, updateQuantity }) => {
  return (
    <div className={styles.cartWrapper}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item, index) => (
              <TableRow key={index}>
                {/* ...existing code... */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* ...existing code... */}
    </div>
  );
};

export default Cart;