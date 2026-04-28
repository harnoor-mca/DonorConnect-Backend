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
/* app.post("/register",(req,res)=>{
    const {name,email,password,role,phone,city,category}=req.body;

    const checkSql = "SELECT * FROM donor WHERE email=? UNION SELECT * FROM ngo WHERE email=?";
    db.query(checkSql, [email, email], (err, result) => {
    if (err) {
        console.log(err);
    
    return res.status(500).json({message:"Registration failed"});

    }

    return res.json({ message: "Registered successfully" });
    

    if (role==="donor"){
    const sql=`Insert into donor(name,email,password,role,phone,city) values (?,?,?,?,?,?)`;
    db.query(sql,[name,email,password,role,phone,city],(err,result)=> {
        if(err){
            console.log(err);
            return res.status(500).json({message:"Registration failed"});
        }
        res.json({message:"User registered successfully"});
    });
    }
    else if(role==="ngo"){
        const sql=`Insert into ngo(organisation_name,email,password,phone,city,address,category) values (?,?,?,?,?,?,?)`;
    db.query(sql,[name,email,password,phone,city,address,category],(err,result)=> {
        if(err){
            console.log(err);
            return res.status(500).json({message:"Registration failed"});
        }
        res.json({message:"NGO registered successfully"});
    });
    }
    });
});
*/

app.get("/api/ngos",(req,res)=>{
    const sql="Select *from ngo order by organisation_name ";
    db.query(sql,(err,result)=>
    {
        if (err){
            console.log(err);
            return res.status(500).json({message:"Error fetching data"});
        }
        res.json(result);
    });
});
app.get("/api/donors",(req,res)=>{
    const sql="Select *from donor order by full_name ";
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
app.delete("/api/admin/ngo-del/:id",(req,res)=>
{const id=req.params.id;
    
    const deleteRequests="Delete from donation_request where ngo_id=?";
    db.query(deleteRequests,[id],(err,result)=>{
        if (err){
            console.log(err);
            return res.status(500).json({message:"Error deleting request right now"});
        }
    
    const sql="Delete from ngo where ngo_id=?";
    db.query(sql,[id],(err,result)=>{
        if (err){
            console.log(err);
            return res.status(500).json({message:"Error deleting ngo right now"});
        }
        return res.json({message:"NGO deleted successfully"});
    });
});
});

app.delete("/api/admin/donor-del/:id",(req,res)=>
{
    const id=req.params.id;
    const deleteRequests="Delete from donation_request where donor_id=?";
    db.query(deleteRequests,[id],(err,result)=>{
        if (err){
            console.log(err);
            return res.status(500).json({message:"Error deleting request right now"});
        }
    
    const sql="Delete from donor where donor_id=?";
    db.query(sql,[id],(err,result)=>{
        if (err){
            console.log(err);
            return res.status(500).json({message:"Error deleting donor right now"});
        }
        return res.json({message:"Donor deleted successfully"});
    });
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
console.log(req.body);
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

app.get("/api/ngo-requests/:ngo_id",(req,res)=>{
    const ngo_id=req.params.ngo_id;
    const sql="Select dr.*,d.full_name,d.email,d.phone from donation_request dr join donor d on dr.donor_id=d.donor_id where dr.ngo_id=? order by dr.request_id desc";
db.query(sql,[ngo_id],(err,result)=>{
        if (err){
            console.log(err);
            return res.status(500).json({message:"Error fetching Ngo requests"});}
        res.json(result);
    });
});
app.put("/api/donation/:id", (req, res) => {
    const id = req.params.id;
    const { status } = req.body;

    const sql = "UPDATE donation_request SET status = ? WHERE request_id = ?";

    db.query(sql, [status, id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Error updating status" });
        }
        res.json({ message: "Status updated" });
    });
});

app.get("/test-db",(req,res)=>{
    db.query("Select 1",(err,result)=>{
        if(err){
            console.error(err);
            res.send("Db error");
            
        }
        else{
            res.send("Db working");
        }
    });
});