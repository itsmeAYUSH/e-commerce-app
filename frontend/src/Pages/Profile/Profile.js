import React, { useState, useEffect } from "react";
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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
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
  LocationOn,
  Security,
  Logout,
  Delete,
  Add,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

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
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [confirmLogoutDialog, setConfirmLogoutDialog] = useState(false);

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
        const response = await fetch(`http://localhost:5000/api/auth/me`, {
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
        console.log('Fetching user orders...');
        const ordersResponse = await fetch(`http://localhost:5000/api/orders/user`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (ordersResponse.ok) {
          const ordersData = await ordersResponse.json();
          console.log('Fetched orders:', ordersData);
          setOrders(ordersData || []);
        } else {
          console.error('Failed to fetch orders:', ordersResponse.status);
        }

        // Fetch user's favorites
        console.log('Fetching user favorites...');
        const favoritesResponse = await fetch(`http://localhost:5000/api/favorites`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (favoritesResponse.ok) {
          const favoritesData = await favoritesResponse.json();
          console.log('Fetched favorites:', favoritesData);
          setFavorites(favoritesData || []);
        } else {
          console.error('Failed to fetch favorites:', favoritesResponse.status);
        }

        // Fetch user's addresses
        console.log('Fetching user addresses...');
        const addressesResponse = await fetch(`http://localhost:5000/api/addresses`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (addressesResponse.ok) {
          const addressesData = await addressesResponse.json();
          console.log('Fetched addresses:', addressesData);
          setAddresses(addressesData || []);
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
  }, [navigate]);

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
      
      const response = await fetch(`http://localhost:5000/api/auth/me`, {
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
      console.log('Updated user data:', updatedData.user);
      
      // Update local state
      const newEditableInfo = {
        firstName: updatedData.user?.name?.split(' ')[0] || '',
        lastName: updatedData.user?.name?.split(' ')[1] || '',
        email: updatedData.user?.email || '',
        phone: updatedData.user?.phone || '',
      };
      console.log('Setting new editable info:', newEditableInfo);
      setEditableUserInfo(newEditableInfo);

      // Update localStorage with new data
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const newUserData = {
        ...storedUser,
        ...updatedData.user
      };
      console.log('Updating localStorage with:', newUserData);
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
      const response = await fetch(`http://localhost:5000/api/addresses`, {
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

  const deleteAddress = async (addressId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/addresses/${addressId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete address');
      }

      setAddresses(addresses.filter((address) => address._id !== addressId));
      showSnackbar("Address deleted successfully");
    } catch (error) {
      showSnackbar("Failed to delete address", "error");
    }
  };

  const removeFavorite = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/favorites/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to remove from favorites');
      }

      setFavorites(favorites.filter((fav) => fav._id !== productId));
      showSnackbar("Removed from favorites");
    } catch (error) {
      showSnackbar("Failed to remove from favorites", "error");
    }
  };

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

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const closeSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
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
                mb: 2,
                "& .MuiTab-root": {
                  minWidth: "auto",
                  textTransform: "none",
                  alignItems: "flex-start",
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
                label="Shipping Addresses"
                icon={<LocationOn />}
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
                    <Card
                      key={order._id}
                      sx={{ mb: 2, borderLeft: "3px solid #2d5356" }}
                    >
                      <CardContent>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={4}>
                            <Typography variant="subtitle1">
                              Order #{order.orderNumber}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {new Date(order.date).toLocaleDateString()}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <Typography variant="body1">
                              {order.items.length} item(s)
                            </Typography>
                            <Typography variant="body2">
                              Total: ${order.total.toFixed(2)}
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            md={4}
                            sx={{ textAlign: { md: "right" } }}
                          >
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => navigate(`/orders/${order._id}`)}
                              sx={{
                                color: "#2d5356",
                                borderColor: "#2d5356",
                              }}
                            >
                              View Details
                            </Button>
                          </Grid>
                        </Grid>
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
                        <Card>
                          <Box
                            sx={{
                              position: "relative",
                              pt: "100%",
                              cursor: "pointer",
                            }}
                            onClick={() => navigate(`/products/${product._id}`)}
                          >
                            <Box
                              component="img"
                              src={product.image}
                              alt={product.name}
                              sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </Box>
                          <CardContent>
                            <Typography gutterBottom variant="subtitle1">
                              {product.name}
                            </Typography>
                            <Typography variant="body1" color="text.primary">
                              ${product.price.toFixed(2)}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                mt: 1,
                              }}
                            >
                              <IconButton
                                onClick={() => removeFavorite(product._id)}
                                sx={{ color: "#f36e0d" }}
                              >
                                <Delete />
                              </IconButton>
                            </Box>
                          </CardContent>
                        </Card>
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

            {/* Addresses Tab */}
            {activeTab === 3 && (
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Typography variant="h5">Shipping Addresses</Typography>
                  <Button
                    startIcon={<Add />}
                    variant="contained"
                    onClick={() => setOpenAddressDialog(true)}
                    sx={{ backgroundColor: "#2d5356" }}
                  >
                    Add New Address
                  </Button>
                </Box>

                {addresses.length > 0 ? (
                  <Grid container spacing={2}>
                    {addresses.map((address) => (
                      <Grid item xs={12} sm={6} key={address._id}>
                        <Paper
                          elevation={2}
                          sx={{ p: 2, position: "relative" }}
                        >
                          {address.isDefault && (
                            <Box
                              sx={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                                bgcolor: "#2d5356",
                                color: "white",
                                px: 1,
                                borderRadius: 1,
                                fontSize: "0.75rem",
                              }}
                            >
                              Default
                            </Box>
                          )}
                          <Typography variant="subtitle1" sx={{ mb: 1 }}>
                            {address.name}
                          </Typography>
                          <Typography variant="body2">
                            {address.street}
                          </Typography>
                          <Typography variant="body2">
                            {address.city}, {address.state} {address.zipCode}
                          </Typography>
                          <Typography variant="body2">
                            {address.country}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "flex-end",
                              mt: 1,
                            }}
                          >
                            <IconButton
                              size="small"
                              onClick={() => deleteAddress(address._id)}
                              sx={{ color: "#f36e0d" }}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Box>
                        </Paper>
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
                    <LocationOn
                      sx={{ fontSize: 60, color: "text.disabled", mb: 2 }}
                    />
                    <Typography variant="h6" color="textSecondary">
                      No addresses saved
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ mt: 1 }}
                    >
                      Add your shipping addresses for faster checkout
                    </Typography>
                  </Box>
                )}
              </Box>
            )}

            {/* Account Security Tab */}
            {activeTab === 4 && (
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
                    >
                      Delete
                    </Button>
                  </ListItem>
                </List>
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

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Profile;
