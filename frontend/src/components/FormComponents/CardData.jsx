import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { app } from "../Database/Firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Modalpopup from "./ModalPopup";
import EditModal from "./EditModal";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
  FaTrash,
  FaEdit,
  FaMoneyBillWave,
  FaCalendarAlt,
} from "react-icons/fa";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

const ContentList = () => {
  const [cardData, setCardData] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedKey, setSelectedKey] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, key: null });
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    type: "",
  });
  const [userId, setUserId] = useState(null);

  // 🔹 Fetch data only for current user
  useEffect(() => {
    const db = getDatabase(app);
    const auth = getAuth(app);

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        const cardRef = ref(db, `users/${user.uid}/jobs`);
        onValue(cardRef, (snapshot) => {
          const retrievedData = snapshot.val();
          setCardData(retrievedData);
        });
      } else {
        setUserId(null);
        setCardData(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // 🔹 Format date
  const formatDate = (isoString) => {
    if (!isoString) return "—";
    const date = new Date(isoString);
    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // 🔹 Delete confirmation
  const handleDeleteClick = (key) => {
    setConfirmDelete({ open: true, key });
  };

  const confirmDeleteAction = () => {
    if (!userId) return;

    const db = getDatabase(app);
    const cardRef = ref(db, `users/${userId}/jobs/${confirmDelete.key}`);
    remove(cardRef)
      .then(() => {
        setNotification({
          open: true,
          message: "Record deleted successfully!",
          type: "success",
        });
      })
      .catch(() => {
        setNotification({
          open: true,
          message: "Failed to delete record. Try again!",
          type: "error",
        });
      });
    setConfirmDelete({ open: false, key: null });
  };

  const cancelDelete = () => {
    setConfirmDelete({ open: false, key: null });
  };

  // 🔹 Edit modal
  const handleEdit = (key, job) => {
    setSelectedKey(key);
    setSelectedJob(job);
    setIsEditOpen(true);
  };

  const handleEditClose = () => {
    setSelectedJob(null);
    setSelectedKey(null);
    setIsEditOpen(false);
  };

  const handleNotificationClose = (event, reason) => {
    if (reason === "clickaway") return;
    setNotification({ ...notification, open: false });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Job Applications</h2>
          <p className="text-gray-500 mt-1 text-sm">
            Track and manage your job applications effortlessly.
          </p>
        </div>
        <Modalpopup />
      </div>

      {/* Card Grid */}
      {cardData ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Object.entries(cardData).map(([key, value]) => (
            <div
              key={key}
              className="bg-white border border-gray-100 shadow-md hover:shadow-xl rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900 leading-snug break-words w-3/4">
                  {value.companyName || "—"}
                </h3>
                <span
                  className={`text-sm px-3.5 py-1.5 rounded-full font-semibold capitalize 
                  ${
                    value.status === "Offer"
                      ? "bg-green-100 text-green-700"
                      : value.status === "Rejected"
                      ? "bg-red-100 text-red-700"
                      : value.status === "Interview"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {value.status || "Unknown"}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm text-gray-700 break-words">
                <p className="flex items-start">
                  <FaBriefcase className="mr-2 mt-0.5 text-indigo-500" />
                  <span>
                    <span className="font-medium">Title:</span>{" "}
                    {value.jobTitle || "—"}
                  </span>
                </p>

                <p className="flex items-start">
                  <FaMapMarkerAlt className="mr-2 mt-0.5 text-pink-500" />
                  <span>
                    <span className="font-medium">Location:</span>{" "}
                    {value.location || "—"}
                  </span>
                </p>

                <p className="flex items-start break-all">
                  <FaExternalLinkAlt className="mr-2 mt-0.5 text-blue-500" />
                  <a
                    href={value.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {value.link || "—"}
                  </a>
                </p>

                <p className="flex items-start">
                  <FaMoneyBillWave className="mr-2 mt-0.5 text-green-600" />
                  <span>
                    <span className="font-medium">Salary:</span>{" "}
                    {value.salary || "—"}
                  </span>
                </p>
              </div>

              {/* Dates */}
              <div className="mt-4 border-t pt-2 text-xs text-gray-500">
                <p className="flex items-center gap-1">
                  <FaCalendarAlt className="text-gray-400" />
                  Created: {formatDate(value.createdAt)}
                </p>
                <p className="flex items-center gap-1">
                  <FaCalendarAlt className="text-gray-400" />
                  Updated: {formatDate(value.updatedAt)}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 flex justify-between gap-3">
                <button
                  onClick={() => handleEdit(key, value)}
                  className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition-all"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(key)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition-all"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-16">
          No data available. Add your first job!
        </p>
      )}

      {/* ✅ Edit Modal */}
      {isEditOpen && (
        <EditModal
          open={isEditOpen}
          onClose={handleEditClose}
          initialData={selectedJob}
          cardId={selectedKey}
        />
      )}

      {/* ✅ Delete Confirmation Dialog */}
      <Dialog
        open={confirmDelete.open}
        onClose={cancelDelete}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this record? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancel
          </Button>
          <Button
            onClick={confirmDeleteAction}
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
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleNotificationClose}
          severity={notification.type}
          variant="filled"
          sx={{
            width: "100%",
            borderRadius: "8px",
            boxShadow: 3,
          }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ContentList;
