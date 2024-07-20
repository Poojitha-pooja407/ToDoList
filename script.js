document.addEventListener('DOMContentLoaded', function () {
    const taskList = document.getElementById('task-list');
    const newTaskInput = document.getElementById('new-task');
    const addTaskBtn = document.getElementById('add-task-btn');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        taskList.innerHTML = '';
        const sortedTasks = [...tasks].sort((a, b) => a.completed - b.completed);
        sortedTasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';

            const taskText = document.createElement('input');
            taskText.type = 'text';
            taskText.value = task.text;
            taskText.readOnly = true;

            const completeBtn = document.createElement('button');
            completeBtn.className = 'complete-btn';
            completeBtn.innerHTML = task.completed ? 'Undo' : 'Complete';
            completeBtn.addEventListener('click', () => {
                tasks[index].completed = !tasks[index].completed;
                localStorage.setItem('tasks', JSON.stringify(tasks));
                renderTasks();
            });

            const editBtn = document.createElement('button');
            editBtn.className = 'edit-btn';
            editBtn.innerHTML = 'Edit';
            editBtn.addEventListener('click', () => {
                taskText.readOnly = false;
                taskText.focus();
                editBtn.style.display = 'none';
                saveBtn.style.display = 'inline-block';
            });

            const saveBtn = document.createElement('button');
            saveBtn.className = 'edit-btn';
            saveBtn.innerHTML = 'Save';
            saveBtn.style.display = 'none';
            saveBtn.addEventListener('click', () => {
                taskText.readOnly = true;
                tasks[index].text = taskText.value;
                localStorage.setItem('tasks', JSON.stringify(tasks));
                renderTasks();
            });

            taskText.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    saveBtn.click();
                }
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.innerHTML = 'Delete';
            deleteBtn.addEventListener('click', () => {
                tasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                renderTasks();
            });

            li.appendChild(taskText);
            li.appendChild(completeBtn);
            li.appendChild(editBtn);
            li.appendChild(saveBtn);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }

    addTaskBtn.addEventListener('click', () => {
        const taskText = newTaskInput.value.trim();
        if (taskText !== '') {
            tasks.push({ text: taskText, completed: false });
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
            newTaskInput.value = '';
        }
    });

    newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskBtn.click();
        }
    });

    renderTasks();
});