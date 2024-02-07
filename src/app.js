// const express = require("express");
// const {json} = require("express");
// const app = express();
// const port = process.env.PORT || 3000;
// const hbs = require("hbs");
// const path = require('path');

// require("./db/conn");
// const Register = require("./models/register");

// const static_path = path.join(__dirname, "../public");
// const templates_path = path.join(__dirname, "../templates/views");
// const partials_path = path.join(__dirname, "../templates/partials");

// app.use(express.json());
// app.use(express.urlencoded({extended:false}));
// app.use(express.static(static_path));

// app.set("view engine", "hbs");
// app.set("views", templates_path);
// hbs.registerPartials(partials_path);

// app.get("/", (req, res) => {
//   res.render("index");
// });

// app.get("/register",(req,res)=>{
//     res.render("register");
// })

// app.post("/register",async(req,res)=>{
//     try{
//   const pass=req.body.pass;
//   const cpass = req.body.cpass;
//     }catch(error){
// res.status(400).send(error);
//     }
// })

// app.listen(port, () => {
//   console.log(`listening ${port}`);
// });


const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const hbs = require("hbs");
const path = require('path');
const mongoose = require("mongoose");
require("./db/conn");
// Connect to MongoDB using mongoose (replace "your-mongodb-uri" with your actual MongoDB URI)
// mongoose.connect("mongodb://localhost:27017/Registeration", {
   
    
// }).then(() => {
//     console.log("Connected to MongoDB");
// }).catch((error) => {
//     console.error("Error connecting to MongoDB", error);
// });

const Register = require("./models/register");

const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(static_path));

app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", async (req, res) => {
    try {
        // const { name, email, gender, phone, pass, cpass } = req.body;
        const pass = req.body.pass;
        const cpass  = req.body.cpass;

        
        if (password === confirmPassword) {
          const registerEmployee = new Register({
            firstname : req.body.firstname,
            email : req.body.email,
            Gender : req.body.Gender,
            phone : req.body.phone,
            password :req.body.password,
            confirmPassword : req.body.confirmPassword,
          })
          const register =  await registerEmployee.save();
          res.status(201).render("index");
        }else{
          res.send("password not matching")
        }

    } catch (error) {
        res.status(400).send(error);
    }
});


app.get("/login",(req,res)=>{
  res.render("login");
})

app.post("/login",async(req,res)=>{
  try {
    const email = req.body.email;
    const password = req.body.password;

   const useremail = await Register.findOne({email:email});
if(useremail.password === password){
  res.status(201).render("index");
}else{
  res.send("password are not matching ");
}
  } catch (error) {
    res.status(400).send("invalid Email")
  }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
