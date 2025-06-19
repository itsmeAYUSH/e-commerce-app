import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../Redux/Reducers/authSlice';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Avatar,
  Button,
  Tabs,
  Tab,
  TextField,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Edit,
  Save,
  ReceiptLong,
  FavoriteBorder,
  Security,
  Logout,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../contexts/SnackbarContext";
import ProductCard from "../ProductCard/ProductCard";

// Delete account API call
const deleteAccountApi = async (token) => {
  const response = await fetch('https://e-commerce-app-p1sv.onrender.com/api/auth/delete-account', {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to delete account');
  }
  return await response.json();
};

const Profile = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [orders, setOrders] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [openAddressDialog, setOpenAddressDialog] = useState(false);
  const [confirmLogoutDialog, setConfirmLogoutDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [editableUserInfo, setEditableUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    isDefault: false,
  });

  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('No token found, redirecting to login');
          navigate("/login");
          return;
        }

        // Get user data from localStorage first
        const storedUser = JSON.parse(localStorage.getItem('user'));
        console.log('Stored user data:', storedUser);
        
        // Set initial editable user info from stored user data
        setEditableUserInfo({
          firstName: storedUser?.name?.split(' ')[0] || '',
          lastName: storedUser?.name?.split(' ')[1] || '',
          email: storedUser?.email || '',
          phone: storedUser?.phone || '',
        });

        // Fetch user profile data
        console.log('Fetching user profile data...');
        const response = await fetch(`https://e-commerce-app-p1sv.onrender.com/api/auth/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        console.log('Profile response status:', response.status);
        
        if (!response.ok) {
          if (response.status === 401) {
            console.log('Token invalid or expired');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate("/login");
            return;
          }
          const errorData = await response.json().catch(() => ({}));
          console.error('Profile fetch error:', errorData);
          throw new Error(errorData.message || 'Failed to fetch user data');
        }

        const data = await response.json();
        console.log('Fetched profile data:', data);
        console.log('User data from response:', data.user);
        console.log('Phone number from response:', data.user?.phone);

        // Update editable user info with fetched data
        setEditableUserInfo(prevInfo => {
          const newInfo = {
            firstName: data.user?.name?.split(' ')[0] || prevInfo.firstName,
            lastName: data.user?.name?.split(' ')[1] || prevInfo.lastName,
            email: data.user?.email || prevInfo.email,
            phone: data.user?.phone || prevInfo.phone,
          };
          console.log('Setting editable user info:', newInfo);
          return newInfo;
        });

        // Update localStorage with latest user data
        const updatedUserData = {
          ...storedUser,
          ...data.user
        };
        console.log('Updating localStorage with:', updatedUserData);
        localStorage.setItem('user', JSON.stringify(updatedUserData));

        // Fetch user's orders
        console.log('Fetching user order history...');
        const ordersResponse = await fetch(`https://e-commerce-app-p1sv.onrender.com/api/user/order-history`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (ordersResponse.ok) {
          const ordersData = await ordersResponse.json();
          setOrders(ordersData.orderHistory || []);
        } else {
          console.error('Failed to fetch order history:', ordersResponse.status);
        }

        // Fetch user's favorites
        console.log('Fetching user favorites...');
        const favoritesResponse = await fetch(`https://e-commerce-app-p1sv.onrender.com/api/user/favorites`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (favoritesResponse.ok) {
          const favoritesData = await favoritesResponse.json();
          console.log('Fetched favorites:', favoritesData);
          setFavorites(favoritesData.favorites || []);
        } else {
          console.error('Failed to fetch favorites:', favoritesResponse.status);
        }

        // Fetch user's addresses
        console.log('Fetching user addresses...');
        const addressesResponse = await fetch(`https://e-commerce-app-p1sv.onrender.com/api/user/shipping-address`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (addressesResponse.ok) {
          const addressesData = await addressesResponse.json();
          console.log('Fetched addresses:', addressesData);
          setAddresses(addressesData.addresses || []);
        } else {
          console.error('Failed to fetch addresses:', addressesResponse.status);
        }

        setLoading(false);
      } catch (error) {
        console.error("Detailed error in fetchUserData:", error);
        showSnackbar(error.message || "Failed to load profile data", "error");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate,showSnackbar]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleEditToggle = () => {
    if (editMode) {
      updateProfile();
    } else {
      setEditMode(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableUserInfo({
      ...editableUserInfo,
      [name]: value,
    });
  };

  const handleAddressInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({
      ...newAddress,
      [name]: value,
    });
  };

  const updateProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const updateData = {
        name: `${editableUserInfo.firstName} ${editableUserInfo.lastName}`,
        email: editableUserInfo.email,
        phone: editableUserInfo.phone
      };
      
      console.log('Updating profile with data:', updateData);
      
      const response = await fetch(`https://e-commerce-app-p1sv.onrender.com/api/auth/update-profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });

      console.log('Update profile response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Profile update error:', errorData);
        throw new Error(errorData.message || 'Failed to update profile');
      }

      const updatedData = await response.json();
      console.log('Updated profile data:', updatedData);
      // Update local state
      const newEditableInfo = {
        firstName: updatedData.name?.split(' ')[0] || '',
        lastName: updatedData.name?.split(' ')[1] || '',
        email: updatedData.email || '',
        phone: updatedData.phone || '',
      };
      setEditableUserInfo(newEditableInfo);
      // Update localStorage with new data
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const newUserData = {
        ...storedUser,
        name: updatedData.name,
        email: updatedData.email,
        phone: updatedData.phone
      };
      localStorage.setItem('user', JSON.stringify(newUserData));
      setEditMode(false);
      showSnackbar("Profile updated successfully");
    } catch (error) {
      console.error("Detailed error in updateProfile:", error);
      showSnackbar(error.message || "Failed to update profile", "error");
    } finally {
      setLoading(false);
    }
  };

  const addAddress = async () => {
    try {
      const response = await fetch(`https://e-commerce-app-p1sv.onrender.com/api/user/shipping-address`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newAddress)
      });

      if (!response.ok) {
        throw new Error('Failed to add address');
      }

      const addedAddress = await response.json();
      setAddresses([...addresses, addedAddress]);
      setOpenAddressDialog(false);
      setNewAddress({
        name: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        isDefault: false,
      });
      showSnackbar("Address added successfully");
    } catch (error) {
      showSnackbar("Failed to add address", "error");
    }
  };



  // const removeFavorite = async (productId) => {
  //   try {
  //     const response = await fetch(`https://e-commerce-app-p1sv.onrender.com/api/user/favorites/${productId}`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Authorization': `Bearer ${localStorage.getItem('token')}`
  //       }
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to remove from favorites');
  //     }

  //     setFavorites(favorites.filter((fav) => fav._id !== productId));
  //     showSnackbar("Removed from favorites");
  //   } catch (error) {
  //     showSnackbar("Failed to remove from favorites", "error");
  //   }
  // };

  const handleLogout = async () => {
    try {
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Call logout from auth context
      dispatch(logout());
      
      showSnackbar("Logged out successfully");
      navigate("/");
    } catch (error) {
      showSnackbar("Failed to logout", "error");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      await deleteAccountApi(token);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      dispatch(logout());
      showSnackbar('Account deleted successfully', 'success');
      navigate('/');
    } catch (error) {
      showSnackbar(error.message || 'Failed to delete account', 'error');
    } finally {
      setLoading(false);
      setOpenDeleteDialog(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress sx={{ color: "#2d5356" }} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Profile Sidebar */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: "#2d5356",
                  fontSize: "2rem",
                  margin: "0 auto",
                }}
              >
                {editableUserInfo.firstName?.charAt(0)}
                {editableUserInfo.lastName?.charAt(0)}
              </Avatar>
              <Typography variant="h5" sx={{ mt: 2 }}>
                {editableUserInfo.firstName} {editableUserInfo.lastName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {editableUserInfo.email}
              </Typography>
              {editableUserInfo.phone && (
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  Phone: {editableUserInfo.phone}
                </Typography>
              )}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              orientation={isMobile ? "horizontal" : "vertical"}
              variant={isMobile ? "scrollable" : "fullWidth"}
              scrollButtons={isMobile ? "auto" : false}
              sx={{
                justifyContent: "flex-start",
                mb: 2,
                "& .MuiTab-root": {
                  minWidth: "auto",
                  textTransform: "none",
                  alignItems: "flex-start",
                  justifyContent: "left",
                  textAlign: "left",
                  minHeight: "50px",
                  borderLeft: isMobile ? "none" : "3px solid transparent",
                },
                "& .Mui-selected": {
                  color: "#2d5356 !important",
                  borderLeft: isMobile ? "none" : "3px solid #2d5356",
                  bgcolor: isMobile ? "transparent" : "rgba(45, 83, 86, 0.08)",
                },
                "& .MuiTabs-indicator": {
                  display: isMobile ? "block" : "none",
                  backgroundColor: "#2d5356",
                },
              }}
            >
              <Tab
                label="Profile Information"
                icon={<Edit />}
                iconPosition="start"
              />
              <Tab
                label="Order History"
                icon={<ReceiptLong />}
                iconPosition="start"
              />
              <Tab
                label="Favorites"
                icon={<FavoriteBorder />}
                iconPosition="start"
              />
              <Tab
                label="Account Security"
                icon={<Security />}
                iconPosition="start"
              />
            </Tabs>

            <Box sx={{ mt: "auto", pt: 2 }}>
              <Button
                startIcon={<Logout />}
                variant="outlined"
                fullWidth
                onClick={() => setConfirmLogoutDialog(true)}
                sx={{
                  borderColor: "#f36e0d",
                  color: "#f36e0d",
                  "&:hover": {
                    borderColor: "#d15c0a",
                    backgroundColor: "rgba(243, 110, 13, 0.05)",
                  },
                }}
              >
                Logout
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper elevation={3} sx={{ p: 3 }}>
            {/* Profile Info Tab */}
            {activeTab === 0 && (
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Typography variant="h5">Profile Information</Typography>
                  <Button
                    startIcon={editMode ? <Save /> : <Edit />}
                    onClick={handleEditToggle}
                    variant={editMode ? "contained" : "outlined"}
                    sx={{
                      backgroundColor: editMode ? "#2d5356" : "transparent",
                      color: editMode ? "#fff" : "#2d5356",
                      borderColor: "#2d5356",
                      "&:hover": {
                        backgroundColor: editMode
                          ? "#1e3e40"
                          : "rgba(45, 83, 86, 0.08)",
                      },
                    }}
                  >
                    {editMode ? "Save Changes" : "Edit Profile"}
                  </Button>
                </Box>

                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={editableUserInfo.firstName}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={editableUserInfo.lastName}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={editableUserInfo.email}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={editableUserInfo.phone}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      margin="normal"
                    />
                  </Grid>

                  {editMode && (
                    <Grid item xs={12}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ mt: 2 }}
                      >
                        * Make sure your contact information is up to date
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Box>
            )}

            {/* Orders Tab */}
            {activeTab === 1 && (
              <Box>
                <Typography variant="h5" sx={{ mb: 3 }}>
                  Order History
                </Typography>

                {orders.length > 0 ? (
                  orders.map((order) => (
                    <Card key={order._id || order.orderId} sx={{ mb: 2, borderLeft: "3px solid #2d5356" }}>
                      <CardContent>
                        <Typography variant="subtitle1">
                          Order ID: {order.orderId}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {order.orderDate ? new Date(order.orderDate).toLocaleString() : ""}
                        </Typography>
                        <Typography variant="body2">
                          Status: {order.orderStatus}
                        </Typography>
                        <Typography variant="body2">
                          Total: ${order.totalAmount}
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Products:</Typography>
                          {order.products.map((item, idx) => (
                            <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <img
                                src={item.product?.image}
                                alt={item.product?.name}
                                style={{ width: 60, height: 60, objectFit: 'cover', marginRight: 16, borderRadius: 8 }}
                              />
                              <Box>
                                <Typography variant="body1">{item.product?.name}</Typography>
                                <Typography variant="body2">Qty: {item.quantity}</Typography>
                                <Typography variant="body2">Price: ${item.price}</Typography>
                              </Box>
                            </Box>
                          ))}
                        </Box>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      py: 4,
                    }}
                  >
                    <ReceiptLong
                      sx={{ fontSize: 60, color: "text.disabled", mb: 2 }}
                    />
                    <Typography variant="h6" color="textSecondary">
                      No orders yet
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{ mt: 2, backgroundColor: "#2d5356" }}
                      onClick={() => navigate("/products")}
                    >
                      Start Shopping
                    </Button>
                  </Box>
                )}
              </Box>
            )}

            {/* Favorites Tab */}
            {activeTab === 2 && (
              <Box>
                <Typography variant="h5" sx={{ mb: 3 }}>
                  Your Favorites
                </Typography>

                {favorites.length > 0 ? (
                  <Grid container spacing={2}>
                    {favorites.map((product) => (
                      <Grid item xs={12} sm={6} md={4} key={product._id}>
                        <ProductCard product={product} />
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      py: 4,
                    }}
                  >
                    <FavoriteBorder
                      sx={{ fontSize: 60, color: "text.disabled", mb: 2 }}
                    />
                    <Typography variant="h6" color="textSecondary">
                      No favorites yet
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{ mt: 2, backgroundColor: "#2d5356" }}
                      onClick={() => navigate("/products")}
                    >
                      Browse Products
                    </Button>
                  </Box>
                )}
              </Box>
            )}

            {/* Account Security Tab */}
            {activeTab === 3 && (
              <Box>
                <Typography variant="h5" sx={{ mb: 3 }}>
                  Account Security
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Change Password"
                      secondary="Update your account password"
                    />
                    <Button
                      variant="outlined"
                      onClick={() => navigate("/change-password")}
                      sx={{
                        color: "#2d5356",
                        borderColor: "#2d5356",
                      }}
                    >
                      Change
                    </Button>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Two-Factor Authentication"
                      secondary="Add an extra layer of security to your account"
                    />
                    <Button
                      variant="outlined"
                      disabled
                      sx={{
                        color: "text.disabled",
                        borderColor: "text.disabled",
                      }}
                    >
                      Coming Soon
                    </Button>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Delete Account"
                      secondary="Permanently delete your account and all data"
                    />
                    <Button
                      variant="outlined"
                      sx={{
                        color: "#f36e0d",
                        borderColor: "#f36e0d",
                        "&:hover": {
                          backgroundColor: "rgba(243, 110, 13, 0.05)",
                        },
                      }}
                      onClick={() => setOpenDeleteDialog(true)}
                    >
                      Delete
                    </Button>
                  </ListItem>
                </List>
                {/* Delete Account Confirmation Dialog */}
                <Dialog
                  open={openDeleteDialog}
                  onClose={() => setOpenDeleteDialog(false)}
                  maxWidth="xs"
                  fullWidth
                >
                  <DialogTitle>Confirm Account Deletion</DialogTitle>
                  <DialogContent>
                    <Typography>Are you sure you want to permanently delete your account? This action cannot be undone.</Typography>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => setOpenDeleteDialog(false)}
                      sx={{ color: "#2d5356" }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleDeleteAccount}
                      variant="contained"
                      sx={{ backgroundColor: "#f36e0d", "&:hover": { backgroundColor: "#d15c0a" } }}
                    >
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Add Address Dialog */}
      <Dialog
        open={openAddressDialog}
        onClose={() => setOpenAddressDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add New Address</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address Name (e.g., Home, Work)"
                name="name"
                value={newAddress.name}
                onChange={handleAddressInputChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Street Address"
                name="street"
                value={newAddress.street}
                onChange={handleAddressInputChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={newAddress.city}
                onChange={handleAddressInputChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State/Province"
                name="state"
                value={newAddress.state}
                onChange={handleAddressInputChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Zip/Postal Code"
                name="zipCode"
                value={newAddress.zipCode}
                onChange={handleAddressInputChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                value={newAddress.country}
                onChange={handleAddressInputChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  id="defaultAddress"
                  name="isDefault"
                  checked={newAddress.isDefault}
                  onChange={(e) =>
                    setNewAddress({
                      ...newAddress,
                      isDefault: e.target.checked,
                    })
                  }
                />
                <label htmlFor="defaultAddress" style={{ marginLeft: "8px" }}>
                  Set as default shipping address
                </label>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenAddressDialog(false)}
            sx={{ color: "#2d5356" }}
          >
            Cancel
          </Button>
          <Button
            onClick={addAddress}
            variant="contained"
            sx={{ backgroundColor: "#2d5356" }}
          >
            Save Address
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Logout Dialog */}
      <Dialog
        open={confirmLogoutDialog}
        onClose={() => setConfirmLogoutDialog(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to log out?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConfirmLogoutDialog(false)}
            sx={{ color: "#2d5356" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleLogout}
            variant="contained"
            sx={{
              backgroundColor: "#f36e0d",
              "&:hover": { backgroundColor: "#d15c0a" },
            }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile;
