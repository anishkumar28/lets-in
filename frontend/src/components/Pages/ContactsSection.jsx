import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Box from "@mui/material/Box";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Tooltip,
} from "@mui/material";
import { getDatabase, ref, onValue, update, remove } from "firebase/database";
import { app } from "../Firebase";
import { Mail, Phone, User, Building2, Globe, Linkedin } from "lucide-react";

export default function ContactsSection() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [open, setOpen] = useState(false);

  const db = getDatabase(app);

  useEffect(() => {
    const usersRef = ref(db, "users");

    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const contactList = [];

        Object.entries(data).forEach(([companyKey, companyData]) => {
          if (companyData.contacts) {
            Object.entries(companyData.contacts).forEach(
              ([contactKey, contact]) => {
                contactList.push({
                  id: contactKey,
                  companyKey,
                  companyName: companyData.companyName || "N/A",
                  fullName: contact.fullName || "",
                  email: contact.email || contact.emailAddress || "",
                  phone: contact.phone || contact.phoneNumber || "",
                  jobTitle: contact.jobTitle || "",
                  linkedin: contact.linkedin || "",
                  companyWebsite: contact.companyWebsite || "",
                });
              }
            );
          }
        });

        setContacts(contactList);
      } else {
        setContacts([]);
      }
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

  const handleUpdate = () => {
    if (!selectedContact) return;

    const contactRef = ref(
      db,
      `users/${selectedContact.companyKey}/contacts/${selectedContact.id}`
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
        alert("✅ Contact updated successfully");
        handleClose();
      })
      .catch((error) => console.error("Error updating contact:", error));
  };

  const handleDelete = () => {
    if (!selectedContact) return;

    const contactRef = ref(
      db,
      `users/${selectedContact.companyKey}/contacts/${selectedContact.id}`
    );

    remove(contactRef)
      .then(() => {
        alert("❌ Contact deleted");
        handleClose();
      })
      .catch((error) => console.error("Error deleting contact:", error));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">All Contacts</h2>

        {contacts.length === 0 ? (
          <p className="text-gray-500 text-center mt-8">No contacts found.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => handleOpen(contact)}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md cursor-pointer 
                           transition-all duration-200 flex flex-col justify-between p-3 aspect-square min-h-[170px] max-w-[220px]"
              >
                {/* Company Name */}
                <div className="flex items-center gap-1.5 mb-1">
                  <Building2 className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-semibold text-gray-600 uppercase truncate">
                    {contact.companyName}
                  </span>
                </div>

                {/* Contact Name */}
                <h3 className="text-sm font-semibold text-gray-800 truncate mb-0.5">
                  {contact.fullName || "Unnamed Contact"}
                </h3>

                {/* Job Title */}
                {contact.jobTitle && (
                  <p className="text-xs text-gray-500 mb-2 truncate">
                    {contact.jobTitle}
                  </p>
                )}

                {/* Action Icons */}
                <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-gray-100 justify-start">
                  {contact.phone && (
                    <Tooltip title={contact.phone} arrow>
                      <a
                        href={`tel:${contact.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-green-600 hover:scale-110 transition-transform"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    </Tooltip>
                  )}
                  {contact.email && (
                    <Tooltip title={contact.email} arrow>
                      <a
                        href={`mailto:${contact.email}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-blue-600 hover:scale-110 transition-transform"
                      >
                        <Mail className="w-4 h-4" />
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
                        className="text-sky-700 hover:scale-110 transition-transform"
                      >
                        <Linkedin className="w-4 h-4" />
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
                        className="text-indigo-600 hover:scale-110 transition-transform"
                      >
                        <Globe className="w-4 h-4" />
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

              {/* LinkedIn Field */}
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
      </Box>
    </Box>
  );
}
