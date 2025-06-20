import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';

function KycChecklink() {
    const userData = sessionStorage.getItem('existinguser');
    const parseData = JSON.parse(userData);
    const KycStatus = parseData.kycstatus;
    //   console.log('KycStatus:', KycStatus);


    if (KycStatus === 'approved') return null;

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="body2" sx={{ color: 'gray' }}>
                    {KycStatus === 'pending' && (
                        <>
                            Your account is not verified. Complete your KYC{' '}
                            <Link
                                to="/kyc-verification"
                                style={{ color: 'green', textDecoration: 'underline' }}
                            >
                                Verify here
                            </Link>
                        </>
                    )}

                    {KycStatus === 'rejected' && (
                        <>
                            Your KYC verification was rejected.{' '}
                            <Link
                                to="/kyc-verification"
                                style={{ color: 'red', textDecoration: 'underline' }}
                            >
                                Re-verify here
                            </Link>
                        </>
                    )}
                    {KycStatus === 'under_review' && (
                        <>
                            Your KYC is submitted and currently <span style={{ color: 'orange' }}>under review</span>.
                        </>
                    )}

                </Typography>
            </Grid>
        </Grid>
    );
}

export default KycChecklink;
