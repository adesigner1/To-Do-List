
let tasks =[];
// html elements
const tasklist = document.getElementById('task-list');
const addTaskInput = document.getElementById('input-task');
const taskCOunter = document.getElementById('task-counter');
const addbutton = document.getElementById('add-button');

//to add task 
function addTaskToDOM(task){
    const li = document.createElement('li');

    
    li.innerHTML=`
    <div>
    <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
    <label for="${task.id}">${task.title}</label>
    </div>
    <i class="delete fa-solid fa-trash" data-id="${task.id}"></i>
    `;
    tasklist.append(li);
}

//To calls the addTaskToDOM function 
function renderList(){
    tasklist.innerHTML='';
    for(let i=0;i<tasks.length;i++){
        addTaskToDOM(tasks[i]);
    }
    taskCOunter.innerHTML=tasks.length;
};
//To add task in the task list
function addTask(task){
    if(task){
        tasks.push(task);
        renderList();
        return;
    }
}

//To delete task
function deleteTask(taskId){
    const newTasks = tasks.filter(function(task){
        return task.id != Number(taskId);
    })
    tasks=newTasks;
    renderList();
}

//For toggle the completed status of task 
function toggleTask(taskId){
    const toggleTasks= tasks.filter(function(task){
        return task.id==Number(taskId)
    });
    if(toggleTasks.length>0){
        const currentTask = toggleTasks[0];
        currentTask.completed=!currentTask.completed;
        renderList();
        if(document.getElementById('uncompleted').style.color=='black'){
            renderUncompleteList();
        }
        else if(document.getElementById('completed').style.color=='black'){
            renderCompleteList();
        }
        return;
    }
}

/*To hide the add button when there is no content in input section.
and will dislay it only when there is some data*/
function typing(){
    if(addTaskInput.value!=""){
        addbutton.classList.replace('add-btn','add-button-active');
    }else{
        addbutton.classList.replace('add-button-active','add-btn');
    }
}


// to display all uncompleted task
function renderUncompleteList(){
    tasklist.innerHTML='';
    const uncompleted_tasks = tasks.filter(function(task){
        return task.completed != true;
    })
    for(let i=0;i<uncompleted_tasks.length;i++){
        addTaskToDOM(uncompleted_tasks[i]);
    }
    taskCOunter.innerHTML=uncompleted_tasks.length;
}

// to display all completed task when user click on completed task
function renderCompleteList(){
    tasklist.innerHTML='';
    const completed_tasks = tasks.filter(function(task){
        return task.completed == true;
    })
    for(let i=0;i<completed_tasks.length;i++){
        addTaskToDOM(completed_tasks[i]);
    }
    taskCOunter.innerHTML=completed_tasks.length;
}

//to mark all tasks completed when click on complete all task
function completeAllTasks(){
    for(let i=0;i<tasks.length;i++){
        tasks[i].completed=true;
    }
    renderList();
}

//To  delete all completed task 
function clearCompletedTasks(){
    const uncompletedTasksList = tasks.filter(function(task){
        return task.completed !=true;
    })
    tasks=uncompletedTasksList;
    renderList();
}


function handleAddButton(){
    const text = addTaskInput.value;
    const task ={
        title : text,
        id : Date.now(),
        completed : false
    }
    addTaskInput.value="";
    addTask(task);
    typing();
}

//To  evaluate on what element did user clicked and will call the respectve function to perform that event.
function handleClickListener(e){
    const target = e.target;
    if(target.className == 'delete fa-solid fa-trash'){
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    }
    else if(target.className=='custom-checkbox'){
        const taskId = target.id;
        toggleTask(taskId);
        return;
    }
    else if(target.id == 'uncompleted'){
        document.getElementById('all').style.color = 'grey';
        document.getElementById('completed').style.color = 'grey';
        document.getElementById('uncompleted').style.color = 'black';
        renderUncompleteList();
        return;
    }
    else if(target.id == 'all'){
        document.getElementById('all').style.color = 'black';
        document.getElementById('completed').style.color = 'grey';
        document.getElementById('uncompleted').style.color = 'grey';
        renderList();
        return;
    }
    else if(target.id == 'completed'){
        document.getElementById('all').style.color = 'grey';
        document.getElementById('completed').style.color = 'black';
        document.getElementById('uncompleted').style.color = 'grey';
        renderCompleteList();
        return;
    }
    else if(target.id == 'complete-all'){
        completeAllTasks();
        return;
    }
    else if(target.id =='clear-complete'){
        clearCompletedTasks();
        return;
    }
}

addbutton.addEventListener('click',handleAddButton);
document.addEventListener('click',handleClickListener);