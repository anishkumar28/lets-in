import React, { useState } from "react";
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
import { getDatabase, ref, push } from "firebase/database";
import { app } from "../components/Firebase";

const currencies = [
  { value: "Wishlist", label: "Wishlist" },
  { value: "Applied", label: "Applied" },
  { value: "Interview", label: "Interview" },
  { value: "Offer", label: "Offer" },
  { value: "Rejected", label: "Rejected" },
];

const blue = {
  400: "#3399FF",
  500: "#007FFF",
};

const grey = {
  300: "#C7D0DD",
  900: "#1C2025",
  50: "#F3F6F9",
};

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

const Modalpopup = () => {
  const [open, openchange] = useState(false);
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

  // 🟢 Tasks State
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  // 🟢 Notes State
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState("");

  // 🟢 Task Suggestions
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

  const functionopenpopup = () => openchange(true);
  const closepopup = () => openchange(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactInput((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  // 🟢 Add Task
  const addTask = () => {
    if (!taskInput.trim()) {
      alert("Please enter a task first.");
      return;
    }
    setTasks((prev) => [...prev, taskInput]);
    setTaskInput("");
  };

  const removeTask = (index) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };

  const applySuggestion = (text) => {
    setTaskInput(text);
  };

  // 🟢 Add Note
  const addNote = () => {
    if (!noteInput.trim()) {
      alert("Please enter a note first.");
      return;
    }
    setNotes((prev) => [...prev, noteInput]);
    setNoteInput("");
  };

  const removeNote = (index) => {
    setNotes((prev) => prev.filter((_, i) => i !== index));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const db = getDatabase(app);
    const usersRef = ref(db, "users");

    // Convert arrays into objects with unique keys
    const contactsObj = contacts.reduce((acc, item, index) => {
      acc[`contact_${index + 1}`] = item;
      return acc;
    }, {});

    const tasksObj = tasks.reduce((acc, task, index) => {
      acc[`task_${index + 1}`] = { text: task };
      return acc;
    }, {});

    const notesObj = notes.reduce((acc, note, index) => {
      acc[`note_${index + 1}`] = { text: note };
      return acc;
    }, {});

    const payload = {
      ...cardData,
      contacts: contactsObj,
      tasks: tasksObj,
      notes: notesObj,
      createdAt: new Date().toISOString(),
    };

    await push(usersRef, payload);

    // Reset form
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
    closepopup();
  };


  return (
    <div style={{ textAlign: "center" }}>
      <Button onClick={functionopenpopup} color="primary" variant="contained">
        Add
      </Button>

      <Dialog open={open} onClose={closepopup} fullWidth maxWidth="sm">
        <DialogContent>
          {/* JOB INFO SECTION */}
          <Stack spacing={2} margin={4}>
            <DialogContentText color={"blue"}>Job Info Section</DialogContentText>

            <div className="flex flex-row justify-between">
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

            <div className="flex flex-row justify-between">
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

            <div className="flex flex-row justify-between">
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

          {/* CONTACT SECTION */}
          <Stack spacing={2} margin={4}>
            <DialogContentText color={"blue"}>Contacts Section</DialogContentText>

            <div className="flex flex-row justify-between">
              <TextField
                name="fullName"
                label="Full Name"
                variant="standard"
                value={contactInput.fullName}
                onChange={handleContactChange}
              />
              <TextField
                name="phoneNumber"
                label="Phone Number"
                variant="standard"
                value={contactInput.phoneNumber}
                onChange={handleContactChange}
              />
            </div>

            <div className="flex flex-row justify-between">
              <TextField
                name="emailAddress"
                label="Email Address"
                variant="standard"
                value={contactInput.emailAddress}
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

            <div className="flex flex-row justify-between">
              <TextField
                name="linkedin"
                label="Linkedin Profile URL"
                variant="standard"
                value={contactInput.linkedin}
                onChange={handleContactChange}
              />
              <TextField
                name="website"
                label="Company Website"
                variant="standard"
                value={contactInput.website}
                onChange={handleContactChange}
              />
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
              <Button variant="contained" color="primary" onClick={addContact}>
                Add Contact
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() =>
                  setContactInput({
                    fullName: "",
                    phoneNumber: "",
                    emailAddress: "",
                    jobTitle: "",
                    linkedin: "",
                    website: "",
                  })
                }
              >
                Clear
              </Button>
            </div>

            {contacts.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <DialogContentText color="gray">Draft Contacts</DialogContentText>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {contacts.map((c, i) => (
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
                      <div>
                        <strong>{c.fullName || c.emailAddress || "No name"}</strong>
                        <div style={{ fontSize: 13, color: "#666" }}>
                          {c.phoneNumber || ""} {c.emailAddress && ` • ${c.emailAddress}`}
                        </div>
                      </div>
                      <IconButton size="small" onClick={() => removeContact(i)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                </div>
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
                Add Task
              </Button>
            </div>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                mt: 1,
              }}
            >
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
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
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
                      <span>{task}</span>
                      <IconButton size="small" onClick={() => removeTask(i)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                </div>
              </Box>
            )}
          </Stack>

          {/* COVER LETTER SECTION */}
          <Stack spacing={2} margin={4}>
            <DialogContentText color={"blue"}>Cover Letter</DialogContentText>
            <Textarea
              minRows={8}
              name="coverLetter"
              value={cardData.coverLetter}
              placeholder="Add cover letter"
              onChange={handleChange}
            />
          </Stack>

          {/* 🟢 NOTES SECTION */}
          <Stack spacing={2} margin={4}>
            <DialogContentText color={"blue"}>Notes Section</DialogContentText>

            <div className="flex flex-row justify-between">
              <TextField
                fullWidth
                variant="standard"
                label="Note"
                value={noteInput || ""}
                onChange={(e) => setNoteInput(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ ml: 2 }}
                onClick={addNote}
              >
                Add Note
              </Button>
            </div>

            {notes.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <DialogContentText color="gray">Draft Notes</DialogContentText>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
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
                      <span>{note}</span>
                      <IconButton size="small" onClick={() => removeNote(i)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                </div>
              </Box>
            )}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={closepopup} color="error" variant="contained">
            CLOSE
          </Button>
          <Button onClick={submitForm} color="primary" variant="contained">
            SAVE CARD
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modalpopup;
