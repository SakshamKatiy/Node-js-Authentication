const mongoose = require("mongoose");

const Employeeschema = new mongoose.Schema({
    firstname :{
        type:String,
        // required :true
    },
    email:{
        type:String,
        // required:true,
        unique:true
    },
    Gender:{
        type:String,
        // required :true
    },
    phone:{
        type:Number,
        // required:true,
        unique:true
    },
    password:{
        type:String,
        // required:true
    },
    confirmPassword:{
        // required:true
    }
});

const Register = new mongoose.model('Register',Employeeschema);
module.exports = Register;