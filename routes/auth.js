const express=require("express");
const router=express.Router();
const db=require("../db");

router.post("/register",(req,res)=> {
    console.log("BODY: ",req.body);
    const body=req.body||{};
    const {name,email,password,city,phone,role,address,category}=req.body;
    if (role==="ngo"){
        const sql=`INSERT INTO ngo(organisation_name,email,password,city,phone,address,category) 
      VALUES (?,?,?,?,?,?,?)`;
        db.query(sql,[name,email,password,city,phone,address,category],(err)=>{
            if(err) return res.json(err);
            res.json("NGO registered");
        });
    }
    else{
        const sql=`INSERT INTO donor(full_name,email,password,city,phone) VALUES (?,?,?,?,?)`;
        db.query(sql,[name,email,password,city,phone],(err)=>{
            if (err) return res.json(err);
            res.json("Donor registered !");
        });
    }
});


router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const userSql = "SELECT * FROM donor WHERE email=? AND password=?";
  const ngoSql = "SELECT * FROM ngo WHERE email=? AND password=?";
console.log(req.body);

  db.query(userSql, [email, password], (err, userResult) => {

    if (userResult.length > 0) {
      return res.json({ role: "donor", user: userResult[0] });
    }

    db.query(ngoSql, [email, password], (err, ngoResult) => {

      if (ngoResult.length > 0) {
        return res.json({ role: "ngo", user: ngoResult[0] });
      }

      res.status(401).json({message: "Invalid credentials"});
    });
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const userSql = "SELECT * FROM donor WHERE email=? AND password=?";
  const ngoSql = "SELECT * FROM ngo WHERE email=? AND password=?";
console.log(req.body);

  db.query(userSql, [email, password], (err, userResult) => {

    if (userResult.length > 0) {
      return res.json({ role: "donor", user: userResult[0] });
    }

    db.query(ngoSql, [email, password], (err, ngoResult) => {

      if (ngoResult.length > 0) {
        return res.json({ role: "ngo", user: ngoResult[0] });
      }

      res.status(401).json({message: "Invalid credentials"});
    });
  });
});

module.exports=router;