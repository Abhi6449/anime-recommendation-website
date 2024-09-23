function createEmployeeCard(obj) {
    // Create the outer card div
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');

    // Create the title div and its paragraphs
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title');

    const titleName = document.createElement('p');
    titleName.innerText = 'Employee Name';

    const titleId = document.createElement('p');
    titleId.innerText = 'Emp id';

    const titleAvailable = document.createElement('p');
    titleAvailable.innerText = 'Available';

    // Append titles to titleDiv
    titleDiv.appendChild(titleName);
    titleDiv.appendChild(titleId);
    titleDiv.appendChild(titleAvailable);

    // Create the data div and its paragraphs
    const dataDiv = document.createElement('div');
    dataDiv.classList.add('data');

    const dataName = document.createElement('p');
    dataName.innerText =obj.employeeName;

    const dataId = document.createElement('p');
    dataId.innerText = obj.emp_id;

    const dataAvailable = document.createElement('p');
    dataAvailable.innerText = obj.available;

    // Append data fields to dataDiv
    dataDiv.appendChild(dataName);
    dataDiv.appendChild(dataId);
    dataDiv.appendChild(dataAvailable);

    // Create the change status button
    const changeButton = document.createElement('button');
    changeButton.id = 'changeButton';
    changeButton.innerText = 'change status';

    // Optional: Add event listener for the button (for example, to change status)
    changeButton.addEventListener('click', () => {
        const id = obj.emp_id;
        const status = obj.available;


        fetch("http://localhost:3000/change_status",{
            method:"PUT",
            body:JSON.stringify({
                emp_id:id,
                status:status
            }),
            headers:{
                "content-type":"application/json"
            }
        })
        .then(()=>{
            window.location.reload();
        })
        
    });

    // Append everything to the card div
    cardDiv.appendChild(titleDiv);
    cardDiv.appendChild(dataDiv);
    cardDiv.appendChild(changeButton);

    return cardDiv; // Return the created card element
}



const button = document.getElementById("submit");
button.addEventListener("click",()=>{
    const name = document.getElementById("input_name").value;
    const id = document.getElementById("input_id").value;
    const status = document.getElementById("input_available").value;
    // console.log(name);
    // console.log(id);
    // console.log(status);

    
fetch("http://localhost:3000/add_data",{
    method:"POST",
    body:JSON.stringify({
        employeeName:name,
        emp_id:id,
        available:status
    }),
    headers:{
        "content-type":"application/json"
    }
})
.then(()=>{
    window.location.reload();
})

    
});




function createCards(){
    const container = document.getElementById('container');

    fetch('http://localhost:3000/employee_data')
    .then((data)=>{
       data.json()
        .then((obj)=>{
            const show = obj.data; 
            console.log(show);
            
            show.forEach((temp)=>{
                const card = createEmployeeCard(temp);
                container.append(card);
            })
        })
    });

}
