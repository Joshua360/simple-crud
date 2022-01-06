const mongoose = require('mongoose');
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const Student = require('./models/student');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const studentRouter = require('./routes/students');
const loginRouter = require('./routes/login');
const profileRouter = require('./routes/profile');
const coursesRouter = require('./routes/courses');
const aboutRouter = require('./routes/about');
const session = require('express-session');


app.use(session( {
    secret: 'treehouse loves you',
    resave: true,
    saveUninitialized: false
  }));
  
  
  //make userID available in all templates
  app.use(function(req,res, next){
    res.locals.currentUser = req.session.userId;
    next();
  })
  
app.set('view engine', 'pug');
//serve static files
app.use('/static', express.static('public'));


app.get('/', (req, res) => {    
    res.render('index');
});


app.use('/profile', profileRouter);
app.use('/login', loginRouter);
app.use('/students', studentRouter);
app.use('/courses', coursesRouter);
app.use('/about', aboutRouter);

// destroy session

app.get('/logout', (req, res) => {
  if(req.session){
    req.session.destroy(function(err){
      if(err){
        return next(err);
      }else{
        return res.redirect('/');
      }

    });
  }

});

const uri = process.env.ATLAS_URI;


//set up monogoose connection
 mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });



const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    }
);

