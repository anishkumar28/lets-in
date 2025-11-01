import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../components/Firebase";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import Modalpopup from "./Modalpopup";

const JobCardsList = () => {
  const [cards, setCards] = useState([]);
  const [editCard, setEditCard] = useState(null);

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

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        My Job Cards
      </Typography>
      {cards.length === 0 ? (
        <Typography color="text.secondary">No cards found.</Typography>
      ) : (
        cards.map((card) => (
          <Card
            key={card.id}
            sx={{ mb: 2, boxShadow: 2, borderRadius: 2, p: 2 }}
          >
            <CardContent>
              <Typography variant="h6">{card.companyName}</Typography>
              <Typography variant="body2" color="text.secondary">
                {card.jobTitle}
              </Typography>
              <Button
                variant="outlined"
                sx={{ mt: 1 }}
                onClick={() => setEditCard(card)}
              >
                ✏️ Edit
              </Button>
            </CardContent>
          </Card>
        ))
      )}

      {editCard && (
        <Modalpopup
          openExternal={true}
          editMode={true}
          existingData={editCard}
          onCloseExternal={() => setEditCard(null)}
        />
      )}
    </Box>
  );
};

export default JobCardsList;
