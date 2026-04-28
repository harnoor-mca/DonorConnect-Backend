const express=require("express");
const router=express.Router();
const db=require("../db");
router.post("/admin/delete-multiple", (req, res) => {
    const { ids } = req.body;

    if (!ids || ids.length === 0) {
        return res.json({ message: "No users selected" });
    }

    const sql = `DELETE FROM donor WHERE donor_id IN (?) or delete from ngo ngo_id IN (?)`;

    db.query(sql, [ids], (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ message: "Delete failed" });
        }

        res.json({ message: "Users deleted successfully" });
    });
});
router.post("/register",(req,res)=> {
    console.log("BODY: ",req.body);
    const body=req.body||{};
    const {name,email,password,city,phone,role,address,category}=req.body;
    if (role==="ngo"){
      const checksql='select *from ngo where email=? or phone=? union select *from donor where email=? or phone=?';
      db.query(checksql,[email,phone],(err,result)=>{
        if (err)return res.json({message:"DB error"});
        if(result.length>0){
          return res.json({message:"User already exists"});

        }
      })
        const sql=`INSERT INTO ngo(organisation_name,email,password,city,phone,address,category) 
      VALUES (?,?,?,?,?,?,?)`;
        db.query(sql,[name,email,password,city,phone,address,category],(err)=>{
            if(err) return res.json(err);
            res.json({message: "NGO registered"});
        });
    }
    else{
      const checksql='select *from donor where email=? or phone=? union select *from ngo where email=? or phone=?';
      db.query(checksql,[email,phone],(err,result)=>{
        if (err)return res.json({message:"DB error"});
        if(result.length>0){
          return res.json({message:"User already exists"});
          
        }
      })
        const sql=`INSERT INTO donor(full_name,email,password,city,phone) VALUES (?,?,?,?,?)`;
        db.query(sql,[name,email,password,city,phone],(err)=>{
            if (err) return res.json(err);
            res.json({message:"Donor registered !"});
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