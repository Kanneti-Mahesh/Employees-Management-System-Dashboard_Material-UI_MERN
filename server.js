const path = require('path');

const express = require('express');
const app = express();

const cors = require('cors');

// var port = process.env.PORT || 8000;


            //Models...
const devEmp = require('./models/Employees');
const devAdmin = require('./models/Admin');

        //DB config...
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Mahesh:Mahesh@cluster1.ycpywnc.mongodb.net/?retryWrites=true&w=majority').then(
    ()=>console.log('DB Connected...')
)

            //jsonwebtoken...
const jwt = require('jsonwebtoken');

const auth = require('./auth')

app.use(express.json());
app.use(cors({origin:"*"}));





//-----------------BUILD FILE FROM CLIENT SIDE--------------------------

// app.use(express.static(path.join(__dirname,"./client/build")));



// app.get('*',function(req,res){
//     res.sendFile(path.join(__dirname,"./client/build/index.html"))
// })


//-------------------------------------------------------------------------------

                //ADMINS Registrations...
app.post('/admins/register',async(req,res)=>{

    try{
        const {adminName,adminEmail,adminMobile,adminPassword,adminConfirmpassword} = req.body;

        const exist = await devAdmin.findOne({adminEmail});

        if(exist){
            return res.status(400).send('Admin is Already Registered');
        }
        else if(adminPassword!==adminConfirmpassword){
            return res.status(403).send('Password is Invalid');
        }
        let newAdmin = new devAdmin({
            adminName,adminEmail,adminMobile,adminPassword,adminConfirmpassword
        })

        newAdmin.save();
        return res.status(200).send('Admin Registered Successfully')


    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error...')
    }
})


                //ADMINS Login...

app.post('/admins/login',async(req,res)=>{
    
    try{
        const {adminEmail,adminPassword} = req.body;
        const exist = await devAdmin.findOne({adminEmail});

        if(!exist){
            return res.status(400).send('Admin Not Exist!');
        }
        else if(exist.adminPassword!==adminPassword){
            return res.status(403).send('Password is Invalid');
        }

        let payload = {
            user:{
                id:exist.id
            }
        }

        jwt.sign(payload,'myPassword',{expiresIn:360000000},
        (err,token)=>{
                if(err) throw err;
                res.json({token});
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error');
    }


})








//--------------------------------------------------------------------------------

        //Employees Registrations (OR) NEW Employees...
app.post('/employees/register',auth,async(req,res)=>{

    try{
        const {employeeId,employeeName,employeeDept,employeeEmail,employeeDate} = req.body;
        const exist = await devEmp.findOne({employeeEmail});

        if(exist){
            return res.status(400).send('Employee is Already Registered');
        }
        let newEmp = new devEmp({
            employeeId,employeeName,employeeDept,employeeEmail,employeeDate
        })
            newEmp.save();
            return res.status(200).send('Employee Added Successfully')

    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error...')
    }


})




        //Employees List GET...
    app.get('/employees/list',auth,async(req,res)=>{

        try{
            const allEmployees = await devEmp.find();
            return res.json(allEmployees);
        }
        catch(err){
            console.log(err);
            return res.status(500).send('Server Error...')
        }
        
    })




              //Employees UPDATE...
app.put('/employees/update/:id',auth,async(req,res)=>{

    try{
        const {employeeId,employeeName,employeeDept,employeeEmail,employeeDate} = req.body;
        const exist = await devEmp.findByIdAndUpdate(req.params.id , req.body);


            return res.status(200).send('Employee is Updated Successfully')
      

            

    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error...')
    }


})






            //Employees List DELETE...
            app.delete('/employees/delete/:id',auth,async(req,res)=>{

                try{
                    const deleteEmployees = await devEmp.findByIdAndDelete(req.params.id);
                    // return res.json(deleteEmployees);
                    return res.status(200).send('Employee Deleted Successfully')
                }
                catch(err){
                    console.log(err);
                    return res.status(500).send('Server Error...')
                }
                
            })









app.listen(8000,()=>{
    console.log('Server is Running...')
})









    // "client": "npm start --prefix client",
    // "both": "concurrently \"npm run server\" \"npm run client\" "