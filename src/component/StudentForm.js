import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Grid, Typography, Container } from "@mui/material";

const CertificateForm = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [formValues, setFormValues] = useState({
    studentName: "",
    courseName: "",
    certificateNumber: "",
    passingYear: "",
    courseDuration: "",
    skills: "",
    image: null,
    imagePreview: "",
  });

  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormValues({
      ...formValues,
      image: file,
      imagePreview: URL.createObjectURL(file),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("studentName", formValues.studentName);
    formData.append("skills", formValues.skills);
    formData.append("courseName", formValues.courseName);
    formData.append("certificateNumber", formValues.certificateNumber);
    formData.append("passingYear", formValues.passingYear);
    formData.append("courseDuration", formValues.courseDuration);
    formData.append("image", formValues.image);

    try {
      const response = await axios.post(
        `${apiUrl}/api/students`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Form submitted successfully:", response.data);
      setQrCodeUrl(response.data.qrCode); // Store the QR code URL in state
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Typography
        component="h1"
        variant="h5"
        style={{ textAlign: "center", margin: "30px" }}
      >
       
      </Typography>
      <form onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="studentName"
              label="Student Name"
              name="studentName"
              value={formValues.studentName}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="courseName"
              label="Course Name"
              name="courseName"
              value={formValues.courseName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="certificateNumber"
              label="Certificate Number"
              name="certificateNumber"
              value={formValues.certificateNumber}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="passingYear"
              label="Passing Year"
              name="passingYear"
              value={formValues.passingYear}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="courseDuration"
              label="Course Duration"
              name="courseDuration"
              value={formValues.courseDuration}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="skills"
              label="Skills"
              name="skills"
              value={formValues.skills}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="image"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="image">
              <Button
                variant="contained"
                color="primary"
                component="span"
                fullWidth
              >
                Upload Image
              </Button>
            </label>
          </Grid>
          {formValues.imagePreview && (
            <Grid item xs={12}>
              <img
                src={formValues.imagePreview}
                alt="Uploaded"
                style={{
                  width: "100%",
                  maxHeight: "300px",
                  objectFit: "cover",
                }}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      {qrCodeUrl && (
        <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
          <Typography variant="h6">QR Code</Typography>
          <img
            src={qrCodeUrl}
            alt="QR Code"
            style={{ width: "200px", height: "200px" }}
          />
        </Grid>
      )}
    </Container>
  );
};

export default CertificateForm;
