
import React from 'react'
import image from '../assets/revenue-growth.gif'
import { Button, TextField } from '@mui/material'
import { loginApi } from '../services/allApi';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';


function Login() {
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    mode: "onChange"
  });
  const onSubmit = async (data) => {
    try {
      const result = await loginApi(data);
      if (result.status === 200) {
        alert(result.data.message)
        //token storing to session storage
        sessionStorage.setItem("existinguser",JSON.stringify(result.data.user))
        sessionStorage.setItem("token",result.data.token)
        console.log("user",result.data.user);
        console.log('token',result.data.token);
        
   
        reset()
       
        setTimeout(()=>{
          navigate('/account')
         },1000)

      } else {
        alert(`Error: ${result.response.data.message}`)
      }

    }
    catch (error) {
      alert(error.message)

    }
  }

  const handleCancel = () => {
    reset(); // Reset all form fields
  };

  return (
    <>
      <div className="container mainclass mt-5" style={{ paddingTop: "100px", height: "100vh" }}>
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


          </div>

          <div className="col-md-4" style={{
            width: "50%", backgroundColor: "white", borderRadius: "100px 0px 0px 100px", overflow: 'hidden', borderLeft: "6px dotted #284c7e"


          }}>
            <h1 className="text-center reghead mb-4" style={{ color: "grey", marginTop: "20px" }}>
              Login Form
            </h1>

            <div className="bg-light p-4 rounded" style={{ width: "100%", backgroundColor: "white" }}>
              <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3" style={{ display: "flex", marginBottom: "10px" }}>
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
                    label="Password"
                    variant="outlined"
                    type='password'
                    fullWidth

                    {...register('password', {
                      required: "Password is required",
                      //regex
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*()_+])[A-Za-z\d@#$%^&*()_+]{8,}$/,
                        message: "Password should include at least one uppercase letter, one lowercase letter, one number, and one special character "
                      }



                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                </div>
                <div style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between", gap: "10px" }}>
                  <Button className='button2' variant="contained" style={{ flex: 1, height: "50px" }} onClick={handleCancel} >
                    CANCEL
                  </Button>
                  <Button className='button1' type="submit" style={{ flex: 1, height: "50px" }} variant="contained">
                    Login
                  </Button>
                </div>
                <p className='mt-5' style={{ color: "grey" }}>New user? Click here to  <Link to={'/register'}> <span style={{ color: 'orange' }}>Register</span> </Link></p>

              </form>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>


    </>
  )
}

export default Login

