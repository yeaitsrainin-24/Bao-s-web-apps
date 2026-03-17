const taskInput = document.getElementById("taskInput");
const addbtn = document.getElementById("addBtn");
const tasklist = document.getElementById("taskList");
addbtn.addEventListener("click", function(){
    const taskText = taskInput.value.trim();

    if(taskText === ""){
        alert("Please enter a task");
        return;
    }

    const li = document.createElement("li");
    li.textContent = taskText;

    li.addEventListener("click", function(){
        li.classList.toggle("done");
    });
    
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", function(){
        li.remove();
    });

    li.appendChild(deleteBtn);

    taskList.appendChild(li);

    taskInput.value = "";
})