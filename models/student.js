const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


//create schema
const StudentSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});


//authenticate input against database
StudentSchema.statics.authenticate = function (email, password, callback) {


    Student.findOne({ email: email })
        .exec(function (err, student) {
            if (err) {
                return callback(err)
            } else if (!student) {
                var err = new Error('Student not found.');
                err.status = 401;
                return callback(err);
            }

            bcrypt.compare(password, student.password, function (err, result) {
                if (result === true) {
                    return callback(null, student);
                } else {        
                    return callback();
                }
            });
        })
    };
        




//hash the password
StudentSchema.pre('save', function(next){
    const student = this;
    bcrypt.hash(student.password, 10, function(err, hash){
        if(err){
            return next(err);
        }
        student.password = hash;
        next();
    });
});






//create model
const Student = mongoose.model('student', StudentSchema);
//export model
module.exports = Student;
