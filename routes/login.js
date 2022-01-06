const express = require("express");
const router = express.Router();
const Student = require('../models/student');


router.get('/', (req, res) => {    
    res.render('login');
});



// router.post('/', (req,res)=>{

//     //check if a user with provided email exists
//     Student.findOne({ email: req.body.email }, function (err, student) {
//         if (err){
//             console.log("An error occured: ", err);
//         }else if(!student){
//             console.log("No student with this email exists");
//         }else{
//             //check if the password matches
//             if(student.password === req.body.password){
//                 console.log("Logged in successfully");
//                 req.session.userId = student._id;

//                 res.redirect('/profile');
//             }else{
//                 console.log("Incorrect password");
//             }
//         }
//     });


// });


// Post /LOGIN
router.post('/', function(req, res, next) {
    if(req.body.email && req.body.password){
      Student.authenticate(req.body.email, req.body.password, function(error, user){
        if(error || !user){
          const err = new Error("Wrong email or password!")
          err.status = 401;
          return next(err)
        }else{
          req.session.userId = user._id;
          return res.redirect("/profile");
        }
  
      });
  
    }else{
      const err = new Error("Email and password required");
      err.status = 401;
      return next(err);
    }
  });


  

module.exports = router;
