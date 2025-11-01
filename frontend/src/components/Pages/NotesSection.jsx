import React, { useEffect, useState } from "react";
import Sidebar from "../FormComponents/Sidebar/Sidebar";
import {
  getDatabase,
  ref,
  onValue,
  remove,
} from "firebase/database";
import { app } from "../Database/Firebase";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  Stack,
  IconButton,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  // ✅ Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const closeSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    const db = getDatabase(app);
    const usersRef = ref(db, "users");

    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      const fetchedNotes = [];

      if (data) {
        Object.keys(data).forEach((key) => {
          const company = data[key];
          const companyName = company.companyName || "Unknown Company";
          const jobTitle = company.jobTitle || "No Job Title";

          if (company.notes) {
            Object.keys(company.notes).forEach((noteKey) => {
              const note = company.notes[noteKey];
              if (note && note.text && note.text.trim() !== "") {
                fetchedNotes.push({
                  id: noteKey,
                  parentKey: key,
                  companyName,
                  jobTitle,
                  text: note.text.trim(),
                  createdAt: note.createdAt || null,
                });
              }
            });
          }
        });
      }

      fetchedNotes.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );

      setNotes(fetchedNotes);
    });

    return () => unsubscribe();
  }, []);

  // 🗑️ Open confirmation dialog
  const handleOpenDialog = (note) => {
    setSelectedNote(note);
    setOpenDialog(true);
  };

  // ❌ Cancel delete
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedNote(null);
  };

  // ✅ Confirm delete
  const handleConfirmDelete = () => {
    if (!selectedNote) return;

    const db = getDatabase(app);
    const noteRef = ref(db, `users/${selectedNote.parentKey}/notes/${selectedNote.id}`);

    remove(noteRef)
      .then(() => {
        showSnackbar("Note deleted successfully!", "success");
      })
      .catch((error) => {
        console.error("Error deleting note:", error);
        showSnackbar("Failed to delete note!", "error");
      })
      .finally(() => {
        handleCloseDialog();
      });
  };

  // 🕒 Format readable date/time
  const formatDateTime = (createdAt) => {
    if (!createdAt) return "Date not available";
    const date = new Date(createdAt);
    if (isNaN(date.getTime())) return "Invalid date";
    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-8">
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f9fafc" }}>
      <Sidebar />

      <Box
        sx={{
          flexGrow: 1,
          px: 5,
          py: 4,
          mt: "50px",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            mb: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "2px solid #e0e0e0",
            pb: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "#1e293b", letterSpacing: "0.5px" }}
          >
            Notes
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ fontStyle: "italic" }}
          >
            View and manage your saved notes
          </Typography>
        </Box>

        {/* Notes List */}
        {notes.length === 0 ? (
          <Typography
            color="text.secondary"
            sx={{ fontSize: "1rem", mt: 3, ml: 1 }}
          >
            No notes available.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {notes.map((note) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={note.id}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 18px rgba(0,0,0,0.15)",
                    },
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    position: "relative",
                  }}
                >
                  {/* 🗑️ Delete Button */}
                  <Tooltip title="Delete Note" arrow>
                    <IconButton
                      onClick={() => handleOpenDialog(note)}
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        color: "#ef4444",
                        "&:hover": { color: "#dc2626" },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        fontSize: "1.15rem",
                        color: "#1e293b",
                        lineHeight: 1.5,
                        mb: 2,
                        textAlign: "justify",
                        wordBreak: "break-word",
                      }}
                    >
                      “{note.text}”
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Stack spacing={0.5}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: "#2563eb",
                          fontWeight: 600,
                          fontSize: "0.9rem",
                        }}
                      >
                        {note.companyName}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          fontSize: "0.8rem",
                          fontWeight: 500,
                        }}
                      >
                        {note.jobTitle}
                      </Typography>

                      {/* 🕒 Date & Time */}
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          fontSize: "0.75rem",
                          mt: 1,
                          display: "block",
                          fontStyle: "italic",
                        }}
                      >
                        🕒 {formatDateTime(note.createdAt)}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* 🧾 Confirmation Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" sx={{ fontWeight: 600 }}>
            {"Delete this note?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to permanently delete this note?  
              This action <strong>cannot be undone.</strong>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="inherit">
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              color="error"
              variant="contained"
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* ✅ Snackbar Notification */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={closeSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={closeSnackbar}
            severity={snackbar.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
    </div>
  );
};

export default Notes;
