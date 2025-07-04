import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Button,
  Tabs,
  Tab,
  Paper,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TextBox from "../components/FormElements/TextBox";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { KycVerificationApi } from "../services/allApi";

function KycVerification() {
  const [tab, setTab] = useState(0);
  const [idFileName, setIdFileName] = useState("");
  const [photoFileName, setPhotoFileName] = useState("");

  const handleTabChange = (e, newValue) => setTab(newValue);

  const {
    register,
    handleSubmit,
    setValue, 
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("idNumber", data.idNumber);
      formData.append("idFile", data.idFile[0]);
      formData.append("photo", data.photo[0]);
      formData.append("idType", tab === 0 ? "Aadhaar" : "Passport");

      console.log("Sending FormData:");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await KycVerificationApi(formData);

      if (response.status === 200) {
        toast.success("KYC submitted successfully!");
        reset();
        setIdFileName("");
        setPhotoFileName("");
      } else {
        toast.error("KYC submission failed");
      }
    } catch (error) {
      toast.error("Error submitting KYC");
      console.error("KYC Error:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper elevation={5} sx={{ p: 6 }}>
          <Typography
            variant="h5"
            textAlign="left"
            gutterBottom
            sx={{ color: "gray", fontWeight: 600 }}
          >
            KYC Verification
            <hr className="border-t-2 border-gray-200 my-4" />
          </Typography>

          <Tabs
            value={tab}
            onChange={handleTabChange}
            sx={{ mb: 3, mt: 3 }}
            textColor="inherit"
            TabIndicatorProps={{
              style: { backgroundColor: "goldenrod" },
            }}
          >
            <Tab label="Aadhaar" />
            <Tab label="Passport" />
          </Tabs>

          <Grid container spacing={2}>
            {/* ID Number */}
            <Grid item xs={12}>
              <TextBox
                label="Enter ID Number"
                {...register("idNumber", {
                  required: "ID Number is required",
                })}
                error={!!errors.idNumber}
                helperText={errors.idNumber?.message}
              />
            </Grid>

            {/* Upload ID File */}
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                fullWidth
                component="label"
                startIcon={<CloudUploadIcon />}
                sx={{ borderStyle: "dashed", p: 4 }}
              >
                Upload ID
                <input
                  type="file"
                  hidden
                  accept=".png,.jpg,.jpeg,.pdf"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setIdFileName(file.name);
                      setValue("idFile", e.target.files); // ✅ set file to react-hook-form
                    }
                  }}
                />
              </Button>
              <Typography
                variant="caption"
                display="block"
                textAlign="center"
                color={errors.idFile ? "error" : "gray"}
              >
                {errors.idFile?.message ||
                  idFileName ||
                  "PNG, JPG, PDF (1MB Max)"}
              </Typography>
            </Grid>

            {/* Upload Photo */}
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                fullWidth
                component="label"
                startIcon={<CloudUploadIcon />}
                sx={{ borderStyle: "dashed", p: 4 }}
              >
                Upload Selfie
                <input
                  type="file"
                  hidden
                  accept=".png,.jpg,.jpeg,.pdf"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setPhotoFileName(file.name);
                      setValue("photo", e.target.files); // ✅ set file to react-hook-form
                    }
                  }}
                />
              </Button>
              <Typography
                variant="caption"
                display="block"
                textAlign="center"
                color={errors.photo ? "error" : "gray"}
              >
                {errors.photo?.message ||
                  photoFileName ||
                  "PNG, JPG, PDF (1MB Max)"}
              </Typography>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isSubmitting}
                sx={{
                  backgroundColor: "goldenrod",
                  "&:hover": { backgroundColor: "#daa520" },
                }}
              >
                {isSubmitting ? "Verifying..." : "Verify"}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </Container>
  );
}

export default KycVerification;
