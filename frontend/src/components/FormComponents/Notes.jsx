import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../Firebase";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  Stack,
} from "@mui/material";

const Notes = () => {
  const [notes, setNotes] = useState([]);

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
                  companyName,
                  jobTitle,
                  text: note.text.trim(),
                });
              }
            });
          }
        });
      }

      setNotes(fetchedNotes);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f9fafc" }}>
      <Sidebar />

      {/* Main Content Area */}
      <Box
        sx={{
          flexGrow: 1,
          px: 5,
          py: 4,
          mt: "50px", // 🟢 Added 30px margin from top
          overflowY: "auto",
        }}
      >
        {/* Header Section */}
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
            🗒️ Notes
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ fontStyle: "italic" }}
          >
            View all your saved notes by job & company
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
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        fontSize: "1.25rem",
                        color: "#1e293b",
                        lineHeight: 1.5,
                        mb: 2,
                        textAlign: "justify",
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
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default Notes;
