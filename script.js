let addBtn = document.querySelector(".add-btn");
let modal = document.querySelector(".modal-cont");
let allPriorityColor = document.querySelectorAll(".priority-color");
let textarea = document.querySelector(".textarea-cont");
let mainCont = document.querySelector(".main-cont");
let removeBtn = document.querySelector(".remove-btn");

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
    })
}

textarea.addEventListener("keydown",function(e){
    if (e.key=="Enter"){
        createTicket();
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

function createTicket() {
    let ticketCont = document.createElement('div');
    ticketCont.setAttribute("class","ticket-cont");
    ticketCont.innerHTML = `<div class="ticket-cont">
                                <div class="ticket-color green"></div>
                                <div class="ticket-id">#eidut3</div>
                                <div class="ticket-area">Some Task</div>
                            </div>`
    mainCont.appendChild(ticketCont);

    //handle delete of ticket
    ticketCont.addEventListener("click",function(){
        if (removeFlag){
            ticketCont.remove();
        }
    })
}

