const express = require("express");
const router = express.Router();
const Student = require('../models/student');


router.get("/", (req,res)=>{
    Student.find({}, (err, students) => {
        if(err) return console.error(err);
        let count = 0;
        res.render('students', { students, count });
    });

})

router.post('/', (req, res,next) => {

    if(req.body.firstname &&
        req.body.lastname &&
        req.body.semester &&
        req.body.email &&
        req.body.password &&
        req.body.cpassword
        ) {


    
        if(req.body.password === req.body.cpassword){

            const collectedData = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                semester: req.body.semester,
                email: req.body.email,
                password: req.body.password,
                confirmPassword: req.body.cpassword
            }
            
                //insert data into database
            Student.create(collectedData, (err, student) => {
                if (err) {
                    res.status(400).send(err);
                } else {
                    req.session.userId = student._id;
                    res.redirect('/profile');
                }
            });
    
    
        }else{
            const err = new Error('Passwords do not match');
            err.status = 400;
            next(err);
        }

    }else{
        const err = new Error('All fields are required.');
        err.status = 400;
        return next(err);
    }


});

//edit student
router.get('/edit/:id', (req, res) => {
    Student.findById(req.params.id, (err, student) => {
        if (err) return console.error(err);
    
        res.render('edit', { student: student, id: req.params.id });
    });
});


//update student
router.post('/update/:id', (req, res) => {
    Student.findByIdAndUpdate(req.params.id, {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        semester: req.body.semester
    }, (err, student) => {
        if(err) return console.error(err);
        res.redirect('/students');
    });
});




//delete student
router.get('/delete/:id', (req, res) => {
    Student.findByIdAndRemove(req.params.id, (err, student) => {
        if (err) return console.error(err);
        res.redirect('/students');
    });
});




module.exports = router;

