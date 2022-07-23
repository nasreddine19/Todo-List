import { nanoid } from 'nanoid';

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

const input = document.querySelector<HTMLInputElement>('#task-title');
const form = document.getElementById('form') as HTMLFormElement | null;
const list = document.querySelector('#list-item');

const getItems = <Task>(): Task[] => {
  const taskJSON = localStorage.getItem('tasks');
  if (taskJSON == null) return [];
  return JSON.parse(taskJSON);
};
const tasks: Task[] = getItems();

form?.addEventListener('submit', (e) => {
  e.preventDefault();

  if (input?.value == '' || input?.value == null) return;

  const newTask: Task = {
    id: nanoid(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };
  tasks.push(newTask);
  saveTasks();
  addListItem(newTask);
  input.value = '';
});

const addListItem = (task: Task) => {
  const li = document.createElement('li');
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    saveTasks();
  });
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  label.append(checkbox, task.title);
  li.append(label);
  list?.append(li);
};
tasks.forEach(addListItem);

const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};
