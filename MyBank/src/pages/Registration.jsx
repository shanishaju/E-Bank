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
import image from '../assets/revenue-growth.gif'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner'


function Registration() {
    const navigate =useNavigate()
    const { register, handleSubmit, control, formState: { errors, isSubmitting }, reset, watch  } = useForm({
        mode: "onChange"
    });
     const password = watch('password')

    const onSubmit = async (data) => {
        // console.log(data);

        try {
            const result = await registerApi(data);
            if (result.status === 200) {
                toast.success(result.data.message);
                reset(); 
                navigate('/login')
                 
            } else {
                toast.error(`Error: ${result.response.data.message}`);
            }
        } catch (error) {
           toast.error(error.message);
        }


    };
    const handleCancel = () => {
        reset(); // Reset all form fields
    };

    return (
        <div className="container mainclass" style={{ paddingTop: "40px", height: "100vh" }}>

            <div className="row maindiv2" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="col-md-2"></div>
                <div className="col-md-8"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "20px",
                    }}>
                    <img src={image} alt="" width="50%" />
                    <h2>Your Bank</h2>
                    <p>Your perfect bank partner Your perfect bank partner</p>
                    <button style={{
                        backgroundColor: "white", // Primary color
                        marginTop: "20px",
                        color: "#ff8500",
                        border: "none",
                        padding: "12px 24px",
                        fontSize: "16px",
                        borderRadius: "8px",
                        cursor: "pointer",
                    }
                    }
                    >
                        View More
                    </button>

                    {/* <img
                        src="https://img.freepik.com/free-vector/global-stock-market-concept-illustration_114360-19030.jpg?t=st=1738483788~exp=1738487388~hmac=6c6f2a614cc4d4e13f3295c0fc20c42ac2f0294d4a88fde5071752092625783e&w=740"
                        alt="Registration"
                        className='imgdiv'
                    /> */}
                </div>

                <div className="col-md-4" style={{
                    width: "50%", backgroundColor: "white", borderRadius: "100px 0px 0px 100px", overflow: 'hidden', borderLeft: "6px dotted #284c7e"


                }}>
                    <h1 className="text-center text-3xl text-gray-500 " style={{marginTop:"20px"}}>
                        Register
                    </h1>

                    <div className="bg-light p-4 rounded" style={{ width: "100%", backgroundColor: "white" }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3" style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
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

                            <div className="mb-3" style={{ display: "flex", marginBottom: "10px" }}>
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
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    {...register('email', {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: "Enter a valid email address"
                                        }
                                    })}

                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
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
                            <div className="mb-3" style={{ marginBottom: "10px" }}>
                                <TextField
                                    label="Password"
                                    variant="outlined"
                                    type='password'
                                    fullWidth
                                    {...register('password', {
                                        required: "Password is required",
                                        //regex
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@@#$%^&*()_+])[A-Za-z\d@#$%^&*() _+]{8,}$/,
                                            message: "Password should include at least one uppercase letter, one lowercase letter, one number, and one special character "
                                        }



                                    })}
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                />
                            </div>
                            <div className="mb-3" style={{ marginBottom: "10px" }}>
                                <TextField
                                    label="Confirm Password"
                                    variant="outlined"
                                    type='password'
                                    fullWidth
                                    {...register('confirmpassword', {
                                        required: "Password is required",
                                        validate:(value)=>
                                            value === password || 'Passwords do not match'
                                       



                                    })}
                                    error={!!errors.confirmpassword}
                                    helperText={errors.confirmpassword?.message}
                                />
                            </div>

                            <div style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between", gap: "10px" }}>
                                <Button className='button2' variant="contained" style={{ flex: 1, height: "50px" }} onClick={handleCancel}>
                                    CLEAR
                                </Button>
                                <Button className='button1' type="submit" style={{ flex: 1, height: "50px" }} variant="contained" disabled={isSubmitting}>
                                    {isSubmitting ? 'Loading...' : 'Submit'}
                                </Button>
                            </div>

                            <p className='mt-5' style={{color:"grey"}}>Already have an account, Click here to <Link to={'/login'}> <span style={{color:'orange'}}>Login</span> </Link></p>
                        </form>

                    </div>
                </div>
                <div className="col-md-2"></div>

            </div>

        </div>
    );
}

export default Registration;
