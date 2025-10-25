import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  Stack,
  TextField,
  MenuItem,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { getDatabase, ref, push, onValue, update, remove } from "firebase/database";
import { app } from "../components/Firebase";

const currencies = [
  { value: "Wishlist", label: "Wishlist" },
  { value: "Applied", label: "Applied" },
  { value: "Interview", label: "Interview" },
  { value: "Offer", label: "Offer" },
  { value: "Rejected", label: "Rejected" },
];

const blue = { 400: "#3399FF", 500: "#007FFF" };
const grey = { 300: "#C7D0DD", 900: "#1C2025", 50: "#F3F6F9" };

const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
    box-sizing: border-box;
    width: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    resize: none;
    border-radius: 8px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[900] : grey[300]};
    &:hover { border-color: ${blue[400]}; }
    &:focus { border-color: ${blue[500]}; }
`
);

const Modalpopup = () => {
  const [open, setOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [editId, setEditId] = useState(null);

  const [cardData, setCardData] = useState({
    companyName: "",
    jobTitle: "",
    link: "",
    location: "",
    salary: "",
    status: "",
    jobDescription: "",
    coverLetter: "",
  });

  const [contacts, setContacts] = useState([]);
  const [contactInput, setContactInput] = useState({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    jobTitle: "",
    linkedin: "",
    website: "",
  });

  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState("");

  const taskSuggestions = [
    "Follow Up",
    "Phone Interview",
    "Send Availability",
    "Reach Out",
    "Prep Cover Letter",
    "On Site Interview",
    "Offer Received",
    "Send Thank You",
  ];

  // Fetch cards from Firebase
  useEffect(() => {
    const db = getDatabase(app);
    const usersRef = ref(db, "users");
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const fetched = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setCards(fetched);
      } else {
        setCards([]);
      }
    });
  }, []);

  // Open modal (for add or edit)
  const openModal = (card = null) => {
    if (card) {
      setEditId(card.id);
      setCardData({
        companyName: card.companyName || "",
        jobTitle: card.jobTitle || "",
        link: card.link || "",
        location: card.location || "",
        salary: card.salary || "",
        status: card.status || "",
        jobDescription: card.jobDescription || "",
        coverLetter: card.coverLetter || "",
      });
      setContacts(card.contacts || []);
      setTasks(card.tasks || []);
      setNotes(card.notes || []);
    } else {
      setEditId(null);
      setCardData({
        companyName: "",
        jobTitle: "",
        link: "",
        location: "",
        salary: "",
        status: "",
        jobDescription: "",
        coverLetter: "",
      });
      setContacts([]);
      setTasks([]);
      setNotes([]);
    }
    setOpen(true);
  };

  const closeModal = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  const addContact = () => {
    if (!contactInput.fullName && !contactInput.phoneNumber) return;
    setContacts((prev) => [...prev, contactInput]);
    setContactInput({
      fullName: "",
      phoneNumber: "",
      emailAddress: "",
      jobTitle: "",
      linkedin: "",
      website: "",
    });
  };

  const addTask = () => {
    if (!taskInput.trim()) return;
    setTasks((prev) => [...prev, taskInput]);
    setTaskInput("");
  };

  const addNote = () => {
    if (!noteInput.trim()) return;
    setNotes((prev) => [...prev, noteInput]);
    setNoteInput("");
  };

  const saveCard = async () => {
    const db = getDatabase(app);
    const usersRef = ref(db, "users");

    const payload = { ...cardData, contacts, tasks, notes };

    if (editId) {
      const editRef = ref(db, `users/${editId}`);
      await update(editRef, payload);
    } else {
      await push(usersRef, payload);
    }

    setOpen(false);
  };

  const deleteCard = async (id) => {
    const db = getDatabase(app);
    const delRef = ref(db, `users/${id}`);
    await remove(delRef);
  };

  return (
    <div style={{ padding: "24px" }}>
      <Button onClick={() => openModal()} variant="contained" color="primary">
        ➕ Add Job Card
      </Button>

      <Box sx={{ mt: 4, display: "flex", flexWrap: "wrap", gap: 2 }}>
        {cards.map((card) => (
          <Card key={card.id} sx={{ width: 280, p: 2, borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" color="primary">
                {card.companyName || "Untitled"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.jobTitle}
              </Typography>

              <Box sx={{ mt: 1 }}>
                <Typography fontSize={13}>
                  📝 {card.tasks ? card.tasks.length : 0} Tasks
                </Typography>
                <Typography fontSize={13}>
                  📒 {card.notes ? card.notes.length : 0} Notes
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                <IconButton color="primary" onClick={() => openModal(card)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => deleteCard(card.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Modal Form */}
      <Dialog open={open} onClose={closeModal} fullWidth maxWidth="sm">
        <DialogContent>
          <DialogContentText color="blue">
            {editId ? "Edit Job Card" : "Add Job Card"}
          </DialogContentText>

          <Stack spacing={2} marginY={2}>
            <TextField
              label="Company Name"
              name="companyName"
              value={cardData.companyName}
              onChange={handleChange}
              variant="standard"
            />
            <TextField
              label="Job Title"
              name="jobTitle"
              value={cardData.jobTitle}
              onChange={handleChange}
              variant="standard"
            />
            <Textarea
              minRows={4}
              placeholder="Job Description"
              name="jobDescription"
              value={cardData.jobDescription}
              onChange={handleChange}
            />

            <TextField
              label="Task"
              variant="standard"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
            />
            <Button onClick={addTask}>Add Task</Button>

            {tasks.map((t, i) => (
              <Typography key={i}>• {t}</Typography>
            ))}

            <TextField
              label="Note"
              variant="standard"
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
            />
            <Button onClick={addNote}>Add Note</Button>

            {notes.map((n, i) => (
              <Typography key={i}>🗒️ {n}</Typography>
            ))}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeModal} color="error">
            Cancel
          </Button>
          <Button onClick={saveCard} color="primary" variant="contained">
            {editId ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modalpopup;
