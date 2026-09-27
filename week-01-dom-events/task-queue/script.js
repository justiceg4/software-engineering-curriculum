const taskForm = document.querySelector("#taskForm");
const taskTracker = document.querySelector("#taskRem");
const taskList = document.querySelector("#taskList");

let taskCount = 0;

taskForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const taskInput = taskForm.elements.task;

    if (taskInput.value.trim() !== '') {

        const newTask = document.createElement('li');

        newTask.append(taskInput.value);
        taskList.append(newTask);
        ++taskCount;
        updateTaskCount();
        taskInput.value = '';
    }
});

taskList.addEventListener('click', function (e) {
    if (e.target.nodeName === 'LI' && !e.target.classList.contains('completed')) {
        e.target.classList.add('completed');
        e.target.prepend('✓ ');
        --taskCount;
        updateTaskCount();
    }
});

function updateTaskCount() {
    taskTracker.innerText = `Task Remaining: ${taskCount}`;
}