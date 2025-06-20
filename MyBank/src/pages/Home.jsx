import React from 'react';
import {
  Grid,
  TextField,
  MenuItem,
  Button,
  Typography,
  Box,
  Switch,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useForm, Controller } from 'react-hook-form';
import { registerApi } from '../services/allApi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import TextBox from '../components/FormElements/TextBox';

function Home() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({ mode: 'onChange' });

  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      const result = await registerApi(data);
      if (result.status === 200) {
        toast.success(result.data.message);
        reset();
        navigate('/login');
      } else {
        toast.error(`Error: ${result.response.data.message}`);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ p: 4, backgroundColor: '#fff' }}>
        <Grid container spacing={4} alignItems="center">
          {/* Sidebar */}
          <Grid item xs={12} md={3}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} className="bg-gray-100 p-6">
              <Typography variant="h6" color="goldenrod" fontWeight="bold">
                Account Opening Form
              </Typography>
              {['Basic Details', 'Permanent Address'].map((label, i) => (
                <Button
                  key={i}
                  variant="outlined"
                  fullWidth
                  sx={{
                    backgroundColor: 'goldenrod',
                    color: 'white',
                    borderColor: 'goldenrod',
                    '&:hover': {
                      backgroundColor: '#daa520',
                    },
                  }}
                >
                  {label}
                </Button>
              ))}
            </Box>
          </Grid>

          {/* Main Form */}
          <Grid item xs={12} md={9}>
            {/* Basic Details */}
            <Typography variant="h6" color="goldenrod" fontWeight="bold" gutterBottom>
              Basic Details
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextBox
                  label="First Name"
                  {...register('fname', { required: 'First Name is required' })}
                  error={!!errors.fname}
                  helperText={errors.fname?.message}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextBox
                  label="Last Name"
                  {...register('lname', { required: 'Last Name is required' })}
                  error={!!errors.lname}
                  helperText={errors.lname?.message}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextBox
                  label="Account Category"
                  select
                  defaultValue=""
                  {...register('accountCategory', { required: 'Account Category is required' })}
                  error={!!errors.accountCategory}
                  helperText={errors.accountCategory?.message}
                >
                  <MenuItem value="Saving">Saving</MenuItem>
                  <MenuItem value="Current">Current</MenuItem>
                </TextBox>
              </Grid>

              <Grid item xs={12} md={4}>
                <TextBox
                  label="Account Currency"
                  select
                  defaultValue=""
                  {...register('accountCurrency', { required: 'Account Currency is required' })}
                  error={!!errors.accountCurrency}
                  helperText={errors.accountCurrency?.message}
                >
                  <MenuItem value="INR">INR</MenuItem>
                  <MenuItem value="USD">USD</MenuItem>
                </TextBox>
              </Grid>

              <Grid item xs={12} md={4}>
                <TextBox
                  label="Purpose of A/C"
                  select
                  defaultValue=""
                  {...register('accountPurpose', { required: 'Purpose is required' })}
                  error={!!errors.accountPurpose}
                  helperText={errors.accountPurpose?.message}
                >
                  <MenuItem value="Personal">Personal</MenuItem>
                  <MenuItem value="Business">Business</MenuItem>
                </TextBox>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextBox
                  label="Email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Enter a valid email address',
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextBox
                  label="Phone Number"
                  {...register('phonenum', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^\d{10}$/,
                      message: 'Enter a valid 10-digit phone number',
                    },
                  })}
                  error={!!errors.phonenum}
                  helperText={errors.phonenum?.message}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name="dateOfBirth"
                    control={control}
                    rules={{ required: 'Date of Birth is required' }}
                    render={({ field }) => (
                      <DatePicker
                        label="DoB"
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(newValue) =>
                          field.onChange(newValue ? newValue.format('YYYY-MM-DD') : '')
                        }
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            size: 'small',
                            error: !!errors.dateOfBirth,
                            helperText: errors.dateOfBirth?.message,
                          },
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl component="fieldset" error={!!errors.gender} fullWidth>
                  <Controller
                    name="gender"
                    control={control}
                    rules={{ required: 'Gender is required' }}
                    render={({ field }) => (
                      <RadioGroup row {...field}>
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                      </RadioGroup>
                    )}
                  />
                  {errors.gender && <FormHelperText>{errors.gender.message}</FormHelperText>}
                </FormControl>
              </Grid>
            </Grid>

            {/* Permanent Address */}
            <Typography variant="h6" color="goldenrod" fontWeight="bold" sx={{ mt: 4 }}>
              Permanent Address
            </Typography>
            <Grid container spacing={2}>
              {/* Country */}
              <Grid item xs={12} md={4}>
                <TextBox
                  label="Country"
                  select
                  defaultValue=""
                  {...register('country', { required: 'Country is required' })}
                  error={!!errors.country}
                  helperText={errors.country?.message}
                >
                  <MenuItem value="India">India</MenuItem>
                </TextBox>
              </Grid>

              {/* Province */}
              <Grid item xs={12} md={4}>
                <TextBox
                  label="Province"
                  {...register('province', { required: 'Province is required' })}
                  error={!!errors.province}
                  helperText={errors.province?.message}
                />
              </Grid>

              {/* District */}
              <Grid item xs={12} md={4}>
                <TextBox
                  label="District"
                  {...register('district', { required: 'District is required' })}
                  error={!!errors.district}
                  helperText={errors.district?.message}
                />
              </Grid>

              {/* Street */}
              <Grid item xs={12} md={4}>
                <TextBox
                  label="Street"
                  {...register('street', { required: 'Street is required' })}
                  error={!!errors.street}
                  helperText={errors.street?.message}
                />
              </Grid>

              {/* House No. */}
              <Grid item xs={12} md={4}>
                <TextBox
                  label="House No."
                  {...register('houseNo', { required: 'House No. is required' })}
                  error={!!errors.houseNo}
                  helperText={errors.houseNo?.message}
                />
              </Grid>

              {/* Ward No. */}
              <Grid item xs={12} md={4}>
                <TextBox
                  label="Ward No."
                  {...register('wardNo', { required: 'Ward No. is required' })}
                  error={!!errors.wardNo}
                  helperText={errors.wardNo?.message}
                />
              </Grid>

              {/* Pincode */}
              <Grid item xs={12} md={4}>
                <TextBox
                  label="Pincode"
                  {...register('pincode', { required: 'Pincode is required' })}
                  error={!!errors.pincode}
                  helperText={errors.pincode?.message}
                />
              </Grid>

              {/* Email */}
              <Grid item xs={12} md={4}>
                <TextBox
                  label="Email"
                  {...register('permEmail', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Enter a valid email address',
                    },
                  })}
                  error={!!errors.permEmail}
                  helperText={errors.permEmail?.message}
                />
              </Grid>

              {/* Phone */}
              <Grid item xs={12} md={4}>
                <TextBox
                  label="Phone"
                  {...register('permPhone', {
                    required: 'Phone is required',
                    pattern: {
                      value: /^\d{10}$/,
                      message: 'Enter a valid 10-digit phone number',
                    },
                  })}
                  error={!!errors.permPhone}
                  helperText={errors.permPhone?.message}
                />
              </Grid>
            </Grid>


            {/* Passwords */}
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} md={6}>
                <TextBox
                  label="Password"
                  type="password"
                  {...register('password', {
                    required: 'Password is required',
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*])[A-Za-z\d@#$%^&*]{8,}$/,
                      message:
                        'Include at least one uppercase, lowercase, digit, and special character',
                    },
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextBox
                  label="Confirm Password"
                  type="password"
                  {...register('confirmpassword', {
                    required: 'Confirm password is required',
                    validate: (value) =>
                      value === password || 'Passwords do not match',
                  })}
                  error={!!errors.confirmpassword}
                  helperText={errors.confirmpassword?.message}
                />
              </Grid>
            </Grid>

            {/* Buttons */}
            <Box mt={4} display="flex" gap={2}>
              <Button variant="contained" onClick={handleCancel} fullWidth
                sx={{
                  backgroundColor: 'white',
                  color: 'gray',
                  '&:hover': {
                    backgroundColor: 'gray',
                    color: 'white',
                  },
                }}
              >
                Clear
              </Button>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isSubmitting}
                sx={{
                  backgroundColor: 'goldenrod',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#daa520',
                  },
                }}
              >
                {isSubmitting ? 'Loading...' : 'Submit'}
              </Button>
            </Box>

            <Typography sx={{ mt: 3 }} color="gray">
              Already have an account?{' '}
              <Link to="/login" style={{ color: 'orange' }}>
                Login
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}

export default Home;
