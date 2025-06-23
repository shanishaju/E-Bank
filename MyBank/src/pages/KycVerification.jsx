import React, { useState } from 'react';
import {
    Container, Box, Typography, Grid, TextField, Button,
    FormControlLabel, Checkbox, Tabs, Tab, Paper
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextBox from '../components/FormElements/TextBox';

function KycVerification() {
    const [tab, setTab] = useState(0);
    const handleTabChange = (e, newValue) => setTab(newValue);

    return (
        <Container maxWidth="sm" className="mt-10">
            <Paper elevation={5} className="p-8">
                <Typography variant="h5" textAlign="left" gutterBottom
                    sx={{ color: 'gray', fontWeight: 600 }}
                >
                    KYC Verification
                    <hr className="border-t-2 border-gray-200 my-4" />
                </Typography>

                <Tabs
                    value={tab}
                    onChange={handleTabChange}
                    left
                    sx={{ mb: 3, mt: 3 }}
                    textColor="inherit"
                    TabIndicatorProps={{
                        style: { backgroundColor: 'goldenrod' },
                    }}
                >
                    <Tab label="Aadhaar" />
                    <Tab label="Passport" />
                </Tabs>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextBox
                            label="Enter ID Number"
                            variant="outlined"

                        />

                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Button
                            variant="outlined"
                            fullWidth
                            component="label"
                            startIcon={<CloudUploadIcon />}
                            sx={{ borderStyle: 'dashed', p: 4 }}
                        >
                            Upload Id
                            <input type="file" hidden />
                        </Button>
                        <Typography variant="caption" display="block" textAlign="center">
                            PNG, JPG, PDF (1MB Max)
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Button
                            variant="outlined"
                            fullWidth
                            component="label"
                            startIcon={<CloudUploadIcon />}
                            sx={{ borderStyle: 'dashed', p: 4 }}
                        >
                            Upload Image
                            <input type="file" hidden />
                        </Button>
                        <Typography variant="caption" display="block" textAlign="center">
                            PNG, JPG, PDF (1MB Max)
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                backgroundColor: 'goldenrod',
                                '&:hover': { backgroundColor: '' }
                            }}
                        >
                            Verify
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default KycVerification;
