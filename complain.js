const mongoose=require("mongoose");

const complainSchema=new mongoose.Schema({
            citizenID:{
                type:String,
                required:true
            },
            complain:{
                type:String,
                required:true
            }

});

const Complain=new mongoose.model("Complains",complainSchema);

module.exports=Complain;