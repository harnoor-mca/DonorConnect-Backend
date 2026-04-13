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
app.get("/api/ngos",(req,res)=>{
    const sql="Select *from ngo";
    db.query(sql,(err,result)=>
    {
        if (err){
            console.log(err);
            return res.status(500).json({message:"Error fetching data"});
        }
        res.json(result);
    });
});
app.get("/api/my-donations/:donor_id",(req,res)=>{
    const donor_id=req.params.donor_id;
    // const sql="Select*from donation_request where donor_id=? Order by request_date desc";
    const sql="Select dr.*,n.organisation_name from donation_request dr join ngo n on dr.ngo_id=n.ngo_id where dr.donor_id=? Order by dr.request_date desc";
   
    db.query(sql,[donor_id],(err,result)=>{
        if (err){
            console.log(err);
            return res.status(500).json({message:"Error fetching requests right now"});

        }
        res.json(result);
    });
});
app.delete("/api/donation/:request_id",(req,res)=>
{
    const id=req.params.request_id;
    const sql="Delete from donation_request where request_id=?";
    db.query(sql,[id],(err,result)=>{
        if (err){
            console.log(err);
            return res.status(500).json({message:"Error deleting requests right now"});
        }
        res.json({message:"Donation request deleted successfully"});
    });
});
app.post("/api/donate", (req, res) => {
  const {
    donor_id,
    ngo_id,
    donation_type,
    quantity,
    message,
    status,
    request_date
  } = req.body;

  const sql = `
    INSERT INTO donation_request
    (donor_id, ngo_id, donation_type, quantity, message, status, request_date)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql,
    [donor_id, ngo_id, donation_type, quantity, message, status, request_date],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error saving request" });
      }
      res.json({ message: "Request sent successfully" });
    }
  );
});
