<<<<<<< HEAD
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeForm from "./EmployeeForm";
import Dashboard from "./Dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
=======
import React, { useState } from "react";
import { TextField, Button, Card, CardContent, Typography, CircularProgress } from "@mui/material";

const FetchUserDetails = () => {
  const [name, setName] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    setLoading(true);
    try {
      setError("");
      const response = await fetch(`http://localhost:5000/user?name=${name}`);
      if (!response.ok) {
        throw new Error("User not found");
      }
      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError(err.message);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <CardContent>
          <Typography variant="h4" align="center" style={styles.title}>
            Fetch User Details
          </Typography>
          <TextField
            label="Enter username"
            variant="outlined"
            fullWidth
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            style={styles.button}
            onClick={fetchUser}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Fetch User"}
          </Button>

          {error && <Typography color="error" style={styles.error}>{error}</Typography>}

          {userData && (
            <div style={styles.userDetails}>
              <Typography variant="h6" style={styles.userDetail}>Name: {userData.name}</Typography>
              <Typography variant="h6" style={styles.userDetail}>Email: {userData.email}</Typography>
              <Typography variant="h6" style={styles.userDetail}>Age: {userData.age}</Typography>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: 400,
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
  },
  title: {
    marginBottom: "20px",
    color: "#333333",
  },
  input: {
    marginBottom: "20px",
  },
  button: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
  },
  error: {
    marginTop: "10px",
    color: "#f44336",
    textAlign: "center",
  },
  userDetails: {
    marginTop: "20px",
    textAlign: "center",
  },
  userDetail: {
    marginBottom: "10px",
    fontWeight: "500",
  },
};

export default FetchUserDetails;


>>>>>>> 64e5014 (Your commit message)

