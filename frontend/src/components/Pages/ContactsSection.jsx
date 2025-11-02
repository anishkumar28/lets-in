import React, { useEffect, useState } from "react";
import Sidebar from "../FormComponents/Sidebar/Sidebar";
import Box from "@mui/material/Box";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  TextField,
  Button,
  Tooltip,
  Avatar,
  Snackbar,
  Alert,
} from "@mui/material";
import { getDatabase, ref, onValue, update, remove } from "firebase/database";
import { getAuth } from "firebase/auth";
import { app } from "../Database/Firebase";
import { Mail, Phone, Building2, Globe, Linkedin } from "lucide-react";

export default function ContactsSection() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [open, setOpen] = useState(false);

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info", // "success" | "error" | "warning" | "info"
  });

  const db = getDatabase(app);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const jobsRef = ref(db, `users/${user.uid}/jobs`);

    onValue(jobsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setContacts([]);
        return;
      }

      const contactList = [];

      // Loop through all jobs of current user
      Object.entries(data).forEach(([jobId, jobData]) => {
        if (jobData.contacts) {
          Object.entries(jobData.contacts).forEach(([contactKey, contact]) => {
            contactList.push({
              id: contactKey,
              jobId,
              fullName: contact.fullName || "",
              email: contact.email || contact.emailAddress || "",
              phone: contact.phone || contact.phoneNumber || "",
              jobTitle: contact.jobTitle || "",
              linkedin: contact.linkedin || "",
              companyWebsite: contact.companyWebsite || "",
              companyName: jobData.companyName || "N/A",
            });
          });
        }
      });

      setContacts(contactList);
    });
  }, [db]);

  const handleOpen = (contact) => {
    setSelectedContact(contact);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedContact(null);
    setOpen(false);
  };

  const showNotification = (message, severity = "info") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleUpdate = () => {
    if (!selectedContact) return;

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    showNotification("Updating contact...", "info");

    const contactRef = ref(
      db,
      `users/${user.uid}/jobs/${selectedContact.jobId}/contacts/${selectedContact.id}`
    );

    update(contactRef, {
      fullName: selectedContact.fullName,
      email: selectedContact.email,
      phone: selectedContact.phone,
      jobTitle: selectedContact.jobTitle,
      linkedin: selectedContact.linkedin,
      companyWebsite: selectedContact.companyWebsite,
    })
      .then(() => {
        showNotification("✅ Contact updated successfully!", "success");
        handleClose();
      })
      .catch((error) => {
        console.error("Error updating contact:", error);
        showNotification("❌ Failed to update contact.", "error");
      });
  };

  const handleDelete = () => {
    if (!selectedContact) return;

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    showNotification("Deleting contact...", "warning");

    const contactRef = ref(
      db,
      `users/${user.uid}/jobs/${selectedContact.jobId}/contacts/${selectedContact.id}`
    );

    remove(contactRef)
      .then(() => {
        showNotification("❌ Contact deleted successfully!", "error");
        handleClose();
      })
      .catch((error) => {
        console.error("Error deleting contact:", error);
        showNotification("Failed to delete contact.", "error");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-8 pt-20">
      <Box sx={{ display: "flex" }}>
        <Sidebar />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 4,
            bgcolor: "#f5f7fb",
            minHeight: "100vh",
          }}
        >
          <h2 className="text-3xl font-semibold mb-8 text-gray-800">
            Contacts
          </h2>

          <Divider sx={{ mb: 3, borderColor: "#cbd5e1", borderBottomWidth: 2 }} />

          {contacts.length === 0 ? (
            <p className="text-gray-500 text-center mt-10 text-lg">
              No contacts found.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => handleOpen(contact)}
                  className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl hover:border-blue-200 
                           transition-all duration-300 p-5 cursor-pointer flex flex-col items-center text-center"
                >
                  <Avatar
                    sx={{
                      bgcolor: "#2563eb",
                      width: 64,
                      height: 64,
                      mb: 2,
                      fontSize: "1.3rem",
                      textTransform: "uppercase",
                    }}
                  >
                    {contact.fullName
                      ? contact.fullName[0]
                      : contact.companyName[0]}
                  </Avatar>

                  <h3 className="text-base font-semibold text-gray-800 mb-1 truncate">
                    {contact.fullName || "Unnamed Contact"}
                  </h3>

                  {contact.jobTitle && (
                    <p className="text-sm text-gray-500 mb-1 truncate">
                      {contact.jobTitle}
                    </p>
                  )}

                  <div className="flex items-center justify-center gap-1 text-gray-600 text-sm mb-3">
                    <Building2 className="w-4 h-4 text-blue-500" />
                    <span className="truncate max-w-[140px]">
                      {contact.companyName}
                    </span>
                  </div>

                  <div className="flex gap-3 mt-auto pt-2 border-t border-gray-100">
                    {contact.phone && (
                      <Tooltip title={contact.phone} arrow>
                        <a
                          href={`tel:${contact.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-green-600 hover:text-green-700 hover:scale-110 transition-transform"
                        >
                          <Phone className="w-5 h-5" />
                        </a>
                      </Tooltip>
                    )}
                    {contact.email && (
                      <Tooltip title={contact.email} arrow>
                        <a
                          href={`mailto:${contact.email}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-blue-600 hover:text-blue-700 hover:scale-110 transition-transform"
                        >
                          <Mail className="w-5 h-5" />
                        </a>
                      </Tooltip>
                    )}
                    {contact.linkedin && (
                      <Tooltip title={`linkedin.com/in/${contact.linkedin}`} arrow>
                        <a
                          href={`https://linkedin.com/in/${contact.linkedin}`}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-sky-600 hover:text-sky-700 hover:scale-110 transition-transform"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      </Tooltip>
                    )}
                    {contact.companyWebsite && (
                      <Tooltip title={contact.companyWebsite} arrow>
                        <a
                          href={contact.companyWebsite}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-indigo-600 hover:text-indigo-700 hover:scale-110 transition-transform"
                        >
                          <Globe className="w-5 h-5" />
                        </a>
                      </Tooltip>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Popup Dialog */}
          <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{
              style: {
                borderRadius: "16px",
                padding: "8px 4px",
              },
            }}
          >
            <DialogTitle className="font-semibold text-gray-800 border-b border-gray-100 pb-2">
              Edit Contact
            </DialogTitle>

            {selectedContact && (
              <DialogContent className="space-y-4 mt-3">
                <TextField
                  label="Full Name"
                  fullWidth
                  size="small"
                  value={selectedContact.fullName}
                  onChange={(e) =>
                    setSelectedContact({
                      ...selectedContact,
                      fullName: e.target.value,
                    })
                  }
                />
                <TextField
                  label="Phone Number"
                  fullWidth
                  size="small"
                  value={selectedContact.phone}
                  onChange={(e) =>
                    setSelectedContact({
                      ...selectedContact,
                      phone: e.target.value,
                    })
                  }
                />
                <TextField
                  label="Email Address"
                  fullWidth
                  size="small"
                  value={selectedContact.email}
                  onChange={(e) =>
                    setSelectedContact({
                      ...selectedContact,
                      email: e.target.value,
                    })
                  }
                />
                <TextField
                  label="Job Title"
                  fullWidth
                  size="small"
                  value={selectedContact.jobTitle}
                  onChange={(e) =>
                    setSelectedContact({
                      ...selectedContact,
                      jobTitle: e.target.value,
                    })
                  }
                />
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 text-sm font-medium whitespace-nowrap">
                    linkedin.com/in/
                  </span>
                  <TextField
                    label="LinkedIn Profile"
                    fullWidth
                    size="small"
                    value={selectedContact.linkedin}
                    onChange={(e) =>
                      setSelectedContact({
                        ...selectedContact,
                        linkedin: e.target.value,
                      })
                    }
                  />
                </div>
                <TextField
                  label="Company Website"
                  fullWidth
                  size="small"
                  value={selectedContact.companyWebsite}
                  onChange={(e) =>
                    setSelectedContact({
                      ...selectedContact,
                      companyWebsite: e.target.value,
                    })
                  }
                />
                <TextField
                  label="Company"
                  fullWidth
                  size="small"
                  value={selectedContact.companyName}
                  disabled
                />
              </DialogContent>
            )}

            <DialogActions className="px-6 pb-3 mt-1 border-t border-gray-100">
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleDelete} color="error" variant="outlined">
                Delete
              </Button>
              <Button onClick={handleUpdate} variant="contained" color="primary">
                Update
              </Button>
            </DialogActions>
          </Dialog>

          {/* Snackbar Notification */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={3000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              severity={snackbar.severity}
              onClose={() => setSnackbar({ ...snackbar, open: false })}
              sx={{
                width: "100%",
                boxShadow: 3,
                borderRadius: "8px",
              }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </div>
  );
}
