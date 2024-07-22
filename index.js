document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.create-task-block');
    const tasksList = document.querySelector('.tasks-list');
    const input = document.querySelector('.create-task-block__input');
    const tasks = [];
    let isDarkTheme = false;
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const taskName = input.value.trim();
      const errorMessageBlock = document.querySelector('.error-message-block');
      if (errorMessageBlock) {
        errorMessageBlock.remove();
      }
  
      if (taskName === '') {
        showError('Название задачи не должно быть пустым');
        return;
      }
  
      if (tasks.some(task => task.name === taskName)) {
        showError('Задача с таким названием уже существует.');
        return;
      }
  
      const taskId = Date.now();
      const task = {
        id: taskId,
        name: taskName
      };
  
      tasks.push(task);
      renderTask(task);
      input.value = '';
    });
  
    function showError(message) {
      const errorElement = document.createElement('span');
      errorElement.classList.add('error-message-block');
      errorElement.textContent = message;
      form.appendChild(errorElement);
    }
  
    function renderTask(task) {
      const taskElement = document.createElement('div');
      taskElement.classList.add('task-item');
      taskElement.dataset.taskId = task.id;
  
      taskElement.innerHTML = `
        <div class="task-item__main-content">
          <span class="task-item__text">${task.name}</span>
        </div>
        <button class="task-item__delete-button">Удалить</button>
      `;
  
      if (isDarkTheme) {
        taskElement.classList.add('dark-theme');
      } else {
        taskElement.classList.add('light-theme');
      }
  
      tasksList.appendChild(taskElement);
    }
  
    const modalOverlay = document.querySelector('.modal-overlay');
    const cancelButton = document.querySelector('.delete-modal__cancel-button');
    const confirmButton = document.querySelector('.delete-modal__confirm-button');
    let taskIdToDelete = null;
  
    tasksList.addEventListener('click', (event) => {
      if (event.target.classList.contains('task-item__delete-button')) {
        const taskElement = event.target.closest('.task-item');
        taskIdToDelete = taskElement.dataset.taskId;
        showDeleteModal();
      }
    });
  
    cancelButton.addEventListener('click', () => {
      hideDeleteModal();
    });
  
    confirmButton.addEventListener('click', () => {
      deleteTask(taskIdToDelete);
      hideDeleteModal();
    });
  
    function showDeleteModal() {
      modalOverlay.classList.remove('modal-overlay_hidden');
    }
  
    function hideDeleteModal() {
      modalOverlay.classList.add('modal-overlay_hidden');
    }
  
    function deleteTask(taskId) {
      const taskIndex = tasks.findIndex(task => task.id === Number(taskId));
      if (taskIndex > -1) {
        tasks.splice(taskIndex, 1);
        const taskElement = tasksList.querySelector(`[data-task-id="${taskId}"]`);
        if (taskElement) {
          taskElement.remove();
        }
      }
    }
  
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        event.preventDefault();
        toggleTheme();
      }
    });
  
    function toggleTheme() {
      isDarkTheme = !isDarkTheme;
      document.body.classList.toggle('dark-theme', isDarkTheme);
      document.body.classList.toggle('light-theme', !isDarkTheme);
  
      document.querySelectorAll('.task-item').forEach(item => {
        item.classList.toggle('dark-theme', isDarkTheme);
        item.classList.toggle('light-theme', !isDarkTheme);
      });
  
      document.querySelectorAll('button').forEach(button => {
        button.classList.toggle('dark-theme', isDarkTheme);
        button.classList.toggle('light-theme', !isDarkTheme);
      });
    }
  
  
    document.body.classList.add('light-theme');
  });
  