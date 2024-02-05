let addBtn = document.querySelector(".add-btn");
let modal = document.querySelector(".modal-cont");
let allPriorityColor = document.querySelectorAll(".priority-color");
let textarea = document.querySelector(".textarea-cont");
let mainCont = document.querySelector(".main-cont");
let removeBtn = document.querySelector(".remove-btn");
var uid = new ShortUniqueId();
let modalPriorityColor = "black";
let addModal = true;
let removeFlag = false;

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

function createTicket(task,taskId,modalPriorityColor) {
    let ticketCont = document.createElement('div');
    ticketCont.setAttribute("class","ticket-cont");
    ticketCont.innerHTML = `<div class="ticket-cont">
                                <div class="ticket-color ${modalPriorityColor}"></div>
                                <div class="ticket-id">#${taskId}</div>
                                <div class="ticket-area">${task}</div>
                            </div>`
    mainCont.appendChild(ticketCont);

    //handle delete of ticket
    ticketCont.addEventListener("click",function(){
        if (removeFlag){
            ticketCont.remove();
        }
    })
}

