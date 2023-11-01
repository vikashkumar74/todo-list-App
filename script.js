"use strict";
const btn = document.querySelector(".btn");
const inputBox = document.querySelector(".input-box");
const input = document.querySelector("#input");
const prevComment = document.querySelector(".prev-comment");
const editInputBox = document.querySelector(".edit-input-box");
const editInput = document.getElementById("edit-input");
const updateBtn = document.querySelector(".update-btn");
const addCommentMsg = document.querySelector(".add-comment-msg");
const deleteCommentMsg = document.querySelector(".delete-comment-msg");
const deleteAllTodo = document.querySelector(".delete-all-btn");
const closeEditedText=document.querySelector('.close')
let commentArr = [];
let call;
let count;
let targetEdit;
prevdata();

let object = function (inputValue) {
  this.inputValue = inputValue;
};

//events
btn.addEventListener("click", function (e) {
  e.preventDefault();
  sucessMessage();
  callValue();
  input.value = "";
});

///sucess message
function sucessMessage() {
  if (!input.value) return;
  addCommentMsg.classList.add("show-message")

  setTimeout(setTime, 1000);
}
function setTime() {
  addCommentMsg.classList.remove("show-message")
}
function deletedSucessMessage(){
deleteCommentMsg.classList.add("show-message")

  setTimeout(sett, 800);
}
function sett() {
  deleteCommentMsg.classList.remove("show-message")
}
/// function to create object;
function callValue() {
  call = new object(input.value);

  let v = JSON.parse(localStorage.getItem("calls"));
  if (!v) {
    call.id = 0;
  } else {
    call.id = v.length;
  }
  commentArr.push(call);
  insetHtml(call);
  localStorage.setItem("calls", JSON.stringify(commentArr));
}
///// function to insert html
function insetHtml(call) {
  if (!call.inputValue) return;

  let html = `<div class="todo-box ">
  <div class="comment"  id="${call.id}">  ${call.inputValue}</div>
        <div class="btns">
        <span  class="material-symbols-outlined edit" >
            edit
            </span>
        <span class="material-symbols-outlined  delete">
            delete
            </span> 
          </div>
    
    </div>`;
  //<input   type="text" disabled value="${call.inputValue}">
  prevComment.insertAdjacentHTML("afterend", html);
}
function prevdata() {
  const data = JSON.parse(localStorage.getItem("calls"));
  if (!data) return;
  commentArr = data;

  commentArr.forEach((work) => {
    insetHtml(work);
  });
}

// reset()
function reset() {
  // localStorage.removeItem('calls');
  localStorage.clear();
 
  while(commentArr.length > 0) {
    commentArr.pop();
}
   const todoBox=document.querySelectorAll(".todo-box");
   todoBox.forEach(e=>e.classList.add("hidden"))
   setTimeout(()=> todoBox.forEach(e=>e.classList.add("remove")),1000)
   deletedSucessMessage();
}
// function to select edit text

function selectEdit(e) {
e.preventDefault()
  if (e.target.classList.contains("edit")) {
    editInputBox.style.display = "flex";
    targetEdit = e.target;
    
  }
}

// function to inset edited test to previous test

function insetEditInput() {
  if (!editInput.value) return;
  const newTarget = targetEdit.closest(".todo-box").firstElementChild;
  newTarget.textContent = editInput.value;
  editInputBox.style.display = "none";
  editedLocalStorage();
}
//  function to select delete btn

function deletebtn(e) {
  let items = JSON.parse(localStorage.getItem("calls"));
  if (e.target.classList.contains("delete")) {
    const targetId = e.target.closest(".todo-box").firstElementChild.id;
    
    for (let i = 0; i < items.length; i++) {
      if (items[i].id == targetId) {
        items.splice(i, 1);
      }
    }
    
    e.target.closest(".todo-box").classList.add("hidden");
    setTimeout(()=>e.target.closest(".todo-box").classList.add("remove"),1000)
    deletedSucessMessage();
  }
  
  let item = JSON.stringify(items);
  localStorage.setItem("calls", item);
  
  
}
// function to insert edited value in localStorage

function editedLocalStorage() {
  let items = JSON.parse(localStorage.getItem("calls"));
  for (let i = 0; i < items.length; i++) {
    const targetId = targetEdit.closest(".todo-box").firstElementChild.id;
    if (items[i].id == targetId) {
      items[i].inputValue = editInput.value;
    }
  }
  let item = JSON.stringify(items);
  localStorage.setItem("calls", item);
  editInput.value="";
}

// to close to edited text box
function closeEditText(){
  editInputBox.style.display = "none";
}

deleteAllTodo.addEventListener("click", reset);
document.addEventListener("click", selectEdit);
document.addEventListener("click", deletebtn);
updateBtn.addEventListener("click", insetEditInput);
closeEditedText.addEventListener("click",closeEditText)