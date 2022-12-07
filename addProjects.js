const mongoose=require("mongoose");

const addproject=new mongoose.Schema({
            projectNo:{
                type:String,
                required:true,
            },
            projectName:{
                type:String,
                required:true
            },
            departmentNo:{
                type:String,
                required:true
            },
            budget:{
                type:String,
                required:true
            },
            projectCompany:{
                type:String,
                required:true
            },
            projectLocation:{
                type:String,
                required:true,
            },
            projectDone:{
                type:String,
                required:true
            },
            startDate:{
                type:String,
                required:true,
            },
            endDate:{
                type:String,
                required:true
            },


});

const AddProject=new mongoose.model("Add_Project",addproject);

module.exports=AddProject;