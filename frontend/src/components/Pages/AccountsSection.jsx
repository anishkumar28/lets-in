import React, { useState, useEffect } from "react";
import Sidebar from "../FormComponents/Sidebar/Sidebar";
import {
  Box,
  TextField,
  Button,
  Avatar,
  Typography,
  Paper,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { getDatabase, ref, get, update } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../Database/Firebase";
import Preloader from "../FormComponents/Loading/Loading"; // ✅ adjust import path

export default function AccountsSection() {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    profilePic: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [userId, setUserId] = useState(null);
  const [toast, setToast] = useState({ open: false, message: "", severity: "info" });

  const auth = getAuth(app);
  const db = getDatabase(app);

  // 🔹 Listen for logged-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchUserProfile(user.uid);
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // 🔹 Fetch profile data from Firebase Realtime DB
  const fetchUserProfile = async (uid) => {
    try {
      const userRef = ref(db, `profile/${uid}`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        setUserData(snapshot.val());
      } else {
        // Default values if profile not yet created
        setUserData({
          fullName: auth.currentUser.displayName || "",
          email: auth.currentUser.email || "",
          phone: "",
          dob: "",
          profilePic: "",
        });
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      showToast("Failed to load user data", "error");
    }
    setLoading(false);
  };

  // 🔹 Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Show Snackbar Toast
  const showToast = (message, severity = "info") => {
    setToast({ open: true, message, severity });
  };

  // 🔹 Handle Profile Update
  const handleUpdate = async () => {
    if (!userId) return showToast("User not authenticated", "error");

    setUpdating(true);
    try {
      const userRef = ref(db, `profile/${userId}`);
      await update(userRef, userData);
      showToast("✅ Profile updated successfully", "success");
    } catch (err) {
      console.error(err);
      showToast("❌ Failed to update profile", "error");
    }
    setUpdating(false);
  };

  // 🔹 Show global loader while fetching
  if (loading) return <Preloader />;

  return (
    <Box sx={{ display: "flex", pt: 4 }}>
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
            p: 5,
            width: "100%",
            maxWidth: 700,
            borderRadius: 4,
            mt: 4,
          }}
        >
          <Typography variant="h5" fontWeight={600} mb={3}>
            Account Settings
          </Typography>

          {/* Profile Picture */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 3,
            }}
          >
            <Avatar
              src={
                userData.profilePic ||
                "https://cdn-icons-png.flaticon.com/512/847/847969.png"
              }
              sx={{ width: 72, height: 72 }}
            />
            <Button variant="outlined" component="label">
              Change Photo
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) =>
                      setUserData((prev) => ({
                        ...prev,
                        profilePic: ev.target.result,
                      }));
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </Button>
          </Box>

          {/* Input Fields */}
          <Stack spacing={3}>
            <TextField
              label="Full Name"
              name="fullName"
              variant="outlined"
              fullWidth
              value={userData.fullName}
              onChange={handleChange}
            />

            <TextField
              label="Email"
              name="email"
              variant="outlined"
              fullWidth
              value={userData.email}
              disabled
            />

            <TextField
              label="Phone"
              name="phone"
              variant="outlined"
              fullWidth
              value={userData.phone}
              onChange={handleChange}
            />

            <TextField
              label="Date of Birth"
              name="dob"
              type="date"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={userData.dob}
              onChange={handleChange}
            />
          </Stack>

          {/* Update Button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 4,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleUpdate}
              disabled={updating}
            >
              {updating ? "Updating..." : "Update"}
            </Button>
          </Box>
        </Paper>

        {/* ✅ Snackbar Toast Notification */}
        <Snackbar
          open={toast.open}
          autoHideDuration={4000}
          onClose={() => setToast({ ...toast, open: false })}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={() => setToast({ ...toast, open: false })}
            severity={toast.severity}
            sx={{ width: "100%" }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
