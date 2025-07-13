document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');
    const saveBtn = document.getElementById('save-btn');
    const clearBtn = document.getElementById('clear-btn');
    const emptyState = document.getElementById('empty-state');
    
    loadTasks();

    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    saveBtn.addEventListener('click', saveTasks);
    
    clearBtn.addEventListener('click', clearAllTasks);
    
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            createTaskElement(taskText);
            taskInput.value = '';
            updateEmptyState();
        }
    }
    
    function createTaskElement(taskText) {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        
        taskItem.innerHTML = `
            <span class="task-text">${taskText}</span>
            <div class="task-actions">
                <button class="delete-btn"><i class="fas fa-trash"></i></button>
            </div>
        `;
        
        taskList.appendChild(taskItem);
        
        taskItem.querySelector('.delete-btn').addEventListener('click', function() {
            taskItem.classList.add('fade-out');
            setTimeout(() => {
                taskItem.remove();
                updateEmptyState();
            }, 300);
        });
        
        if (taskList.children.length === 1) {
            emptyState.style.display = 'none';
        }
    }
    
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#task-list .task-item .task-text').forEach(task => {
            tasks.push(task.textContent);
        });
        
        const originalText = saveBtn.innerHTML;
        saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        saveBtn.disabled = true;
        
        fetch('save_tasks.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tasks: tasks })
        })
        .then(response => response.text())
        .then(data => {
        
            saveBtn.innerHTML = '<i class="fas fa-check"></i> Saved!';
            setTimeout(() => {
                saveBtn.innerHTML = originalText;
                saveBtn.disabled = false;
            }, 1500);
        })
        .catch(error => {
            console.error('Error:', error);
            saveBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error';
            setTimeout(() => {
                saveBtn.innerHTML = originalText;
                saveBtn.disabled = false;
            }, 1500);
        });
    }
    
    function clearAllTasks() {
        if (taskList.children.length === 0) return;
        
        if (confirm('Are you sure you want to clear all tasks?')) {
        
            const tasks = document.querySelectorAll('.task-item');
            tasks.forEach(task => {
                task.classList.add('fade-out');
                setTimeout(() => {
                    task.remove();
                }, 300);
            });

            setTimeout(updateEmptyState, 350);
        }
    }
    
    function loadTasks() {
        fetch('load_tasks.php')
            .then(response => response.json())
            .then(tasks => {
                if (tasks.length > 0) {
                    emptyState.style.display = 'none';
                    tasks.forEach(taskText => {
                        createTaskElement(taskText);
                    });
                }
            })
            .catch(error => {
                console.error('Error loading tasks:', error);
            });
    }
    
    function updateEmptyState() {
        if (taskList.children.length === 0) {
            emptyState.style.display = 'block';
        } else {
            emptyState.style.display = 'none';
        }
    }
});