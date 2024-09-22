const zod = require('zod');

const employeeS = zod.object({
    employeeName:zod.string(),
    emp_id:zod.number(),
    available:zod.boolean()
});


const checkNumber = zod.number();



module.exports = {employeeS, checkNumber};