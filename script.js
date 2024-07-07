let addBtn = document.querySelector('.add-btn');
let modal = document.querySelector('.modal-content');
let addModal = true;
let textarea = document.querySelector('.textarea');
let taskColor = "red"; 
let mainContainer = document.querySelector('.main-ticket-cont');

// let allPriorityColor = document.querySelectorAll('.priority-color');
let priorityContainer = document.querySelector('.priority-content-2');

let removeBtn = document.querySelector('.remove-btn');
let removeTicket = false;

addBtn.addEventListener('click', function() {


    console.log('Add button clicked');

    if(addModal){
        modal.style.display = 'flex'; // display the modal
    }
    else{

        modal.style.display = 'none'; // hide the model 
    }
    addModal = !addModal;   // toggling the state of the modal  
});

textarea.addEventListener('keydown', function(e){
    // console.log(e);
    let key = e.key;
    if(key == "Enter"){
        // console.log("Generate Ticket");
        generateTicket(textarea.value, taskColor); // function to generate ticket
        textarea.value = "";
        modal.style.display = 'none';
        addModal = true;
    }
});

// brute force method


// for(let i = 0; i < allPriorityColor.length; i++){
//     allPriorityColor[i].addEventListener('click', function(e){
//         console.log(e.target.classList[1]);
//         for(let j = 0; j < allPriorityColor.length; j++){
//             allPriorityColor[j].classList.remove('active');
//         }
//         e.target.classList.add('active');
//     });
// }


// using event deligation

let arr = document.querySelectorAll('.priority-color');
priorityContainer.addEventListener('click', function(e){
    let element = e.target;
    if(e.target.classList[0] == "priority-color"){
        for(let i = 0; i < arr.length; i++){
            arr[i].classList.remove('active');
        }

        element.classList.add('active');
        taskColor = element.classList[1];

        
    }

});


function generateTicket(task, color){

    // <div class = "ticket-cont">
            // <div class = "ticket-color"></div>
            // <div class = "ticket-id">#someId</div>
            // <div class = "ticket-task">learn Dsa</div>
    // </div>

    let ticketContainer = document.createElement("div");
    ticketContainer.className = "ticket-cont";
    ticketContainer.innerHTML = `<div class = "ticket-color"></div>
                                <div class = "ticket-id">#someId</div>
                                <div class = "ticket-task">${task}</div>
                                <div class = "lock-unlock"><i class = "fa-solid fa-lock"></i></div>`;

    console.log(ticketContainer);
    // applying background color to selected color to the ticket
    
    ticketContainer.querySelector('.ticket-color').style.backgroundColor = color;
    mainContainer.appendChild(ticketContainer);

}

removeBtn.addEventListener('click', function(){
    removeTicket = !removeTicket;
    console.log(removeTicket);
    if(removeBtn.style.color === "red"){
        removeBtn.style.color = "black";
    }
    else{
        removeBtn.style.color = "red";
    }
});
mainContainer.addEventListener('click', function(e){
    console.log(e.target.className);
    console.log("target clicked");
    let ticketElement = e.target.closest('.ticket-cont');
    if(ticketElement && removeTicket){
        mainContainer.removeChild(ticketElement);
        console.log("Ticket removed");
    }

    if(e.target.parentNode.classList.contains('lock-unlock')) {
        let taskArea = e.target.parentNode.parentNode.children[2];
        if(e.target.classList.contains('fa-lock')){
            e.target.classList.remove('fa-lock');
            e.target.classList.add('fa-lock-open');
            taskArea.setAttribute('contenteditable', 'true');
        }
        else{
            e.target.classList.remove('fa-lock-open');
            e.target.classList.add('fa-lock');
            taskArea.setAttribute('contenteditable', 'false');
        }
    }
});





