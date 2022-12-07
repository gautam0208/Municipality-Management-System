const mongoose=require("mongoose");

const empSchema=new mongoose.Schema({
            username:{
                type:String,
                required:true,
                unique:true
            },
            password:{
                type:String,
                required:true
            }

});

const Register=new mongoose.model("Emp_register",empSchema);

module.exports=Register;