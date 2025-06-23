import React, { useEffect } from 'react';
import {
    Grid, Radio, RadioGroup, FormControlLabel,
    FormLabel, FormControl, Button, Box
} from '@mui/material';
import { toast } from 'sonner';
import TextBox from '../components/FormElements/TextBox';
import BalanceCard from '../components/BalanceCard';
import bgmoneyimg from '../assets/moneybg-removebg.png';
import { GetMyProfileApi, UpdateProfileApi } from '../services/allApi';
import { useForm, Controller } from 'react-hook-form';
import KycChecklink from '../components/KycCheckLink/KycChecklink';

function Profile() {
    const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm({
        defaultValues: {
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            address: '',
            dob: '',
            gender: ''
        },
        mode: 'onChange'
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await GetMyProfileApi();
                if (response.status === 200) {
                    const user = response.data.userDetails;
                    reset({
                        firstname: user.firstname || '',
                        lastname: user.lastname || '',
                        email: user.email || '',
                        phone: user.phone || '',
                        address: user.address || '',
                        dob: user.dob?.slice(0, 10) || '',
                        gender: user.gender || ''
                    });
                }
            } catch (error) {
                toast.error("Failed to fetch profile data.");
            }
        };
        fetchProfile();
    }, [reset]);


    const onSubmit = async (data) => {
        try {
            const response = await UpdateProfileApi(data);
            if (response.status === 200) {
                toast.success("Profile updated successfully!");
            } else {
                toast.error("Failed to update profile");
            }
        } catch (error) {
            toast.error("Something went wrong.");
        }
    };
    const userData = sessionStorage.getItem('existinguser');
    const parseUserData = userData ? JSON.parse(userData) : null;
    const username = parseUserData?.firstname || '';

    return (
        <Grid container spacing={2} className="pt-10">
            <Grid
                item
                xs={12}
                sm={6}
                md={6}
                className="relative flex items-center justify-center p-5"
                style={{
                    backgroundImage: `url(${bgmoneyimg})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }}
            >
                <div className="absolute inset-0 bg-white opacity-60 z-0" />
                <div className="relative z-10">
                    <KycChecklink />
                    <BalanceCard />

                </div>
            </Grid>

            <Grid item xs={12} sm={6} md={6} className="">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2} className="">
                        <Grid item xs={12}>
                            <h1 className="text-green-900 text-[50px]">Howdy {username}</h1>
                            <p>Edit Profile</p>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="firstname"
                                control={control}
                                rules={{ required: 'First name is required' }}
                                render={({ field }) => (
                                    <TextBox
                                        label="First Name"
                                        {...field}
                                        error={!!errors.firstname}
                                        helperText={errors.firstname?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="lastname"
                                control={control}
                                rules={{ required: 'Last name is required' }}
                                render={({ field }) => (
                                    <TextBox
                                        label="Last Name"
                                        {...field}
                                        error={!!errors.lastname}
                                        helperText={errors.lastname?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                name="email"
                                control={control}
                                rules={{
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: 'Enter a valid email address'
                                    }
                                }}
                                render={({ field }) => (
                                    <TextBox
                                        label="Email"
                                        {...field}
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                name="phone"
                                control={control}
                                rules={{
                                    required: 'Phone number is required',
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: 'Phone number must be 10 digits'
                                    }
                                }}
                                render={({ field }) => (
                                    <TextBox
                                        label="Phone Number"
                                        {...field}
                                        error={!!errors.phone}
                                        helperText={errors.phone?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name="dob"
                                        control={control}
                                        render={({ field }) => (
                                            <TextBox
                                                label="DoB"
                                                type="date"
                                                InputLabelProps={{ shrink: true }}
                                                {...field}
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControl>
                                        <FormLabel>Gender</FormLabel>
                                        <RadioGroup row value={control._formValues.gender || ''}>
                                            <FormControlLabel
                                                value="male"
                                                control={
                                                    <Radio
                                                        disabled
                                                        sx={{ color: 'green', '&.Mui-checked': { color: 'green' } }}
                                                    />
                                                }
                                                label="Male"
                                            />
                                            <FormControlLabel
                                                value="female"
                                                control={
                                                    <Radio
                                                        disabled
                                                        sx={{ color: 'green', '&.Mui-checked': { color: 'green' } }}
                                                    />
                                                }
                                                label="Female"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>


                        <Grid item xs={12} md={12}>
                            <Box display="flex" justifyContent="center" className="mt-4">
                                <Button variant="contained" color="success" type="submit">
                                    Update Profile
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
}

export default Profile;
