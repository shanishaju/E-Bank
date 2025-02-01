import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, Select, TextField } from '@mui/material';

// Define a11yProps function
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

// Create TabPanel component
function TabPanel({ children, value, index }) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function Employee() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <div className='maindiv'>
                <div>
                    
                <Box sx={{ width: '100%' }} className="box">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs example"
                    >
                        <Tab value={0} label="WITHDRAWAL" {...a11yProps(0)} />
                        <Tab value={1} label="DEPOSIT" {...a11yProps(1)} />
                        <Tab value={2} label=" USER-REGISTRATION" {...a11yProps(2)} />
                    </Tabs>
                </Box>

                <TabPanel value={value} index={0}>
                        <div className='bg-light p-5 rounded' style={{ width: '500px' }}>

                            <form className='mt-3  border border-dark '>
                                <div className="mb-3 ">
                                    {/* <p className='text-danger text'>Name</p> */}
                                    <TextField id="outlined-basic" label="Name" name='principle' variant="outlined" className='textfield' />
                                </div>

                                <div className="mb-3 textfield">
                                    {/* <p className='text-danger text'>Account Number</p> */}
                                    <TextField  id="outlined-basic" label="Account Number" name='rate' variant="outlined" className='textfield' />
                                </div>

                                <div className="mb-3 textfield">
                                    {/* <p className='text-danger'>Amount</p> */}
                                    <TextField id="outlined-basic" label="Amount" name='year' variant="outlined" className='textfield' />
                                </div>

                                {/* Buttons with gap */}
                                <div className=' Button d-flex justify-content-between w-100 mt-5' >
                                    <Button variant="contained" color="info" style={{ width: '190px', height: '60px' }}>CANCEL</Button>
                                    <Button variant="contained" color="success" style={{ width: '190px', height: '60px' }}>WITHDRAW</Button>

                                </div>
                            </form>
                    </div>
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <div className='bg-light p-5 rounded' style={{ width: '500px' }}>

                        <form className='mt-3  border border-dark '>
                            <div className="mb-3 textfield">
                                {/* <p className='text-danger text'>Name</p> */}
                                <TextField id="outlined-basic" label="Name" name='principle' variant="outlined" className='textfield' />
                            </div>

                            <div className="mb-3 textfield">
                                {/* <p className='text-danger text'>Account Number</p> */}
                                <TextField classes="TextField" id="outlined-basic" label="Account Number" name='rate' variant="outlined" className='textfield' />
                            </div>

                            <div className="mb-3 textfield">
                                {/* <p className='text-danger'>Amount</p> */}
                                <TextField id="outlined-basic" label="Amount" name='year' variant="outlined" className='textfield' />
                            </div>

                            {/* Buttons with gap */}
                            <div className=' Button d-flex justify-content-between ' style={{ gap: '50px' }}>
                                <Button variant="contained" color="info" style={{ width: '190px', height: '60px' }}>CANCEL</Button>
                                <Button variant="contained" color="success" style={{ width: '190px', height: '60px' }}>DEPOSIT</Button>

                            </div>
                        </form>
                    </div>
                </TabPanel>

                <TabPanel value={value} index={2}>
                        <div className='bg-light p-5 rounded' style={{ width: '500px' }}>

                            <form className='mt-3  border border-dark '>
                                <div className="mb-3 ">
                                    {/* <p className='text-danger text'>Name</p> */}
                                    <TextField id="outlined-basic" label="Name" name='principle' variant="outlined" className='textfield' />
                                </div>
                                <div className="mb-3 textfield">
                                    {/* <p className='text-danger text'>Account Number</p> */}
                                    <TextField classes="TextField" id="outlined-basic" label="Age" name='rate' variant="outlined" className='textfield' />
                                    
                                </div>

                                <div className="mb-3 textfield">
                                    {/* <p className='text-danger text'>Account Number</p> */}
                                    <TextField classes="TextField" id="outlined-basic" label="Phone Number" name='rate' variant="outlined" className='textfield' />
                                </div>

                                <div className="mb-3 textfield">
                                    {/* <p className='text-danger'>Amount</p> */}
                                    <TextField id="outlined-basic" label="Account Number" name='year' variant="outlined" className='textfield' />
                                </div>

                                {/* Buttons with gap */}
                                <div className=' Button d-flex justify-content-between w-100 mt-5' style={{ gap: '50px' }}>
                                    <Button variant="contained" color="info" style={{ width: '190px', height: '60px' }}>CANCEL</Button>
                                    <Button variant="contained" color="success" style={{ width: '190px', height: '60px' }}>SAVE</Button>

                                </div>
                            </form>
                    </div>
                </TabPanel>
                </div>

            </div>
        </>
    );
}

export default Employee;
