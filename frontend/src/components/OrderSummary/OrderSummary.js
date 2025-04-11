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
import styles from "./OrderSummary.module.css";
import { useNavigate } from "react-router-dom";

const OrderSummary = ({ items = [] }) => {
  const navigate = useNavigate();

  const calculateSubtotal = React.useCallback(() => {
    return items
      .reduce((total, item) => total + item.price * (item.quantity || 1), 0)
      .toFixed(2);
  }, [items]);

  const checkoutHandler = () => {
    navigate("/checkout");
  };

  return (
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
              <TableCell align="right">₹{calculateSubtotal()}</TableCell>
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
                <strong>₹{calculateSubtotal()}</strong>
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
            className={styles.btnCheckout}
            onClick={checkoutHandler}
          >
            Confirm Payment
          </Button>
        </TableCell>
      </TableRow>
    </div>
  );
};

export default OrderSummary;
