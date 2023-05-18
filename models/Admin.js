const mongoose = require('mongoose');


const devAdmin = new mongoose.Schema({
    adminName :{
        type:String,
        required:true,
    },
    adminEmail :{
        type:String,
        required:true,
    },    
    adminMobile :{
        type:String,
        required:true,
    },
    adminPassword :{
        type:String,
        required:true,
    },
    adminConfirmpassword :{
        type:String,
        required:true,
    },
})



module.exports = mongoose.model('devAdmin',devAdmin);