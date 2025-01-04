const lists = document.querySelector(".list");
const inputs = document.querySelector(".input");
const taskCounter = document.querySelector(".task");



// function isRepeat(inputValue) {
//     const listItems = lists.children;
//     for(let i= 0 ; i < listItems.length ; i++){
//         if(listItems[i].textContent.trim() === inputValue.trim()){
//             return true;
//     }
// }
//     return false;
// }
function isRepeat(inputValue) {
  const items = lists.getElementsByTagName("li");
  for (let li of items) {
    if (
      !li.classList.contains("checked") &&
      li.childNodes[0].textContent.trim() === inputValue.trim()
    ) {
      return true;
    }
  }
  return false;
}

function addTask() {
    if (inputs.value === ``) {
      alert(`Enter the Task first!`);
    } else if (isRepeat(inputs.value)) {
      alert(`Task already exists!`);
    } else {
      let li = document.createElement(`li`);
      let text = document.createTextNode(inputs.value);
      li.appendChild(text);

      let deleteSpan = document.createElement(`span`);
      deleteSpan.innerHTML = `&#x1F5D1`;
      deleteSpan.addEventListener(`click`, function () {
        li.remove();
        taskCount();
        saveData(); 
      });
      li.appendChild(deleteSpan);

      let editSpan = document.createElement(`span`);
      editSpan.innerHTML = `&#x270E`;
      editSpan.addEventListener(`click`, function () {
        editTask(li, text);
      });
      li.appendChild(editSpan);

      lists.appendChild(li);
      inputs.value = ``;
      taskCount();
      saveData();
    }
   
}

function editTask (li , text){
    let taskText = text.textContent;
    let editInput = document.createElement(`input`);
    editInput.type = `text`;
    editInput.value = taskText;
   
   

    li.innerHTML = ``;
    li.appendChild(editInput);

    let saveBTn = document.createElement(`button`);
    saveBTn.textContent = `Save`;
    saveBTn.addEventListener(`click` ,function (){
      saveTask(editInput , li , text)
       
    });
    li.appendChild(saveBTn);


}

function saveTask (editInput , li , text) {
  let newText = editInput.value;
  let isChecked = li.classList.contains("checked");

  if(isRepeat(newText)){
    alert("You already have this task");
  }else{
    text.textContent = newText;

    li.innerHTML = ``;
    li.appendChild(text);

    let deleteSpan = document.createElement(`span`);
    deleteSpan.innerHTML = `&#x1F5D1`;
    deleteSpan.addEventListener(`click`, function () {
      li.remove();
      taskCount();
      saveData();
  });
  li.appendChild(deleteSpan);

  let editSpan = document.createElement(`span`);
  editSpan.innerHTML = `&#x270E`;
  editSpan.addEventListener(`click` , function() {
    editTask(li , text);
  });
  li.appendChild(editSpan);

  if(isChecked){
    li.classList.add(`checked`);
  }
  taskCount();
  saveData();

  }

}

lists.addEventListener(`click`, function (e) {
  if (e.target.tagName === `LI`) {
    e.target.classList.toggle(`checked`);
    taskCount();
    saveData();
  }
});

function taskCount() {
  const taskCount = lists.children.length;
  const completeTask = lists.querySelectorAll(`.checked`).length;
  taskCounter.textContent = `You have  ${taskCount - completeTask} task(s) to complete`;
}

function saveData (){
  localStorage.setItem(`data` , lists.innerHTML);
}

function showData() {
  lists.innerHTML = localStorage.getItem("data") || "";
  // Re-add event listeners for edit and delete buttons after loading from storage
  const items = lists.getElementsByTagName("li");
  for (let li of items) {
    const text = li.childNodes[0];
    const deleteSpan = li.querySelector("span:first-of-type");
    const editSpan = li.querySelector("span:last-of-type");

    deleteSpan.addEventListener("click", function () {
      li.remove();
      taskCount();
      saveData();
    });

    editSpan.addEventListener("click", function () {
      editTask(li, text);
    });
  }
}

showData();
taskCount();

inputs.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});