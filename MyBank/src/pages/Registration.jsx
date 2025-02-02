import { Button, TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React from 'react';


function Registration() {
    return (
        <div className="container mt-5">
            <h1 className="text-center reghead  mb-4" style={{ color: "rgb(106, 47, 106)" }}>
                Registration Form
            </h1>
            <div className="row maindiv2  ">

                <div className='col-md-2'></div>
                <div className="col-md-8    ">

                    <img
                        src="https://img.freepik.com/free-vector/global-stock-market-concept-illustration_114360-19030.jpg?t=st=1738483788~exp=1738487388~hmac=6c6f2a614cc4d4e13f3295c0fc20c42ac2f0294d4a88fde5071752092625783e&w=740"
                        alt="Registration"
                        className='imgdiv'
                    />
                </div>

                <div className="col-md-4 "
                    style={{ width: "100%" }}
                >
                    <div className="bg-light p-4 rounded " style={{ width: "100%" }}>
                        <form className="mt-3">
                            <div className="mb-3" style={{ display: "flex", marginBottom: "10px", }}>
                                <TextField id="text" label="First Name" name="name" variant="outlined" fullWidth />
                                <TextField id="name" label="Last Name" name="name" variant="outlined" fullWidth />


                            </div>
                            <div className="mb-3" style={{ marginBottom: "10px", display: "flex" }}>
                                <div style={{ marginRight: "50px" }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker label="DoB" />
                                    </LocalizationProvider>
                                </div>



                                <div>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-form-control-label-placement"
                                        name="position"
                                        defaultValue="top"
                                    >

                                        <FormControlLabel
                                            value="men"
                                            control={<Radio />} en
                                            label="Men"
                                            labelPlacement="end"
                                        />                                    
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />

                                    </RadioGroup>
                                </div>

                            </div>
                            <div className="mb-3" style={{ marginBottom: "10px" }}>
                                <TextField id="phone" label="Phone Number" name="phone" variant="outlined" fullWidth />
                            </div>
                            <div className="mb-3" style={{ marginBottom: "10px" }}>
                                <TextField id="account" label="Account Number" name="account" variant="outlined" fullWidth />
                            </div>

                            <div style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
                                <Button variant="contained" color="info" style={{ flex: 1, height: "50px" }}>
                                    CANCEL
                                </Button>
                                <Button variant="contained" color="success" style={{ flex: 1, height: "50px" }}>
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
