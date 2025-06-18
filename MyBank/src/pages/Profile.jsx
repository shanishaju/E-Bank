import React, { useEffect, useState } from 'react';
import { Grid, Radio, RadioGroup, FormControlLabel, FormLabel, FormControl, Button, } from '@mui/material';
import { toast } from 'sonner'
import TextBox from '../components/FormElements/TextBox';
import BalanceCard from '../components/BalanceCard';
import bgmoneyimg from '../assets/moneybg-removebg.png';
import { GetMyProfileApi } from '../services/allApi';

function Profile() {
    const [userDetails, setUserDetails] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        address: '',
        dob: '',
        gender: '',
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await GetMyProfileApi();
                if (response.status === 200) {
                    const user = response.data.userDetails;
                    // sessionStorage.setItem('userProfile', JSON.stringify(user));
                }
            } catch (error) {
                toast.error("Failed to fetch profile data. Please try again later.");
            }
        };
        fetchProfile();
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <Grid container spacing={2} className="py-10">
            <Grid item xs={12} sm={6} md={6} className="bg-gray-100">
                <Grid container spacing={2} className="p-10">
                    <Grid item xs={12}>
                        <h1 className="text-green-900 text-[50px]">
                            Hii {userDetails.firstname}
                        </h1>
                        <p>Edit Profile</p>
                    </Grid>

                    <Grid item xs={12}>
                        <TextBox
                            label="First Name"
                            name="firstname"
                            value={userDetails.firstname}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextBox
                            label="Last Name"
                            name="lastname"
                            value={userDetails.lastname}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextBox
                            label="Email"
                            name="email"
                            value={userDetails.email}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextBox
                            label="Phone Number"
                            name="phone"
                            value={userDetails.phone}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextBox
                            label="Address"
                            name="address"
                            multiline
                            rows={4}
                            value={userDetails.address}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextBox
                            type="date"
                            name="dob"
                            value={userDetails.dob?.slice(0, 10)}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup
                                row
                                name="gender"
                                value={userDetails.gender}
                                onChange={handleChange}
                            >
                                <FormControlLabel
                                    value="male"
                                    control={<Radio />}
                                    label="Male"
                                />
                                <FormControlLabel
                                    value="female"
                                    control={<Radio />}
                                    label="Female"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Button
                            variant="contained"
                            color="inherit"
                            fullWidth
                            onClick={() =>
                                setUserDetails({
                                    firstname: '',
                                    lastname: '',
                                    email: '',
                                    phone: '',
                                    address: '',
                                    dob: '',
                                    gender: '',
                                })
                            }
                        >
                            Clear Data
                        </Button>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Button variant="contained" color="success" fullWidth>
                            Update Profile
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

            <Grid
                item
                xs={12}
                sm={6}
                md={6}
                className="relative flex items-center justify-center"
                style={{
                    backgroundImage: `url(${bgmoneyimg})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-white opacity-60 z-0" />
                <div className="p-10 relative z-10">
                    <BalanceCard />
                </div>
            </Grid>
        </Grid>
    );
}

export default Profile;
