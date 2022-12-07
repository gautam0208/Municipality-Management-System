const mongoose=require("mongoose");

const addCitizen=new mongoose.Schema({
            firstname:{
                type:String,
                required:true,
            },
            middlename:{
                type:String,
                required:false
            },
            lastname:{
                type:String,
                required:true
            },
            familyname:{
                type:String,
                required:false
            },
            dateofbirth:{
                type:String,
                required:true
            },
            citizenID:{
                type:String,
                required:true,
                unique:true
            },
            gender:{
                type:String,
                required:true
            },
            marriageID:{
                type:String,
                required:false,
            },
            phonenumber:{
                type:String,
                required:true
            },
            city:{
                type:String,
                required:true
            },
             zipcode:{
                type:String,
                required:true
            },
            houseno:{
                type:String,
                required:true
            },
            streetname:{
                type:String,
                required:true
            },
            streetno:{
                type:String,
                required:true
            }


});

const AddCitizen=new mongoose.model("Add_Citizen",addCitizen);

module.exports=AddCitizen;