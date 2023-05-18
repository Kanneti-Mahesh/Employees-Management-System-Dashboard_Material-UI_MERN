const mongoose = require('mongoose');


const devEmp = new mongoose.Schema({
    employeeId :{
        type:String,
        required:true,
    },
    employeeName :{
        type:String,
        required:true,
    },    
    employeeDept :{
        type:String,
        required:true,
    },
    employeeEmail :{
        type:String,
        required:true,
    },
    employeeDate :{
        type:String,
        required:true,
    },
})



module.exports = mongoose.model('devEmp',devEmp);