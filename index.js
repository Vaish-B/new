
require('dotenv').config();

var bodyParser = require('body-parser');




var urlencodedParser = bodyParser.urlencoded({ extended: false })

const express = require("express");
const  app = express();


const jwt =require("jsonwebtoken");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
const mysql = require("mysql");

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }


var token;
console.log(token);
  app.get("/user",auth, urlencodedParser,(req,res)=>{
    res.json({user :user , userInfo : req.user});
  });

  //login
  app.post("/login", urlencodedParser,(req,res)=>{
  
  const value ={
    username:"admin",
    password:"1234"
  }

  //Logout
  app.post("/logout",(req,res)=>{//logout
    token = undefined;
    res.send("logout");
  });
      
    
   token =jwt.sign({value},process.env.ACESS_TOKEN ); //generate tocken
     res.send(token)
     console.log(token);
  });
  function auth(req,res,next){   //middleware
   if(token !== undefined){
           jwt.verify(token,proess.env.ACESS_TOKEN,(err,verified)=>{
            if(err) return res.status(404).send("token not verified");
            req.user = verified;
            next();
   });
}else{
        return res.status(404).send("needs to login first");
   }

  }

const db = mysql.createConnection({
    host : process.env.HOST ,
    user: process.env.USER ,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,

    });

    db.connect((err) => {
        if(err) { 
            throw err;
        }
        console.log("mysql database conneted");
    });

//CRUD operations pass this url in thunder client 

app.get("/getUsersList",function(req,res){

    let query = "select * from tbl_users";

db.query(query,(err,result) => {

    if(err) {
        res.json({msg:result});
           }
    else{
        res.json({msg:result});
    }
});
});



//insert user with json (http://localhost:8089/saveUser)  pass this url in thunder client 

app.post("/saveUser",function(req,res){

    let query = "insert into tbl_users SET ?";
    let postData = { 
        "name" : req.body.name,
        "email" : req.body.email,
        "mobile" : req.body.mobile,
    };

db.query(query,postData,(err,result) => {

    if(err) {
        res.json({msg:err});
           }
    else{
        res.json({msg:"inserted successfully"});
    }
});
});

//UPDATE  to passing json data  (http://localhost:8089/updateUser/1) pass this url in thunder client 

app.post("/updateUser/:id",function(req,res){

    let query = `update tbl_users set name='${req.body.name}', email='${req.body.email}', mobile='${req.body.mobile}' where id=${req.params.id} `;
    let postData = { 
        "name" : req.body.name,
        "email" : req.body.email,
        "mobile" : req.body.mobile,
    };

db.query(query,postData,(err,result) => {

    if(err) {
        res.json({msg:result});
           }
    else{
        res.json({msg:"update data suessfully"});
    }
});
});

//Delete data (http://localhost:8089/deleteUser/4) pass this url in thunder client 

app.post("/deleteUser/:id",function(req,res){

    let query = `delete from  tbl_users where id=${req.params.id} `;
    let postData = { 
        "id" : req.body.id
        
    };

db.query(query,postData,(err,result) => {

    if(err) {
        res.json({msg:result});
           }
    else{
        res.json({msg:"delete data suessfully"});
    }
});
});






require("dotenv").config();
PORT =  process.env.PORT  || 8085

app.get("/",function(req,res){

    res.send("<p>welcome in node projet </p>");
});

app.get("/about",function(req,res){
    res.send("<p>About Page</p>");
});

app.listen(PORT, function () {
    console.log(`Server is listening at port ${PORT}`);
  });




