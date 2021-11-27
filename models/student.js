const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    }
});

//create model
const Student = mongoose.model('student', StudentSchema);
//export model
module.exports = Student;
