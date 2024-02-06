let addBtn = document.querySelector(".add-btn");
let modal = document.querySelector(".modal-cont");
let allPriorityColor = document.querySelectorAll(".priority-color");
let allFilterColor = document.querySelectorAll(".color");
let textarea = document.querySelector(".textarea-cont");
let mainCont = document.querySelector(".main-cont");
let removeBtn = document.querySelector(".remove-btn");
var uid = new ShortUniqueId();
let modalPriorityColor = "black";
let color = ["red","blue","green","black"];
let ticketArr = [];

let addModal = true;
let removeFlag = false;

if(localStorage.getItem("tickets")){
    // console.log(localStorage.getItem("tickets"));
    let strArr = localStorage.getItem("tickets");
    let arr = JSON.parse(strArr);
    // console.log(arr);
    for(let i=0;i<arr.length;i++){
        let ticket = arr[i];
        createTicket(ticket.task,ticket.id,ticket.color);
    }
}

addBtn.addEventListener("click",function(){
    if(addModal){
        modal.style.display = "flex";
        addModal = false;
    }else{
        modal.style.display = "none";
        addModal = true;
    }
})

for (let i=0; i<allPriorityColor.length; i++){
    allPriorityColor[i].addEventListener("click",function(){
        for (let j=0;j<allPriorityColor.length;j++){
            if (allPriorityColor[j].classList.contains("active")){
                allPriorityColor[j].classList.remove("active");
            }
        }
        allPriorityColor[i].classList.add("active");
        modalPriorityColor = allPriorityColor[i].classList[1];
        console.log(modalPriorityColor);
    })
}

textarea.addEventListener("keydown",function(e){
    if (e.key=="Enter"){
        let task = e.target.value; //or we can also use textArea.value
        let taskId = uid.rnd();
        createTicket(task,taskId,modalPriorityColor);
        modal.style.display = "none";
        addModal = true;
        textarea.value = "";

    }
})

removeBtn.addEventListener("click",function(){
    if(removeFlag){
        removeBtn.style.color = "black";
        removeFlag = false;
    }else{
        removeBtn.style.color = "red";
        removeFlag = true
    }
})

for (let i = 0; i < allFilterColor.length ;i++ ){
    allFilterColor[i].addEventListener("click",function(){
        let allTicketsColor = document.querySelectorAll(".ticket-color");
        let currentSelected = allFilterColor[i].classList[1];
        for (let j=0;j<allTicketsColor.length;j++){
            let currentTicketColor = allTicketsColor[j].classList[1];
            if (currentTicketColor == currentSelected){
                allTicketsColor[j].parentElement.style.display = "block";
            }
            else{
                allTicketsColor[j].parentElement.style.display = "none";
            }
        }
    })
    allFilterColor[i].addEventListener("dblclick",function(){
        let allTicketsColor = document.querySelectorAll(".ticket-color");
        for (let j=0;j<allTicketsColor.length;j++){
            allTicketsColor[j].parentElement.style.display = "block";
        }
    })

}


function createTicket(task,taskId,modalPriorityColor) {
    let ticketCont = document.createElement('div');
    ticketCont.setAttribute("class","ticket-cont");
    ticketCont.innerHTML = `<div class="ticket-color ${modalPriorityColor}"></div>
                            <div class="ticket-id">#${taskId}</div>
                            <div class="ticket-area">${task}</div>
                            <div class="lock-unlock"><i class="fa-solid fa-lock"></i></div>`
    mainCont.appendChild(ticketCont);
    ticketArr.push({color:modalPriorityColor,id:taskId,task:task});
    updateLocalStorage(ticketArr);
 

    //handle delete of ticket
    ticketCont.addEventListener("click",function(){
        if (removeFlag){
            ticketCont.remove();
            let idx = ticketArr.findIndex(function(obj){
                return obj.id = taskId;
            })
            ticketArr.splice(idx,1);
            updateLocalStorage(ticketArr);
        }
    })

    //handle priority color change
    let ticketColor = ticketCont.querySelector(".ticket-color" )
    ticketColor.addEventListener("click",function(){
        let currentColor = ticketColor.classList[1];
        let currentColorIndex = -1;
        for (let i=0;i<color.length;i++){
            if (color[i]==currentColor){
                currentColorIndex = i;
                break
            }
        }
        let nextColorIndex = (currentColorIndex+1)%color.length;
        let nextColor = color[nextColorIndex];
        ticketColor.classList.remove(currentColor);
        ticketColor.classList.add(nextColor)
        //updating array in local storage to hold the latest ticket color
        let idx;
        for (let i = 0; i < ticketArr.length; i++){
            if (ticketArr[i].id==taskId){
                idx = i;
                break
            }
        }
        ticketArr[idx].color = nextColor;
        updateLocalStorage(ticketArr);

    })

    //handle lock unlock button
    let lockUnlockBtn = ticketCont.querySelector(".lock-unlock i");
    let taskArea = ticketCont.querySelector(".ticket-area");
    lockUnlockBtn.addEventListener("click",function(){
        console.log(lockUnlockBtn);
        if(lockUnlockBtn.classList.contains("fa-lock")){
            lockUnlockBtn.classList.remove("fa-lock");
            lockUnlockBtn.classList.add("fa-lock-open");
            taskArea.setAttribute("contenteditable","true");
        }
        else if(lockUnlockBtn.classList.contains("fa-lock-open")){
            lockUnlockBtn.classList.remove("fa-lock-open");
            lockUnlockBtn.classList.add("fa-lock");
            taskArea.setAttribute("contenteditable","false");
        }
        // let idx;
        // for (let i = 0; i < ticketArr.length; i++){
        //     if (ticketArr[i].id==taskId){
        //         idx = i;
        //         break
        //     }
        // }
        let idx = ticketArr.findIndex(function(obj){
            return obj.id == taskId;
        })
        ticketArr[idx].task = taskArea.innerText;
        updateLocalStorage(ticketArr)
    })

}

function updateLocalStorage(ticketArr){
    let strArr = JSON.stringify(ticketArr);
    localStorage.setItem("tickets",strArr);
}