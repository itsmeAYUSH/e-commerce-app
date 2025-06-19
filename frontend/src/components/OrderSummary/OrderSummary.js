// import React from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
//   Paper,
// } from "@mui/material";
// import styles from "./OrderSummary.module.css";
// import { useNavigate } from "react-router-dom";

// const OrderSummary = ({ items = [], onConfirmPayment }) => {
//   const navigate = useNavigate();

//   const calculateSubtotal = React.useCallback(() => {
//     return items
//       .reduce((total, item) => total + item.price * (item.quantity || 1), 0)
//       .toFixed(2);
//   }, [items]);

//   return (
//     <div className={styles.orderSummary}>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow sx={{ backgroundColor: "#2d5356" }}>
//               <TableCell
//                 colSpan={2}
//                 sx={{ color: "#fff", textAlign: "center" }}
//               >
//                 <strong>Order Summary</strong>
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
//               <TableCell>
//                 <strong>Subtotal:</strong>
//               </TableCell>
//               <TableCell align="right">₹{calculateSubtotal()}</TableCell>
//             </TableRow>
//             <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
//               <TableCell>
//                 <strong>Shipping:</strong>
//               </TableCell>
//               <TableCell align="right">Free</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell>
//                 <strong>Total:</strong>
//               </TableCell>
//               <TableCell align="right">
//                 <strong>₹{calculateSubtotal()}</strong>
//               </TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
//         <TableCell
//           colSpan={2}
//           sx={{ display: "flex", justifyContent: "center" }}
//         >
//           <Button
//             variant="contained"
//             color="primary"
//             className={styles.btnCheckout}
//             onClick={onConfirmPayment}
//           >
//             Confirm Payment
//           </Button>
//         </TableCell>
//       </TableRow>
//     </div>
//   );
// };

// export default OrderSummary;
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
import { useNavigate, useLocation } from "react-router-dom";

const OrderSummary = ({ items = [], onConfirmPayment }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isCheckoutPage = location.pathname.includes('/checkout');

  // Always use item.product?.price if available, fallback to item.price
  const calculateSubtotal = React.useCallback(() => {
    return items
      .reduce((total, item) => {
        const price = item.product && item.product.price !== undefined
          ? Number(item.product.price)
          : Number(item.price);
        return total + (isNaN(price) ? 0 : price) * (item.quantity || 1);
      }, 0)
      .toFixed(2);
  }, [items]);

  // Handle button click based on current page
  const handleConfirmClick = () => {
    if (isCheckoutPage) {
      // We're on checkout page, run form validation
      if (onConfirmPayment) {
        onConfirmPayment();
      }
    } else {
      // We're on cart page, navigate to checkout
      navigate('/checkout');
    }
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
            variant="contained"
            color="primary"
            className={styles.btnCheckout}
            onClick={handleConfirmClick}
            disabled={items.length === 0}
          >
            {isCheckoutPage ? "Proceed to Payment" : "Proceed to Checkout"}
          </Button>
        </TableCell>
      </TableRow>
    </div>
  );
};

export default OrderSummary;