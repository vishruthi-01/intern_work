import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import { AddCircle, RemoveCircle } from "@mui/icons-material";

const EmployeeForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phone: "",
    currentAddress: "",
    permanentAddress: "",
    experiences: [{ company: "", fromDate: "", toDate: "", position: "" }],
    qualifications: [{ institution: "", degree: "", field: "", year: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDynamicChange = (index, name, value, type) => {
    const updatedArray = [...formData[type]];
    updatedArray[index][name] = value;
    setFormData({ ...formData, [type]: updatedArray });
  };

  const addDynamicField = (type) => {
    const newField =
      type === "experiences"
        ? { company: "", fromDate: "", toDate: "", position: "" }
        : { institution: "", degree: "", field: "", year: "" };
    setFormData({ ...formData, [type]: [...formData[type], newField] });
  };

  const removeDynamicField = (index, type) => {
    const updatedArray = formData[type].filter((_, i) => i !== index);
    setFormData({ ...formData, [type]: updatedArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send formData to the backend API
      const response = await axios.post("http://localhost:5000/api/employees/add", formData);

      if (response.status === 200 || response.status === 201) {
        alert("Employee details saved successfully!");
        // Navigate to the dashboard with the submitted form data
        navigate("/dashboard", { state: { formData } });
      } else {
        throw new Error("Failed to save employee details.");
      }
    } catch (err) {
      console.error("Error saving employee details:", err);
      alert("An error occurred while saving. Please try again.");
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, margin: "20px auto", maxWidth: "900px" }}>
      <Typography variant="h4" textAlign="center" gutterBottom color="primary">
        Employee Details Form
      </Typography>
      <Divider sx={{ marginBottom: 3 }} />

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              variant="outlined"
              type="number"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Current Address"
              name="currentAddress"
              value={formData.currentAddress}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Permanent Address"
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
        </Grid>

        {/* Experience Section */}
        <Typography variant="h5" mt={4} gutterBottom color="secondary">
          Previous Experiences
        </Typography>
        {formData.experiences.map((exp, index) => (
          <Box key={index} mb={2} p={2} border={1} borderColor="grey.300" borderRadius={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Company"
                  value={exp.company}
                  onChange={(e) =>
                    handleDynamicChange(index, "company", e.target.value, "experiences")
                  }
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  fullWidth
                  label="From Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={exp.fromDate}
                  onChange={(e) =>
                    handleDynamicChange(index, "fromDate", e.target.value, "experiences")
                  }
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  fullWidth
                  label="To Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={exp.toDate}
                  onChange={(e) =>
                    handleDynamicChange(index, "toDate", e.target.value, "experiences")
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Position"
                  value={exp.position}
                  onChange={(e) =>
                    handleDynamicChange(index, "position", e.target.value, "experiences")
                  }
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6} display="flex" alignItems="center" justifyContent="end">
                <IconButton
                  color="error"
                  onClick={() => removeDynamicField(index, "experiences")}
                >
                  <RemoveCircle />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        ))}
        <Button
          startIcon={<AddCircle />}
          onClick={() => addDynamicField("experiences")}
          variant="outlined"
          color="primary"
        >
          Add Another Experience
        </Button>

        {/* Qualification Section */}
        <Typography variant="h5" mt={4} gutterBottom color="secondary">
          Educational Qualifications
        </Typography>
        {formData.qualifications.map((qual, index) => (
          <Box key={index} mb={2} p={2} border={1} borderColor="grey.300" borderRadius={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Institution"
                  value={qual.institution}
                  onChange={(e) =>
                    handleDynamicChange(index, "institution", e.target.value, "qualifications")
                  }
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Degree"
                  value={qual.degree}
                  onChange={(e) =>
                    handleDynamicChange(index, "degree", e.target.value, "qualifications")
                  }
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Field of Study"
                  value={qual.field}
                  onChange={(e) =>
                    handleDynamicChange(index, "field", e.target.value, "qualifications")
                  }
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Year of Completion"
                  type="number"
                  value={qual.year}
                  onChange={(e) =>
                    handleDynamicChange(index, "year", e.target.value, "qualifications")
                  }
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} display="flex" alignItems="center" justifyContent="end">
                <IconButton
                  color="error"
                  onClick={() => removeDynamicField(index, "qualifications")}
                >
                  <RemoveCircle />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        ))}
        <Button
          startIcon={<AddCircle />}
          onClick={() => addDynamicField("qualifications")}
          variant="outlined"
          color="primary"
        >
          Add Another Qualification
        </Button>

        {/* Submit Button */}
        <Box mt={4} textAlign="center">
          <Button type="submit" variant="contained" color="primary" size="large">
            Submit
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default EmployeeForm;






