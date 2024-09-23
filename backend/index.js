const express = require('express');
const { employee } = require('./db');
const { employeeS, checkNumber } = require('./validate');
const path = require('path');


const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
const cors = require('cors');
app.use(cors());


app.get('/employee_data', async (req, res) => {
    const data = await employee.find({});
    res.json({ data });
});


app.post('/add_data', async (req, res) => {
    const data = await req.body;
    console.log("This is data:- ", data);

    const valid = employeeS.safeParse(data);
    if (!valid.success) {
        res.status(411).json({
            msg: "You sent a wrong inputs"
        });
    }

    await employee.create({
        employeeName: data.employeeName,
        emp_id: data.emp_id,
        available: data.available
    });
});


app.put('/change_status',async (req, res) => {
    const data = await req.body;

    const status = data.status;

    if(status==true){
        const valid = checkNumber.safeParse(data);
    if (!valid.success) {
        res.status(411).json({
            msg: "You sent a wrong inputs"
        });
    }

    await employee.updateOne({emp_id:data.emp_id},{available:false});
    }
    else{
        const valid = checkNumber.safeParse(data);
    if (!valid.success) {
        res.status(411).json({
            msg: "You sent a wrong inputs"
        });
    }

    await employee.updateOne({emp_id:data.emp_id},{available:true});
    }

    


});




app.listen(3000,() => {
    console.log("Your websie is live on http://localhost:3000");
})