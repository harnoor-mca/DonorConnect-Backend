
const express=require("express");
const cors=require("cors");
const app=express();
app.use(cors());
app.use(express.json());

const authRoutes=require("./routes/auth");
const db = require("./db");
app.use("/api",authRoutes);
app.listen(5000,()=>{
    console.log("Server running on port 5000");
});
app.post("/register",(req,res)=>{
    const {name,email,password,role,phone,city}=req.body;
    const sql=`Insert into Donor(name,email,password,role,phone,city) values (?,?,?,?,?,?)`;
    db.query(sql,[name,email,password,role,phone,city],(err,result)=> {
        if(err){
            console.log(err);
            return res.status(500).json({message:"Registration failed"});
        }
        res.json({message:"User registered successfully"});
    });
});
// const express=require("express");
// const cors=require("cors");
// const app=express();
// app.use(cors());
// app.use(express.json());

// const authRoutes=require("./routes/auth");
// const db = require("./db");
// app.use("/api",authRoutes);
// app.listen(5000,()=>{
//     console.log("Server running on port 5000");
// });
// app.post("/register",(req,res)=>{
//     const {name,email,password,role,phone,city}=req.body;
//     const sql=`Insert into Donor(name,email,password,role,phone,city) values (?,?,?,?,?,?)`;
//     db.query(sql,[name,email,password,role,phone,city],(err,result)=> {
//         if(err){
//             console.log(err);
//             return res.status(500).json({message:"Registration failed"});
//         }
//         res.json({message:"User registered successfully"});
//     });


app.get("/api/ngos",(req,res)=>{
    const sql="Select *from ngo";
    db.query(sql,(err,result)=>
    {
        if (err){
            console.log(err);
            return resstatus(500).json({message:"Error fetching data"});
        }
        res.json(result);
    });
});