import React from 'react';
import {
  Box,
  Button,
  Grid,
  Typography,
  Paper,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { loginApi } from '../services/allApi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import TextBox from '../components/FormElements/TextBox';

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ mode: 'onChange' });

  const onSubmit = async (data) => {
    try {
      const result = await loginApi(data);
      if (result.status === 200) {
        sessionStorage.setItem('existinguser', JSON.stringify(result.data.user));
        sessionStorage.setItem('token', result.data.token);
        reset();
        setTimeout(() => {
          navigate('/account');
        }, 1000);
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
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={11} sm={10} md={8} lg={6}>
          <Typography
            variant="h5"
            color="goldenrod"
            fontWeight="semi-bold"
            gutterBottom
            textAlign="center"
            marginBottom={4}
          >
            Login to Your Account
          </Typography>
          <Paper
            elevation={2}
            sx={{
              p: 6,
              minHeight: '450px',
              borderRadius: '',
              backgroundColor: '#ffffff',
            }}
          >

            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <TextBox
                  label="Email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Enter a valid email',
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <TextBox
                  label="Password"
                  type="password"
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleCancel}
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
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={isSubmitting}
                      sx={{
                        backgroundColor: 'goldenrod',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: '#daa520',
                        },
                      }}
                    >
                      {isSubmitting ? 'Loading...' : 'Login'}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>


              <Grid item xs={12}>
                <Typography textAlign="left" color="gray">
                  New user?{' '}
                  <Link to="/register" style={{ color: 'orange', textDecoration: 'none' }}>
                    Register
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </form>
  );
}

export default Login;
