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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import DeleteIcon from "@mui/icons-material/Delete";
import { getDatabase, ref, update } from "firebase/database";
import { app } from "../Database/Firebase";
import EditIcon from "@mui/icons-material/Edit";

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
    font-weight: 400;
    line-height: 1.5;
    resize: none;
    border-radius: 8px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[900] : grey[300]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };
    &:hover { border-color: ${blue[400]}; }
    &:focus { border-color: ${blue[500]}; }
    &:focus-visible { outline: 0; }
`
);

const EditModal = ({ open, onClose, initialData, cardId }) => {
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
    "Email",
    "Meeting",
    "Phone Call",
    "Assignment",
  ];

  useEffect(() => {
    if (initialData) {
      setCardData({
        companyName: initialData.companyName || "",
        jobTitle: initialData.jobTitle || "",
        link: initialData.link || "",
        location: initialData.location || "",
        salary: initialData.salary || "",
        status: initialData.status || "",
        jobDescription: initialData.jobDescription || "",
        coverLetter: initialData.coverLetter || "",
      });

      if (initialData.contacts && typeof initialData.contacts === "object")
        setContacts(Object.values(initialData.contacts));
      else setContacts([]);

      if (initialData.tasks && typeof initialData.tasks === "object") {
        setTasks(
          Object.values(initialData.tasks).map((t) => ({
            text: (t && t.text) || "",
            createdAt: t.createdAt || new Date().toISOString(),
          }))
        );
      } else setTasks([]);

      if (initialData.notes && typeof initialData.notes === "object") {
        setNotes(
          Object.values(initialData.notes).map((n) => ({
            text: (n && n.text) || "",
            createdAt: n.createdAt || new Date().toISOString(),
          }))
        );
      } else setNotes([]);

      setContactInput({
        fullName: "",
        phoneNumber: "",
        emailAddress: "",
        jobTitle: "",
        linkedin: "",
        website: "",
      });
      setTaskInput("");
      setNoteInput("");
    }
  }, [initialData, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactInput((prev) => ({ ...prev, [name]: value }));
  };

  const addContact = () => {
    if (!contactInput.fullName && !contactInput.phoneNumber) {
      alert("Please enter contact name or phone number before adding.");
      return;
    }
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

  const removeContact = (index) => {
    setContacts((prev) => prev.filter((_, i) => i !== index));
  };

  const addTask = () => {
    if (!taskInput.trim()) {
      alert("Please enter a task first.");
      return;
    }
    const newTask = { text: taskInput, createdAt: new Date().toISOString() };
    setTasks((prev) => [...prev, newTask]);
    setTaskInput("");
  };

  const removeTask = (index) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };

  const applySuggestion = (text) => setTaskInput(text);

  const addNote = () => {
    if (!noteInput.trim()) {
      alert("Please enter a note first.");
      return;
    }
    const newNote = { text: noteInput, createdAt: new Date().toISOString() };
    setNotes((prev) => [...prev, newNote]);
    setNoteInput("");
  };

  const removeNote = (index) => {
    setNotes((prev) => prev.filter((_, i) => i !== index));
  };

  const submitEdit = async () => {
    try {
      const db = getDatabase(app);
      const userRef = ref(db, `users/${cardId}`);

      const contactsObj = contacts.reduce((acc, item, index) => {
        acc[`contact_${index + 1}`] = item;
        return acc;
      }, {});

      const tasksObj = tasks.reduce((acc, task, index) => {
        acc[`task_${index + 1}`] = {
          text: task.text,
          createdAt: task.createdAt,
        };
        return acc;
      }, {});

      const notesObj = notes.reduce((acc, note, index) => {
        acc[`note_${index + 1}`] = {
          text: note.text,
          createdAt: note.createdAt,
        };
        return acc;
      }, {});

      const timenow = new Date().toISOString();

      const payload = {
        ...cardData,
        contacts: contactsObj,
        tasks: tasksObj,
        notes: notesObj,
        updatedAt: timenow,
      };

      await update(userRef, payload);
      onClose();
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update — check console for details.");
    }
  };

  const formatDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogContent>
        {/* JOB INFO SECTION */}
        <Stack spacing={2} margin={4}>
          <DialogContentText color={"blue"}>Job Info Section</DialogContentText>
          <div className="flex flex-row justify-between gap-4">
            <TextField
              name="companyName"
              label="Company Name"
              variant="standard"
              value={cardData.companyName}
              onChange={handleChange}
              required
            />
            <TextField
              name="jobTitle"
              label="Job Title"
              variant="standard"
              value={cardData.jobTitle}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-row justify-between gap-4">
            <TextField
              name="link"
              label="Link"
              variant="standard"
              value={cardData.link}
              onChange={handleChange}
            />
            <TextField
              name="location"
              label="Location"
              variant="standard"
              value={cardData.location}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-row gap-20 items-center">
            <TextField
              name="salary"
              label="Salary"
              variant="standard"
              value={cardData.salary}
              onChange={handleChange}
            />

            <TextField
              select
              name="status"
              label="Status"
              value={cardData.status}
              onChange={handleChange}
              variant="standard"
              helperText="Current status"
              sx={{ flex: 1 }}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <Textarea
            minRows={8}
            placeholder="Job Description"
            name="jobDescription"
            value={cardData.jobDescription}
            onChange={handleChange}
          />
        </Stack>

        {/* CONTACTS SECTION */}
        <Stack spacing={2} margin={4}>
          <DialogContentText color={"blue"}>Contacts Section</DialogContentText>
          <div className="flex flex-row justify-between gap-4">
            <TextField
              name="fullName"
              label="Full Name"
              variant="standard"
              value={contactInput.fullName}
              onChange={handleContactChange}
            />
            <TextField
              name="jobTitle"
              label="Job Title"
              variant="standard"
              value={contactInput.jobTitle}
              onChange={handleContactChange}
            />
          </div>

          <div className="flex flex-row justify-between gap-4">
            <TextField
              name="phoneNumber"
              label="Phone"
              variant="standard"
              value={contactInput.phoneNumber}
              onChange={handleContactChange}
            />
            <TextField
              name="emailAddress"
              label="Email"
              variant="standard"
              value={contactInput.emailAddress}
              onChange={handleContactChange}
            />
          </div>

          <div className="flex flex-row justify-between gap-4">
            <TextField
              name="linkedin"
              label="LinkedIn"
              variant="standard"
              value={contactInput.linkedin}
              onChange={handleContactChange}
            />
            <TextField
              name="website"
              label="Website"
              variant="standard"
              value={contactInput.website}
              onChange={handleContactChange}
            />
          </div>

          <Button variant="contained" color="primary" onClick={addContact}>
            Add Contact
          </Button>

          {contacts.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <DialogContentText color="gray">Saved Contacts</DialogContentText>
              {contacts.map((contact, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid #e0e0e0",
                    borderRadius: 1,
                    p: 1,
                  }}
                >
                  <span>
                    <strong>{contact.fullName}</strong> — {contact.jobTitle}
                    <div style={{ fontSize: 12, color: "#777" }}>
                      📞 {contact.phoneNumber} | ✉️ {contact.emailAddress}
                    </div>
                    {contact.linkedin && (
                      <div style={{ fontSize: 12, color: "#777" }}>
                        🔗 {contact.linkedin}
                      </div>
                    )}
                  </span>
                  <IconButton size="small" onClick={() => removeContact(i)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Box>
          )}
        </Stack>

        {/* TASKS SECTION */}
        <Stack spacing={2} margin={4}>
          <DialogContentText color={"blue"}>Tasks Section</DialogContentText>
          <div className="flex flex-row justify-between">
            <TextField
              fullWidth
              variant="standard"
              label="Task"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ ml: 2 }}
              onClick={addTask}
            >
              Add
            </Button>
          </div>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
            {taskSuggestions.map((sug) => (
              <Button
                key={sug}
                variant="outlined"
                size="small"
                onClick={() => applySuggestion(sug)}
              >
                {sug}
              </Button>
            ))}
          </Box>

          {tasks.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <DialogContentText color="gray">Draft Tasks</DialogContentText>
              {tasks.map((task, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid #e0e0e0",
                    borderRadius: 1,
                    p: 1,
                  }}
                >
                  <span>
                    {task.text}
                    <div style={{ fontSize: 12, color: "#777" }}>
                      {formatDate(task.createdAt)}
                    </div>
                  </span>
                  <IconButton size="small" onClick={() => removeTask(i)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Box>
          )}
        </Stack>

        {/* NOTES SECTION */}
        <Stack spacing={2} margin={4}>
          <DialogContentText color={"blue"}>Notes Section</DialogContentText>
          <div className="flex flex-row justify-between">
            <TextField
              fullWidth
              variant="standard"
              label="Note"
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ ml: 2 }}
              onClick={addNote}
            >
              Add
            </Button>
          </div>

          {notes.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <DialogContentText color="gray">Draft Notes</DialogContentText>
              {notes.map((note, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid #e0e0e0",
                    borderRadius: 1,
                    p: 1,
                  }}
                >
                  <span>
                    {note.text}
                    <div style={{ fontSize: 12, color: "#777" }}>
                      {formatDate(note.createdAt)}
                    </div>
                  </span>
                  <IconButton size="small" onClick={() => removeNote(i)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Box>
          )}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="error" variant="contained">
          Cancel
        </Button>
        <Button onClick={submitEdit} color="primary" variant="contained">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
