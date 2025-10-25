import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../Firebase";
import { Box, Card, CardContent, Typography, Grid, Divider } from "@mui/material";

const Todo = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const db = getDatabase(app);
    const usersRef = ref(db, "users");

    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const fetchedCards = Object.keys(data)
          .map((key) => ({
            id: key,
            ...data[key],
          }))
          // keep only those that have tasks in array/object form
          .filter((card) => {
            // handle both array and object shapes
            if (!card.tasks) return false;
            if (Array.isArray(card.tasks)) return card.tasks.length > 0;
            // if tasks stored as object (firebase), check keys
            return Object.keys(card.tasks).length > 0;
          });
        setCards(fetchedCards);
      } else {
        setCards([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <Sidebar />

      {/* Main content: no forced left margin, takes all available width */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
          px: { xs: 2, sm: 3, md: 5 }, // responsive horizontal padding
          py: { xs: 2, sm: 3 },        // vertical padding
          mt: "50px",                  // your requested top margin
          boxSizing: "border-box",
        }}
      >
        <Typography variant="h5" fontWeight="bold" color="primary" mb={3}>
          🗂️ My Tasks
        </Typography>

        {cards.length === 0 ? (
          <Typography color="text.secondary">No tasks available.</Typography>
        ) : (
          <Grid container spacing={3}>
            {cards.map((card) => {
              // normalize tasks into an array for display
              const tasksArray = Array.isArray(card.tasks)
                ? card.tasks
                : Object.values(card.tasks || {}).map((t) => (typeof t === "string" ? t : t.text || ""));

              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={card.id}>
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
                    }}
                  >
                    <CardContent sx={{ p: 0 }}>
                      {tasksArray.slice(0, 3).map((task, idx) => (
                        <Typography
                          key={idx}
                          variant="body1"
                          sx={{
                            fontWeight: 600,
                            mb: 1,
                            wordBreak: "break-word",
                          }}
                        >
                          {task}
                        </Typography>
                      ))}

                      {tasksArray.length > 3 && (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          +{tasksArray.length - 3} more
                        </Typography>
                      )}

                      <Divider sx={{ my: 1 }} />

                      <Typography variant="subtitle2" fontWeight={600} sx={{ color: "#333" }}>
                        {card.companyName || "Untitled Company"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {card.jobTitle || "No job title"}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default Todo;
