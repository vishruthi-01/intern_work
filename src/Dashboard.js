import React from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
  Divider,
  Avatar,
} from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";

const Dashboard = () => {
  const location = useLocation();
  const { formData } = location.state || {}; // Get data passed from the form

  if (!formData) {
    return (
      <Typography variant="h5" color="error" textAlign="center" mt={4}>
        No data available. Please submit the form first.
      </Typography>
    );
  }

  return (
    <Paper
      elevation={5}
      sx={{
        padding: 4,
        margin: "20px auto",
        maxWidth: "900px",
        borderRadius: 3,
        background: "linear-gradient(to bottom right, #f3e5f5, #e8eaf6)",
      }}
    >
      {/* Header Section */}
      <Box textAlign="center" mb={4}>
        <Avatar
          sx={{ width: 80, height: 80, bgcolor: "#3f51b5", margin: "0 auto" }}
        >
          <PersonIcon fontSize="large" />
        </Avatar>
        <Typography
          variant="h4"
          textAlign="center"
          gutterBottom
          color="primary"
          mt={2}
        >
          Employee Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          A snapshot of employee details
        </Typography>
      </Box>
      <Divider sx={{ marginBottom: 3, backgroundColor: "#3f51b5" }} />

      {/* Personal Details Section */}
      <Typography
        variant="h5"
        gutterBottom
        color="secondary"
        fontWeight="bold"
        mb={2}
      >
        Personal Details
      </Typography>
      <Card
        sx={{
          marginBottom: 4,
          padding: 2,
          borderRadius: 3,
          background: "#fce4ec",
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography><strong>First Name:</strong> {formData.firstName}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography><strong>Last Name:</strong> {formData.lastName}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography><strong>Age:</strong> {formData.age}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography><strong>Phone:</strong> {formData.phone}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography><strong>Current Address:</strong> {formData.currentAddress}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography><strong>Permanent Address:</strong> {formData.permanentAddress}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Experience Section */}
      <Typography
        variant="h5"
        gutterBottom
        color="secondary"
        fontWeight="bold"
        mb={2}
      >
        <WorkOutlineIcon /> Previous Experiences
      </Typography>
      {formData.experiences.length > 0 ? (
        formData.experiences.map((exp, index) => (
          <Card
            key={index}
            sx={{
              marginBottom: 2,
              padding: 2,
              borderRadius: 3,
              background: "#e3f2fd",
            }}
          >
            <CardContent>
              <Typography><strong>Company:</strong> {exp.company}</Typography>
              <Typography><strong>From:</strong> {exp.fromDate}</Typography>
              <Typography><strong>To:</strong> {exp.toDate}</Typography>
              <Typography><strong>Position:</strong> {exp.position}</Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography color="text.secondary" textAlign="center">
          No experience details available.
        </Typography>
      )}

      {/* Qualifications Section */}
      <Typography
        variant="h5"
        gutterBottom
        color="secondary"
        fontWeight="bold"
        mt={4}
        mb={2}
      >
        <SchoolIcon /> Educational Qualifications
      </Typography>
      {formData.qualifications.length > 0 ? (
        formData.qualifications.map((qual, index) => (
          <Card
            key={index}
            sx={{
              marginBottom: 2,
              padding: 2,
              borderRadius: 3,
              background: "#e8f5e9",
            }}
          >
            <CardContent>
              <Typography><strong>Institution:</strong> {qual.institution}</Typography>
              <Typography><strong>Degree:</strong> {qual.degree}</Typography>
              <Typography><strong>Field of Study:</strong> {qual.field}</Typography>
              <Typography><strong>Year of Completion:</strong> {qual.year}</Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography color="text.secondary" textAlign="center">
          No qualification details available.
        </Typography>
      )}
    </Paper>
  );
};

export default Dashboard;
