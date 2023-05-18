import * as React from 'react';
import axios from 'axios';
import logo from '../assets/logo.png'
import '../App.css';
import {Link,useNavigate} from 'react-router-dom';

//import local/external packages...
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

//React-icons fontawesome...
import { FaUserTie,FaRegSun,FaAngleDoubleLeft,FaGithub,FaPlus,FaTrash,FaRegEdit,FaRegEye,FaUsers,FaThLarge } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
import { purple } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import { BsPencilSquare,BsGearFill,BsBrushFill } from "react-icons/bs";

//REACT-BOOTSTRAP RESPONSIVE...
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Footer from '../Footer';



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





function AddEmployee() {

    const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});



    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
      }));


    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
      })(({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
      }));


    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
          width: drawerWidth,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          boxSizing: 'border-box',
          ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
          }),
          ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
          }),
        }),
      );
      

    //--------------------------------

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };


//-----------Avatar-----
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
      float:"right",
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));


const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));


//------LIST ITEMS BODY CARD----
const style = {
  width: '80%',
  bgcolor: 'background.paper',
  marginTop:5,
  margin:'auto',
};


//--------------LOGOUT----------

const [anchorEl, setAnchorEl] = React.useState(null);
const open1 = Boolean(anchorEl);
const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};
const handleClose = () => {
  setAnchorEl(null);
};


//POST ADD NEW EMployees..
const [emp,setEmp] = React.useState({
    Eid:'',
    Ename:'',
    department:'',
    email:'',
    date:''
})


const changeHandler = e =>{
    setEmp({...emp,[e.target.name]:e.target.value});
}



const submitHandler = async(e)  =>{
    e.preventDefault();


                        //Validation Section...
    var {Eid,Ename,department,email,date} = emp;

    var validateEmail = /^[A-Z0-9._%+-]+@+\gmail+\.[com]{2,4}$/i;
    var validateEid = /^\YK+[0-9]{4}$/i;
    var validateEname = /^[A-Za-z ]{0,20}$/i;
    var validateDepartment = /^[A-Za-z ]{0,20}$/i;

    if(!validateEmail.test(email)){
        toast.error("Please Enter Valid Email.")
    }
    else if(!validateEid.test(Eid)){
        toast.error("Please Enter Valid Eid.(ex:YK0045)")
    }
    else if(!validateEname.test(Ename)){
        toast.error("Please Enter Valid Ename (max:15 chars)")
    }
    else if(!validateDepartment.test(department)){
        toast.error("Please Enter Valid Department (max:15 chars)")
    }

    else{


      let body = JSON.stringify({
        employeeId:Eid,
        employeeName:Ename,
        employeeDept:department,
        employeeEmail:email,
        employeeDate:date
      })
      

      let response = await axios.post('http://localhost:8000/employees/register',body,{
        headers:{
          'Content-Type':'application/json',
          'x-token':localStorage.getItem('token')
        }
      }).then(res=>toast.success(res.data)).catch(err=>toast.error(err.response.data))

    }









//RESET (or) CLEAR VALUES...

    setEmp({
      Eid:document.getElementById('EID').value = '',
      Ename:document.getElementById('ENAME').value = '',
      department:document.getElementById('EDEPT').value = '',
      email:document.getElementById('EEMAIL').value = '',
      date:document.getElementById('EDATE').value = ''
  })

}


      //LOGOUT...

      const logoutAdmin = e =>{
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('eid');
        localStorage.removeItem('ename');
        localStorage.removeItem('edept');
        localStorage.removeItem('eemail');
        localStorage.removeItem('edate');
  
        window.location.reload();
    }








  return (
      <>
        <div>
            <Toaster
            position="top-right"
            reverseOrder={false}/>


{/*------RESPONSIVE START-------*/}

<Navbar collapseOnSelect expand="lg" bg="light" variant="light" className='navbar'>
      <Container>
        <Navbar.Brand href="#home"><img src={logo} alt="logo" className='res_logo'/></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Employees</Nav.Link>
            <Nav.Link href="#projects">Projects</Nav.Link>
            <Nav.Link href="#clients">Clients</Nav.Link>
            <Nav.Link href="#reports">Reports</Nav.Link>
            <Nav.Link href="#events">Events</Nav.Link>
            <Nav.Link href="#settings">Settings</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">Git Account</Nav.Link>
            <NavDropdown title="Account" id="collasible-nav-dropdown" style={{width:"150px"}}>
              <NavDropdown.Item href="#action/3.1">My Account</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4" onClick={logoutAdmin}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>



                                  {/*-------RESPONSIVE END---------*/}










        <Box sx={{ display: 'flex' }}>

        <AppBar position="fixed" open={open} className="header">
            <Toolbar>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                      marginRight: 5,
                      ...(open && { display: 'none' }),
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                      <img src={logo} alt="logo" className='logo'/>


                      <FaGithub style={{height:"40px",width:"40px",margin:"0px 25px 0px 75%",color:"#0d6efd",border:"1px solid #E0E0E0",padding:"5px",borderRadius:"8px"}} className="git"/>

                     {/*-----AVATAR----*/}
              
                          <Stack direction="row" spacing={2} className='avatar'>
                            <StyledBadge
                              overlap="circular"
                              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                              variant="dot"
                              
                              
                            >

                              {/*----LOGOUT------*/}
                              <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center',position:'relative' }}>
        
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >


                              <Avatar alt="Mahesh Babu" src="https://mbtechno.onrender.com/assets/img/person1.jpg" />


                              </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open1}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              float:'right',
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={logoutAdmin}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

                              {/*----LOGOUT--END----*/}

                            </StyledBadge>
                          </Stack>

                {/*----------------------*/}


            </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open} className="sidebar">          
            <DrawerHeader style={{background:"#F5F5F5",border:"1px solid #F0F0F0",boxShadow:"inset 2px 1px 8px #F0F0F0"}}>
            <span style={{marginRight:"5px",color:"grey"}}> MANAGEMENT SYSTEM </span>
            <hr/>
            <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <FaAngleDoubleLeft />}
            </IconButton>
            </DrawerHeader>
           
            <List>
            {['Employees', 'Projects','Clients', 'Reports', 'Events','Settings'].map((text, index) => (
                <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                    sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    }}
                >
                    <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                    }}
                    >
                    {index % 2 === 0 ? <FaUsers style={{height:"22px",width:"22px"}}/> : <FaThLarge style={{height:"22px",width:"22px"}}/>}
                    </ListItemIcon>
                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }}/>
                </ListItemButton>
                </ListItem>
            ))}
            </List>
        </Drawer>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }} className='addEmp'>
            
              <div>
                           <h2 style={{fontWeight:'Poppins, sans-serif',marginLeft:'50px',float: 'left'}}>Add Employee</h2>

                           <Stack spacing={2} direction="row">
                                <BootstrapButton variant="contained" disableRipple style={{background:'#8ED6FF',border:'1px solid #B5F1CC'}} className='viewEmp'>
                                     <Link to='/dashboard' style={{textDecoration:'none',color:'aliceblue'}}> <FaRegEye style={{color:'grey',height:'20px',width:'20px'}}/> &nbsp; View Employees  </Link>
                                </BootstrapButton>
                            </Stack>

<br/>

                <TextField
                  label="Enter Employee ID"
                  // id="outlined-start-adornment"
                  id='EID'
                  sx={{ ml: 6, width: '250px',mt:4}}
                  type='text'
                  name='Eid'
                  autoComplete='off'
                  onChange={changeHandler}
                  required
                />
                                           
                                            <TextField
                  label="Enter Employee Name"
                  // id="outlined-start-adornment"
                  id="ENAME"
                  sx={{ ml: 6, width: '250px',mt:4}}
                  type='text'
                  name='Ename'
                  autoComplete='off'
                  onChange={changeHandler}
                  required
                />
                                            <br/>
                                            <TextField
                  label="Enter Department"
                  // id="outlined-start-adornment"
                  id="EDEPT"
                  sx={{ ml: 6, width: '250px',mt:4}}
                  type='text'
                  name='department'
                  autoComplete='off'
                  onChange={changeHandler}
                  required
                />
                                            
                                            <TextField
                  label="Enter Employee Email"
                  // id="outlined-start-adornment"
                  id="EEMAIL"
                  sx={{ ml: 6, width: '250px',mt:4}}
                  type='email'
                  name='email'
                  autoComplete='off'
                  onChange={changeHandler}
                  required
                />
                                            <br/>
                        <TextField
                  // label="Employee Hire Date"
                  // id="outlined-start-adornment"
                  id="EDATE"
                  sx={{ ml: 6, width: '250px',mt:4,mb:4}}
                  type='date'
                  name='date'
                  autoComplete='off'
                  onChange={changeHandler}
                  required
                />

                                            
                                            
                


                <Stack spacing={2} direction="row">
                    <BootstrapButton variant="contained" disableRipple style={{fontSize:'15px',marginLeft:'230px'}} onClick={submitHandler}>   
                       <FaUserTie style={{marginTop:'-2px',height:'18px',width:'18px'}}/> &nbsp;&nbsp; Add Employee
                    </BootstrapButton>
                </Stack>





              </div>
            
            </Box>
        </Box>
      </div>
<br/><br/><br/>
    <Footer/>

      </>
  );
}

export default AddEmployee;