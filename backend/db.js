const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://abhijeetphute0:Abhi4221@cluster0.sph30.mongodb.net/employee');

const employeeSchema = mongoose.Schema({
    employeeName:String,
    emp_id:Number,
    available:Boolean
});


const employee = mongoose.model('empolyee', employeeSchema);

module.exports = {employee};

