import React, { useEffect, useState } from "react";
import Sidebar from "../FormComponents/Sidebar/Sidebar";
import {
  getDatabase,
  ref,
  onValue,
  update
} from "firebase/database";
import { app } from "../Database/Firebase";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Snackbar,
  Alert
} from "@mui/material";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

  useEffect(() => {
    const db = getDatabase(app);
    const usersRef = ref(db, "users");

    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setTasks([]);
        return;
      }

      const allTasks = [];

      Object.keys(data).forEach((key) => {
        const card = data[key];
        if (card.tasks) {
          const taskEntries = Array.isArray(card.tasks)
            ? card.tasks.map((t, idx) => ({ id: `${key}-${idx}`, ...t }))
            : Object.entries(card.tasks).map(([tKey, tValue]) => ({
                id: `${key}-${tKey}`,
                ...tValue,
              }));

          taskEntries.forEach((task) => {
            const taskText =
              typeof task === "string" ? task : task.text || "Untitled Task";

            const isDone =
              typeof task === "object" && task.done ? true : false;

            const createdAt =
              typeof task === "object" && task.createdAt
                ? task.createdAt
                : null;

            allTasks.push({
              id: `${key}-${taskText.substring(0, 20)}`,
              task: taskText,
              companyName: card.companyName || "Untitled Company",
              jobTitle: card.jobTitle || "No job title",
              done: isDone,
              createdAt,
              parentKey: key,
              taskKey: task.key || null,
            });
          });
        }
      });

      setTasks(allTasks);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Function to handle "Mark Done" action
  const handleMarkDone = (taskItem) => {
    setSelectedTask(taskItem);
    setConfirmDialogOpen(true);
  };

  // ✅ Confirm Dialog - Proceed with marking task as done
  const confirmMarkDone = () => {
    if (!selectedTask) return;
    const db = getDatabase(app);
    const userRef = ref(db, `users/${selectedTask.parentKey}/tasks`);

    onValue(
      userRef,
      (snapshot) => {
        const tasksData = snapshot.val();
        if (!tasksData) {
          setSnackbar({ open: true, message: "No tasks found to update!", severity: "warning" });
          return;
        }

        const updatedTasks = Array.isArray(tasksData)
          ? tasksData.map((t) =>
              typeof t === "string"
                ? t === selectedTask.task
                  ? { text: t, done: true }
                  : t
                : t.text === selectedTask.task
                ? { ...t, done: true }
                : t
            )
          : Object.fromEntries(
              Object.entries(tasksData).map(([key, val]) => [
                key,
                val.text === selectedTask.task ? { ...val, done: true } : val,
              ])
            );

        update(userRef, updatedTasks)
          .then(() => {
            setSnackbar({ open: true, message: "Task marked as done successfully!", severity: "success" });
          })
          .catch(() => {
            setSnackbar({ open: true, message: "Failed to update task.", severity: "error" });
          });
      },
      { onlyOnce: true }
    );

    setConfirmDialogOpen(false);
    setSelectedTask(null);
  };

  const cancelMarkDone = () => {
    setConfirmDialogOpen(false);
    setSelectedTask(null);
  };

  // ✅ Format date/time
  const formatDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-8">
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
          px: { xs: 2, sm: 3, md: 5 },
          py: { xs: 2, sm: 3 },
          mt: "50px",
          boxSizing: "border-box",
        }}
      >
        <Typography  variant="h4"
          sx={{ fontWeight: 700, color: "#1e293b", letterSpacing: "0.5px" }} mb={3}>
          My Tasks
        </Typography>

        <Divider sx={{ mb: 3, borderColor: "#cbd5e1", borderBottomWidth: 2 }} />


        {tasks.length === 0 ? (
          <Typography color="text.secondary">No tasks available.</Typography>
        ) : (
          <Grid container spacing={3}>
            {tasks.map((taskItem) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={taskItem.id}>
                <Card
                  sx={{
                    borderRadius: 2,
                    boxShadow: 2,
                    p: 2,
                    transition: "0.2s",
                    "&:hover": { boxShadow: 4 },
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    opacity: taskItem.done ? 0.7 : 1,
                    backgroundColor: taskItem.done ? "#e0f2f1" : "white",
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={taskItem.done}
                          onChange={() => {
                            if (!taskItem.done) handleMarkDone(taskItem);
                          }}
                          disabled={taskItem.done}
                          color="success"
                        />
                      }
                      label={
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 600,
                            mb: 1,
                            wordBreak: "break-word",
                            color: "#333",
                            textDecoration: taskItem.done
                              ? "line-through"
                              : "none",
                            textDecorationThickness: "2px",
                          }}
                        >
                          {taskItem.task}
                        </Typography>
                      }
                    />

                    {taskItem.createdAt && (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: "block", mb: 1 }}
                      >
                        🕒 {formatDate(taskItem.createdAt)}
                      </Typography>
                    )}

                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#555", mt: 1, fontWeight: 500 }}
                    >
                      {taskItem.companyName}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontStyle: "italic" }}
                    >
                      {taskItem.jobTitle}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* ✅ MUI Confirmation Dialog */}
        <Dialog
          open={confirmDialogOpen}
          onClose={cancelMarkDone}
          aria-labelledby="confirm-dialog-title"
        >
          <DialogTitle id="confirm-dialog-title">
            Mark Task as Done
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to mark this task as done?  
              <br />
              <strong>
                “{selectedTask?.task || ""}”
              </strong>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelMarkDone} color="inherit">
              Cancel
            </Button>
            <Button onClick={confirmMarkDone} color="success" variant="contained">
              Mark as Done
            </Button>
          </DialogActions>
        </Dialog>

        {/* ✅ Snackbar Toast Notification */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
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

export default Todo;
