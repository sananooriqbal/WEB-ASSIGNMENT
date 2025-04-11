$(document).ready(() => {
    const taskList = $('#dashboardTaskList');
    const taskInput = $('#dashboardTaskInput');
    const addTaskBtn = $('#dashboardAddTaskBtn');

    addTaskBtn.on('click', () => {
        const taskText = taskInput.val().trim();
        if (taskText) {
            const li = `<li class="list-group-item">${taskText}</li>`;
            taskList.append(li).hide().slideDown(300);
            taskInput.val('');
        }
    });
});