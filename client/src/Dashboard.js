import * as React from 'react';
import axios from 'axios';
import logo from './assets/logo.png'
import './App.css';
import {Link, Navigate, useNavigate} from 'react-router-dom'

//import local/external packages...
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

//React-icons fontawesome...
import { FaUserTie,FaRegSun,FaAngleDoubleLeft,FaGithub,FaPlus,FaTrash,FaRegEdit,FaUsers,FaThLarge,FaSlideshare,FaCalendarAlt } from "react-icons/fa";
import { BsPencilSquare,BsGearFill,BsBrushFill } from "react-icons/bs";
import toast, { Toaster } from 'react-hot-toast';

//REACT-BOOTSTRAP RESPONSIVE...
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Footer from './Footer';





function Dashboard() {

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



//-------------------

const [emp,setEmp] = React.useState([]);
const navigate = useNavigate();



//GET OR LIST ALL EMPLOYEES...

const getEmployees = e =>{

  axios.get('http://localhost:8000/employees/list',{
    headers:{
      'x-token':localStorage.getItem('token')
    }
  }).then(
    res=>setEmp(res.data)
  ).catch(err=>toast.error(err.response.data))

}

console.log(emp)


React.useEffect(()=>{

    getEmployees();


    if(!localStorage.getItem('token')){
      return navigate('/')
    }

},[])


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


  //DELETE EMPLOYEE...

  const deleteEmp = async(id) =>{

      if(window.confirm("Are you sure you want to delete?")){
        let delEmp = await axios.delete(`http://localhost:8000/employees/delete/${id}`,{
          headers:{
            'x-token':localStorage.getItem('token'),
            'Content-Type':'application/json'
          }
        }).then(res=>toast.success(res.data)).catch(err=>toast.error(err.response.data))
      }
      getEmployees();
      return false;

  }




  //EDIT OR UPDATE EMPLOYEE...

  const updateEmp = async(id,empId,empName,empDept,empEmail,empDate) =>{

    let a=  localStorage.setItem('id',id)
    let b=  localStorage.setItem('eid',empId)
    let c=  localStorage.setItem('ename',empName)
    let d=  localStorage.setItem('edept',empDept)
    let e=  localStorage.setItem('eemail',empEmail)
    let f=  localStorage.setItem('edate',empDate)



}


// ['Employees', 'Projects','Clients', 'Reports', 'Events','Settings']
const [sdata,setSdata] = React.useState([
  {
    id:'Employees',
    name:'Employees',
    path:'/employees',
    icon:'icon1'
  },
  {
    id:'Projects',
    name:'Projects',
    path:'/projects',
    icon:'icon12'
  },
  {
    id:'Clients',
    name:'Clients',
    path:'/clients',
    icon:'icon3'
  },
  {
    id:'Reports',
    name:'Reports',
    path:'/reports',
    icon:'icon4'
  },
  {
    id:'Events',
    name:'Events',
    path:'/events',
    icon:'icon5'
  },
  {
    id:'Settings',
    name:'Settings',
    path:'/settings',
    icon:'icon6'
  }
])

// console.log(sdata,'sdata');   


//THEME COLORS...


const changeColor = e =>{

  var colors = ['#FFEAD2','#B6E2A1','#C9E4C5','#C0DBEA','#FFD3B0','#FDF7C3'];

    let x= Math.floor(Math.random(colors)*colors.length);
    document.getElementById('body').style.backgroundColor= colors[x];

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



        <Box sx={{ display: 'flex' }} id='body'>


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
                    <MenuIcon className='menuIcon'/>




                  </IconButton>
                      <img src={logo} alt="logo" className='logo'/>


                      <FaGithub style={{height:"40px",width:"40px",margin:"0px 25px 0px 75%",color:"#0d6efd",border:"1px solid #E0E0E0",padding:"5px",borderRadius:"8px"}} className="git"/>
<BsBrushFill style={{height:"30px",width:"30px"}} class='bgcolor' onClick={changeColor} title='Change Theme'/>
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
            <Logout fontSize="small"/>
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
                        { index % 2 == 0 ? <FaUsers style={{height:"22px",width:"22px"}}/> : <FaThLarge style={{height:"22px",width:"22px"}}/> }
                    </ListItemIcon>
                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }}/>
                </ListItemButton>
                </ListItem>
            ))}
            </List>





       







        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <Typography paragraph>
                      <Card class='card'>
                          <CardContent>

                            <Typography variant="h5" component="div" style={{marginLeft:'60px',marginBottom:'20px',color:'grey'}}>
                                 Employees    
    
                                        <Link to='/dashboard/addemployee'> <FaPlus class='plus' title='Add Employee'/> </Link>

                            </Typography>

                            <Typography variant="body2">
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                          <TableHead>
                                            <TableRow>
                                              <TableCell align='center' width='50px'  style={{fontFamily:'Poppins, sans-serif',color:'gray'}}> &nbsp;&nbsp;ID </TableCell>
                                              <TableCell align='center' width='100px'  style={{fontFamily:'Poppins, sans-serif',color:'gray'}}> &nbsp;Employee Name </TableCell>
                                              <TableCell align='center' width='50px'  style={{fontFamily:'Poppins, sans-serif',color:'gray'}}> Department &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TableCell>
                                              <TableCell align='center' width='20px'  style={{fontFamily:'Poppins, sans-serif',color:'gray'}}> Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TableCell>
                                              <TableCell align='center' width='80px'  style={{fontFamily:'Poppins, sans-serif',color:'gray'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Hire Date </TableCell>
                                              <TableCell align='center' width='80px'  style={{fontFamily:'Poppins, sans-serif',color:'gray'}}> Actions </TableCell>
                                            </TableRow>
                                          </TableHead>
                                          </Table>
                                </TableContainer>


                                                        {/*----LIST OF ITEMS-----*/}
                                            <table class='table'>
                                              <tbody>
                                                {emp.map(list=>
                                                <>
                                                <tr>
                                                  <td style={{width:'50px',height:'45px'}}  key={list._id}> {list.employeeId} </td>
                                                  <td style={{width:'100px'}}> {list.employeeName} </td>
                                                  <td style={{width:'60px'}}> {list.employeeDept} </td>
                                                  <td style={{width:'100px'}}> {list.employeeEmail} </td>
                                                  <td style={{width:'60px',background:'blue'}}> {list.employeeDate} </td>
                                                  <td style={{width:'80px'}}><Link to='/dashboard/editemployee'><FaRegEdit class='edit' title="Edit" onClick={(e)=>updateEmp(list._id,list.employeeId,list.employeeName,list.employeeDept,list.employeeEmail,list.employeeDate)}/></Link>        <FaTrash class='delete' title="Delete" onClick={(e)=>deleteEmp(list._id)}/></td>
                                          
                                                </tr>
                                                </>)}


                                              </tbody>
                                            </table>
                                          
                                           

                                   
                                    <br/>
                            </Typography>
                          </CardContent>
                      </Card>
            </Typography>
        </Box>
        </Box>
                                  

      </div>

      <Footer/>


      </>
  );
}

export default Dashboard;