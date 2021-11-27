const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const Student = require('./models/student');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');
//serve static files
app.use('/static', express.static('public'));


app.get('/', (req, res) => {    
    res.render('index');
});

app.get("/students", (req,res)=>{
    Student.find({}, (err, students) => {
        if(err) return console.error(err);
        res.render('students', { students: students });
    });

})

app.post('/students', (req, res) => {
    const collectedData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        semester: req.body.semester

    }


    //insert data into database
    Student.create(collectedData, (err, student) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.redirect('/students');
        }
    });

   

});

//edit student
app.get('/students/edit/:id', (req, res) => {
    Student.findById(req.params.id, (err, student) => {
        if (err) return console.error(err);
        res.render('edit', { student: student });
    });
});

//delete student
app.get('/students/delete/:id', (req, res) => {
    Student.findByIdAndRemove(req.params.id, (err, student) => {
        if (err) return console.error(err);
        res.redirect('/students');
    });
});


//set up monogoose connection
mongoose.connect('mongodb://localhost/students');





app.listen(3000, () => {
    console.log('Server started on port 3000');
    }
);
