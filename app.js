
const express=require("express");
var app=express();
const path=require("path");
const hbs=require("hbs");

require("./db/conn");
const Register=require("./models/emp_register");
const AddCitizen=require("./models/adminAddCitizen");
const AddProject=require("./models/addProjects");
const Complain=require("./models/complain");

const port=process.env.PORT||3000;

app.use("/photos",express.static("photos"));

const static_path=path.join(__dirname,"../public");
app.use(express.static(static_path));

const template_path=path.join(__dirname,"../templates/views");
const partial_path=path.join(__dirname,"../templates/partials");

app.set("view engine","hbs");
app.set("views",template_path);

hbs.registerPartials(partial_path);

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/",function(req,res){

    res.render("homepage");
});

//getting homepage
app.get("/homepage",function(req,res){

    res.render("homepage");
});


//getting register page
app.get("/register",function(req,res){

    res.render("register");
});

//creating a new user
app.post("/register",async (req,res) => {
        
         try{
             const uname=req.body.uname;
             const pass=req.body.psw;
 
              const username=await Register.findOne({username:uname});
 
               if(username.username==uname){

                res.render("registerFail");
               }
               else{
                const registerEmployee= new Register({
                    username:req.body.uname,
                    password:req.body.psw
                   
                 });

                 
              const Registered=await registerEmployee.save();
              res.render("login");
               }
              

         }
         catch(error){
            res.status(400).send(error);
         }
});


//getting loginPage
app.get("/login",function(req,res){

    res.render("login");
});

//validating employee
app.post("/login",async (req,res) => {
        
    try{
        const uname=req.body.uname;
        const pass=req.body.psw;
         
        const userName=await Register.findOne({username:uname});

        if(userName.password==pass){
            res.render("loginPass");
        }
        else{
            res.render("loginFail");
        }
    }
    catch(error){
       res.status(400).send(error);
    }
});


//getting citizenPage
app.get("/citizen",function(req,res){

    res.render("citizen");
});

//citizen Complain 
app.post("/citizen",async (req,res) => {
        
    try{
         const citizenComplain= new Complain({
            citizenID:req.body.citizenid,
            complain:req.body.complain
           
         });

         const complainRegistered=await citizenComplain.save();
         res.render("complainAdded");
    }
    catch(error){
       res.status(400).send(error);
    }
});

//getting Citizen View Project Page
app.get("/citizen_projectView",async (req,res)=>{
        
    try{
        const result=await AddProject.find({},{_id:0,__v:0});
    
       res.send(result);
   }
   catch(error){
     res.status(400).send(error); 
 }
   // res.render("citizen_projectView");
});

//getting adminPage
app.get("/adminpage",function(req,res){

    res.render("adminpage");
});

//posting citizen details from admin Page
app.post("/adminpage",async (req,res) => {
        
    try{

       

            const addCitizen= new AddCitizen({
                firstname:req.body.fname,
                middlename:req.body.mname,
                lastname:req.body.lname,
                familyname:req.body.fmname,
                dateofbirth:req.body.dob,
                citizenID:req.body.citizenid,
                gender:req.body.gen,
                marriageID:req.body.marriageid,
                phonenumber:req.body.phoneno,
                city:req.body.cy,
                zipcode:req.body.zcode,
                houseno:req.body.hnum,
                streetname:req.body.sname,
                streetno:req.body.snum
               
             });
             
             const citizen_added=await addCitizen.save();
             res.render("citizenAddedPass");
      
        
    }
    catch(error){
       res.status(400).send(error);
    }
});

//getting update Page
app.get("/update",function(req,res){

    res.render("update");
});


//update citizen data
app.post("/update",async (req,res)=>{

    try{
           const CID=req.body.citizenid;
           const update=req.body.select;
           const val=req.body.value;

           
          const updated=await AddCitizen.findOneAndUpdate(
                                  {citizenId:CID},
                                  {$set:{update:val}}
                                       );
            res.render("update");

    }catch(error){
        res.status(400).send(error); 
    }
});

//getting complain Page
app.get("/complains",function(req,res){
    res.render("complains");
});

//getting view complain page
app.post("/complains",async (req,res) =>{
    
          try{
               const result=await Complain.find({},{_id:0,__v:0});
           
              res.send(result);
          }
          catch(error){
            res.status(400).send(error); 
        }
});

//getting Project Details Page
app.get("/ProjectDetails",async (req,res)=>{
    try{
        const result=await AddProject.find({},{_id:0,__v:0});
    
       res.send(result);
   }
   catch(error){
     res.status(400).send(error); 
 }
   // res.render("ProjectDetails");
});

//getting Add Project Page
app.get("/AddProject",function(req,res){

    res.render("AddProject");
});

//add Projects
app.get("/adminpage",function(req,res){

    res.render("adminpage");
});

//posting citizen details from admin Page
app.post("/AddProject",async (req,res) => {
        
    try{
            const addProjects= new AddProject({
                projectNo:req.body.pnum,
                projectName:req.body.pname,
                departmentNo:req.body.dnum,
                budget:req.body.budget,
                projectCompany:req.body.company,
                projectLocation:req.body.location,
                projectDone:req.body.portion,
                startDate:req.body.start,
                endDate:req.body.end,
             });
    
             const project_added=await addProjects.save();
             res.render("project");
        
        
    }
    catch(error){
       res.status(400).send(error);
    }

    
});

//getting Reset Page
app.get("/reset",function(req,res){

    res.render("reset");
});

app.listen(port,function(req,res){

    console.log("server is running at port number '"+port+"' ");
});
