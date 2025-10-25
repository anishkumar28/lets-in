import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Navbar from "../Navbar/Navbar"; // ✅ Navbar import
import JobIllus from "../../assets/JobIllus.jpeg";
import JobSearchImage from "../../assets/Jobsearch.jpeg";

export default function AboutSection() {
  return (
    <>
      {/* ✅ Navbar at the top */}
      <Navbar />

      <Box
        sx={{
          backgroundColor: "#f4f6f8",
          minHeight: "100vh",
          py: { xs: 4, sm: 8 },
          px: { xs: 3, sm: 6, md: 10 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={4}
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", md: "row" },
            alignItems: "center",
            gap: { xs: 3, md: 6 },
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            maxWidth: "1200px",
            width: "100%",
            backgroundColor: "#fff",
            boxShadow: "0 6px 25px rgba(0,0,0,0.05)",
          }}
        >
          {/* Text Section */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 2,
                background: "linear-gradient(90deg, #007bff, #00c6ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              About Letsin
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Typography
              variant="body1"
              sx={{ color: "#444", lineHeight: 1.8, mb: 3 }}
            >
              <strong>Letsin</strong> is your personal job application companion,
              designed to help you organize, monitor, and optimize your job
              search. It’s built for students, professionals, and anyone who wants
              to bring structure to their application process — all from one
              intuitive dashboard.
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: "#333" }}>
              ✨ What You Can Do with Letsin
            </Typography>

            <List>
              {[
                "Track your job applications across multiple companies in real time.",
                "Save recruiter contacts and company details for easy follow-up.",
                "Create personalized To-Do lists and stay on top of deadlines.",
                "View analytics and metrics that show your progress and success rate.",
                "Get reminders and updates so you never miss an interview or response.",
              ].map((feature, index) => (
                <ListItem key={index} sx={{ py: 0.3 }}>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: "#007bff" }} />
                  </ListItemIcon>
                  <ListItemText primary={feature} />
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 3 }} />

            <Typography variant="body1" sx={{ color: "#555", lineHeight: 1.8 }}>
              Letsin is built to make your job search easier, smarter, and more
              effective. With clear organization and insights, you can focus on
              what truly matters — landing your dream job.
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                mt: 4,
                fontWeight: 600,
                color: "#007bff",
                textAlign: { xs: "center", md: "left" },
              }}
            >
              Stay organized. Stay motivated. Achieve more with Letsin 🚀
            </Typography>
          </Box>

          {/* Image Section */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={JobIllus}
              alt="Letsin illustration"
              style={{
                width: "100%",
                maxWidth: "500px",
                borderRadius: "16px",
                objectFit: "cover",
              }}
            />
          </Box>
        </Paper>
      </Box>
    </>
  );
}
