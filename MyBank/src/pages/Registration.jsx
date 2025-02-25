import { Button, TextField, Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React from 'react';
import dayjs from "dayjs";
import { useForm, Controller } from 'react-hook-form';
import { registerApi } from '../services/allApi';

function Registration() {
    const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = async (data) => {
        console.log(data);

        try {
            const result = await registerApi(data);
            if (result.status === 200) {
                alert(result.data.message);
            } else {
                alert(`Error: ${result.response.data.message}`);
            }
        } catch (error) {
            alert("An error occurred while submitting.");
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center reghead mb-4" style={{ color: "rgb(106, 47, 106)" }}>
                Registration Form
            </h1>
            <div className="row maindiv2">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <img
                        src="https://img.freepik.com/free-vector/global-stock-market-concept-illustration_114360-19030.jpg?t=st=1738483788~exp=1738487388~hmac=6c6f2a614cc4d4e13f3295c0fc20c42ac2f0294d4a88fde5071752092625783e&w=740"
                        alt="Registration"
                        className='imgdiv'
                    />
                </div>

                <div className="col-md-4" style={{ width: "100%" }}>
                    <div className="bg-light p-4 rounded" style={{ width: "100%" }}>
                        <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3" style={{ display: "flex", gap: "10px" ,marginBottom: "10px"}}>
                                <div style={{ flex: 1 }}>
                                    <TextField
                                        label="First Name"
                                        variant="outlined"
                                        fullWidth
                                        {...register('fname', { required: "First Name is required" })}
                                        error={!!errors.fname}
                                        helperText={errors.fname?.message}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <TextField
                                        label="Last Name"
                                        variant="outlined"
                                        fullWidth
                                        {...register('lname', { required: "Last Name is required" })}
                                        error={!!errors.lname}
                                        helperText={errors.lname?.message}
                                    />
                                </div>
                            </div>

                            <div className="mb-3" style={{ display: "flex",marginBottom: "10px" }}>
                                <div style={{ marginRight: "50px" }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <Controller
                                            name="dateOfBirth"
                                            control={control}
                                            rules={{
                                                required: "Date of Birth is required",
                                                // validate: value => {
                                                //   const dateOfBirth = dayjs().diff(dayjs(value), 'year');
                                                //   return dateOfBirth >= 18 || "You must be 18+ to register";
                                                // }
                                            }}
                                            render={({ field }) => (
                                                <DatePicker
                                                    label="DoB"
                                                    value={field.value ? dayjs(field.value) : null}
                                                    onChange={(newValue) => field.onChange(newValue ? newValue.format("YYYY-MM-DD") : "")}
                                                    slotProps={{ textField: { error: !!errors.dateOfBirth, helperText: errors.dateOfBirth?.message } }}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div>
                                    <Controller
                                        name="gender"
                                        control={control}
                                        rules={{ required: "Gender is required" }}
                                        render={({ field }) => (
                                            <RadioGroup row {...field}>
                                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                            </RadioGroup>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="mb-3" style={{ marginBottom: "10px" }}>
                                <TextField
                                    label="Phone Number"
                                    variant="outlined"
                                    fullWidth
                                    {...register('phonenum', {
                                        required: "Phone Number is required",
                                        pattern: { value: /^\d{10}$/, message: "Enter a valid 10-digit phone number" }
                                    })}
                                    error={!!errors.phonenum}
                                    helperText={errors.phonenum?.message}
                                />
                            </div>
                            <div style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between", gap: "10px" }}>
                                <Button variant="contained" color="info" style={{ flex: 1, height: "50px" }}>
                                    CANCEL
                                </Button>
                                <Button type="submit" style={{ flex: 1, height: "50px" }} variant="contained" color="success" disabled={isSubmitting}>
                                    {isSubmitting ? 'Loading...' : 'Submit'}
                                </Button>
                            </div>


                        </form>
                    </div>
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>
    );
}

export default Registration;
