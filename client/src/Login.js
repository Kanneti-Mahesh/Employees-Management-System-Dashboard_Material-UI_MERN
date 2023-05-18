import React,{useState,useEffect} from 'react';
import './App.css';
import axios from 'axios';
import {Navigate, useNavigate} from 'react-router-dom';


//import local/external packages...
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';
import toast, { Toaster } from 'react-hot-toast';




function Login() {

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  //-------BUTTONS---

  const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 18,
    padding: '6px 12px',
    border: '1px solid',
    color:'grey',
    lineHeight: 1.5,
    backgroundColor: 'transparent',
    borderColor: 'grey',
    width:'200px',
    height:'50px',
    marginLeft:'140px',
    fontFamily: [
      'Poppins', 'sans-serif',
    ].join(','),
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
      boxShadow: 'none',
      color:'aliceblue',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  });
  
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  }));


  //POST Data...

  const [admin,setAdmin] = useState({
    email:'',
    password:''
  });

  const changeHandler = (e) =>{
    setAdmin({...admin,[e.target.name]:e.target.value});
  }




  const submitHandler = async(e) =>{
    e.preventDefault();


               //Email Validation...
    var validate = /^[A-Z0-9._%+-]+@+\gmail+\.[com]{2,4}$/i;




      if(!validate.test(email)){
        toast.error("Not Valid Email")
      }
      else{
        

      let body = JSON.stringify({
        adminEmail:email,
        adminPassword:password
      })


          let response = await axios.post('http://localhost:8000/admins/login', body,{
            headers:{
              'Content-Type':'application/json'
            }
          }).then(
            res=>{localStorage.setItem('token',res.data.token);window.location.reload()}
        ).catch(err=>toast.error(err.response.data))


}    



          //RESET (or) CLEAR VALUES...
setAdmin({
  email:document.getElementById('outlined-start-adornment').value='',
  password:document.getElementById('outlined-adornment-password').value=''
})

  
  }




  let navigate = useNavigate();

  React.useEffect(()=>{


    if(localStorage.getItem('token')){
      return navigate('/dashboard')
    }

  },[])



  const {email,password} = admin;
  



  return (
    <>
            <Toaster
          position="top-right"
          reverseOrder={false}
        />

        
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }} className='login'>
            
              <div>
                           <h2 style={{fontWeight:'Poppins, sans-serif',marginLeft:'150px'}}>Admin Login</h2>

                <TextField
                  label="Enter Your Email"
                  id="outlined-start-adornment"
                  sx={{ ml: 8, width: '350px',mt:5}}
                  type='email'
                  name='email'
                  autoComplete='off'
                  onChange={changeHandler}
                  required
                />
                                            <br/>
                                            
                <FormControl sx={{ ml: 8, width: '350px',mt:3,mb:5}} variant="outlined" autoComplete='off'>
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    name='password'
                    onChange={changeHandler}
                    required
                  />
                </FormControl>


                <Stack spacing={2} direction="row">
                    <BootstrapButton variant="contained" disableRipple  onClick={submitHandler}>
                        Login
                    </BootstrapButton>
                </Stack>
      
                <hr  style={{marginLeft:"60px",color:'grey'}}/>

                          <span style={{color:'grey',marginLeft:'230px',fontSize:'15px'}}>Or</span>
                          <br/><br/>

                <Stack spacing={2} direction="row">
                    <BootstrapButton variant="contained" disableRipple style={{background:'#B5F1CC',border:'1px solid #B5F1CC'}} className='signup' onClick={()=>toast("This feature is Coming Soon... (for Admins)",{duration: 2500})}>
                        Sign Up
                    </BootstrapButton>
                </Stack>

              </div>
            
            </Box>


      </>
  );
}

export default Login;

