import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { styled } from '@mui/material/styles';
import styles from "./OrderSuccess.module.css";


const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center'
}));

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <StyledPaper elevation={3}>
        <CheckCircleOutlineIcon
          sx={{ fontSize: 80, color: 'success.main', mb: 2 }}
        />
        <Typography variant="h4" component="h1" gutterBottom>
          Order Placed Successfully!
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Thank you for your purchase. Your order has been received and is being processed.
          You will receive an email confirmation shortly.
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Button
          className={styles.btncontinueShopping}
            onClick={() => navigate('/')}
            sx={{ mr: 2 }}
          >
            Continue Shopping
          </Button>
          {/* <Button
                    className={styles.btnviewOrders}

            onClick={() => navigate('/profile')}
          >
            View Orders
          </Button> */}
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default OrderSuccess; 