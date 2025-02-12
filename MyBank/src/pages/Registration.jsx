import { Button, TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React, { useState } from 'react';
import dayjs from "dayjs";
import { registerApi } from '../services/allApi';

function Registration() {
    // Create state for user details
    const [userDetails, setUserDetails] = useState({
        fname: '',
        lname: '',
        gender: "male",  // ✅ Updates when user selects a radio button
        dateOfBirth: '',
        phonenum: ''
    });
    console.log(userDetails);
    
    const handleRegister = async()=>{
     const {fname,lname,dateOfBirth,phonenum} = userDetails //destructuring
      
     if(!fname || !lname || !dateOfBirth || !phonenum){
        alert("Please fill the fields completely");
     }
     else{
        const response =await registerApi(userDetails);
        console.log(response);
        }

     
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center reghead mb-4" style={{ color: "rgb(106, 47, 106)" }}>
                Registration Form
            </h1>
            <div className="row maindiv2">

                <div className='col-md-2'></div>
                <div className="col-md-8">
                    <img
                        src="https://img.freepik.com/free-vector/global-stock-market-concept-illustration_114360-19030.jpg?t=st=1738483788~exp=1738487388~hmac=6c6f2a614cc4d4e13f3295c0fc20c42ac2f0294d4a88fde5071752092625783e&w=740"
                        alt="Registration"
                        className='imgdiv'
                    />
                </div>

                <div className="col-md-4" style={{ width: "100%" }}>
                    <div className="bg-light p-4 rounded" style={{ width: "100%" }}>
                        <form className="mt-3">
                            <div className="mb-3" style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                                <TextField id="first-name" label="First Name" name="firstName" variant="outlined" fullWidth onChange={(e) => setUserDetails({ ...userDetails, fname: e.target.value })} />
                                <TextField id="last-name" label="Last Name" name="lastName" variant="outlined" fullWidth onChange={(e) => setUserDetails({ ...userDetails, lname: e.target.value })} />
                            </div>

                            <div className="mb-3" style={{ marginBottom: "10px", display: "flex" }}>
                                <div style={{ marginRight: "50px" }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="DoB"
                                            value={userDetails.dateOfBirth ? dayjs(userDetails.dateOfBirth) : null} // ✅ Convert back to Day.js for UI
                                            onChange={(newValue) =>
                                                setUserDetails({
                                                    ...userDetails,
                                                    dateOfBirth: newValue ? newValue.format("YYYY-MM-DD") : "", // ✅ Store as string
                                                })
                                            }
                                        />
                                    </LocalizationProvider>
                                    <p style={{ display: "none" }}>Selected Date: {userDetails.dateOfBirth || "None"}</p>
                                </div>

                                <div>
                                    <RadioGroup
                                        row
                                        name="gender"
                                        value={userDetails.gender} // ✅ Ensures the selected value is shown
                                        onChange={(e) => setUserDetails({ ...userDetails, gender: e.target.value })} // ✅ Updates state on change
                                    >
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    </RadioGroup>
                                </div>
                            </div>

                            <div className="mb-3" style={{ marginBottom: "10px" }}>
                                <TextField id="phone" label="Phone Number" name="phone" variant="outlined" fullWidth onChange={(e) => setUserDetails({ ...userDetails, phonenum: e.target.value })} />
                            </div>

                            <div style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between", gap: "10px" }}>
                                <Button variant="contained" color="info" style={{ flex: 1, height: "50px" }}>
                                    CANCEL
                                </Button>
                                <Button variant="contained" color="success" style={{ flex: 1, height: "50px" }} onClick={handleRegister}>
                                    SAVE
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='col-md-2'></div>
            </div>
        </div>
    );
}

export default Registration;
