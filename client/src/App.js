import React from 'react'
import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';

//import local/external packages...
import Dashboard from './Dashboard';
import Login from './Login';
import AddEmployee from './Employees/AddEmployee';
import EditEmployee from './Employees/EditEmployee';



function App() {
  return (
      <div>
        {/* <BrowserRouter> */}
          <Routes>
              <Route path='/' element={<Login/>}/>
              <Route path='/dashboard'element={<Dashboard/>}/>
              <Route path='/dashboard/addemployee'element={<AddEmployee/>}/>
              <Route path='/dashboard/editemployee'element={<EditEmployee/>}/>
            </Routes>
         {/* </BrowserRouter> */}
      </div>
  );
}

export default App;
