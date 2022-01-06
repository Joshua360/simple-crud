
const express = require('express');
const router = express.Router();
const Student = require('../models/student');


// GET /profile
router.get('/', function(req, res, next) {
    if (! req.session.userId ) {
      console.log("You are not authorized to view this page.");

    }
    
    Student.findById(req.session.userId)
        .exec(function (error, user) {
          if (error) {
            return next(error);
          } else {
            return res.render('profile', { name: user.firstname });
          }
        });
  });

module.exports = router;





