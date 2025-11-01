import React, { useState } from "react";
import Sidebar from "../FormComponents/Sidebar/Sidebar";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Switch,
  Button,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  getAuth,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { app } from "../Database/Firebase";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import LogoutIcon from "@mui/icons-material/Logout";

export default function SettingsSection() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const auth = getAuth(app);

  // 🔹 Snackbar helper
  const showSnackbar = (message, severity = "info") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // 🔹 Toggles
  const handleDarkModeToggle = () => setDarkMode((prev) => !prev);
  const handleNotificationToggle = () => setNotifications((prev) => !prev);

  // 🔹 Reset Password
  const handlePasswordReset = async () => {
    const user = auth.currentUser;
    if (user?.email) {
      try {
        await sendPasswordResetEmail(auth, user.email);
        showSnackbar(`Password reset link sent to ${user.email}`, "success");
      } catch (error) {
        showSnackbar(error.message, "error");
      }
    } else {
      showSnackbar("User not authenticated or missing email", "error");
    }
  };

  // 🔹 Clear Cache
  const handleClearCache = () => {
    localStorage.clear();
    sessionStorage.clear();
    showSnackbar("App cache cleared!", "info");
  };

  // 🔹 Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      showSnackbar("Logged out successfully!", "success");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (error) {
      showSnackbar(error.message, "error");
    }
  };

  return (
    <Box sx={{ display: "flex", p: 4 }}>
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          bgcolor: "#f8f9fb",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: 850,
            borderRadius: 4,
            mt: 4,
            p: 4,
            bgcolor: "#fff",
          }}
        >
          <Typography variant="h5" fontWeight={700} mb={4} color="text.primary">
            Settings
          </Typography>

          {/* Setting Rows */}
          <Stack divider={<Divider />} spacing={3}>
            {/* Dark Mode */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    bgcolor: "#EEF2FF",
                    p: 1.3,
                    borderRadius: "12px",
                  }}
                >
                  <DarkModeIcon color="primary" />
                </Box>
                <Box>
                  <Typography fontWeight={600}>Dark Mode</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Switch between light and dark themes.
                  </Typography>
                </Box>
              </Box>
              <Switch checked={darkMode} onChange={handleDarkModeToggle} disabled />
            </Box>

            {/* Notifications */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ bgcolor: "#FFF8E1", p: 1.3, borderRadius: "12px" }}>
                  <NotificationsActiveIcon sx={{ color: "#F59E0B" }} />
                </Box>
                <Box>
                  <Typography fontWeight={600}>Notifications</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Get alerts for job updates and reminders.
                  </Typography>
                </Box>
              </Box>
              <Switch
                checked={notifications}
                onChange={handleNotificationToggle}
                disabled
              />
            </Box>

            {/* Logout */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ bgcolor: "#FEF3C7", p: 1.3, borderRadius: "12px" }}>
                  <LogoutIcon sx={{ color: "#D97706" }} />
                </Box>
                <Box>
                  <Typography fontWeight={600}>Logout</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Sign out from your current account.
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                color="error"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Box>

      {/* ✅ Snackbar Notification Pane */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%", borderRadius: "10px" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
