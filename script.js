// --- Calendar Logic ---
const monthYear = document.getElementById("monthYear");
const daysEl    = document.getElementById("calendarDays");
let currDate   = new Date();

function renderCalendar() {
  const year  = currDate.getFullYear();
  const month = currDate.getMonth();
  monthYear.textContent = currDate.toLocaleString("default", { month:"long", year:"numeric" });

  // First day and number of days in month
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth   = new Date(year, month+1, 0).getDate();

  // Previous month tail
  const prevDays = new Date(year, month, 0).getDate();
  let html = "";

  for(let x = firstDayIndex; x > 0; x--) {
    html += `<div class="inactive">${prevDays - x + 1}</div>`;
  }
  // Current month days
  for(let i = 1; i <= daysInMonth; i++) {
    const isToday = i === new Date().getDate() &&
                    month === new Date().getMonth() &&
                    year === new Date().getFullYear();
    html += `<div class="${isToday ? "today" : ""}">${i}</div>`;
  }
  daysEl.innerHTML = html;
}

document.getElementById("prevMonth").onclick = () => {
  currDate.setMonth(currDate.getMonth() - 1);
  renderCalendar();
};
document.getElementById("nextMonth").onclick = () => {
  currDate.setMonth(currDate.getMonth() + 1);
  renderCalendar();
};

renderCalendar();

// --- To‑Do List Logic ---
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filters = document.querySelectorAll(".filters button");
const footer = document.getElementById("footer");

let tasks = [];

// Add task
addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if(!text) return;
  tasks.push({ text, completed: false });
  taskInput.value = "";
  updateTasks();
});

// Toggle completed
taskList.addEventListener("change", e => {
  if(e.target.matches("input[type=checkbox]")) {
    const idx = e.target.dataset.index;
    tasks[idx].completed = e.target.checked;
    updateTasks();
  }
});

// Filter tasks
filters.forEach(btn => btn.addEventListener("click", () => {
  filters.forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  updateTasks();
}));

// Render & filter
function updateTasks() {
  const filter = document.querySelector(".filters button.active").dataset.filter;
  taskList.innerHTML = "";
  let countDone = 0;

  tasks.forEach((t,i) => {
    if(filter === "active" && t.completed) return;
    if(filter === "completed" && !t.completed) return;
    const li = document.createElement("li");
    li.className = t.completed ? "completed" : "";
     li.innerHTML = `
      <div class="left">
        <input type="checkbox" data-index="${i}" ${t.completed ? "checked":""}>
        <span>${t.text}</span>
      </div>
      <div class="menu" data-index="${i}">
        ⋮
        <div class="menu-list">
          <div class="menu-item remove-task" data-index="${i}">Remove Task</div>
        </div>
      </div>
    `;
    taskList.appendChild(li);
    if(t.completed) countDone++;
  });

  footer.textContent = `${countDone} of ${tasks.length} tasks done`;
}

// initialize
updateTasks();

// — Toggle dropdown on menu click
taskList.addEventListener("click", e => {
  const menuEl = e.target.closest(".menu");
  if (menuEl) {
    const dropdown = menuEl.querySelector(".menu-list");
    document.querySelectorAll(".menu-list.show")
      .forEach(dl => { if (dl !== dropdown) dl.classList.remove("show"); });
    dropdown.classList.toggle("show");
  }
});

// — Remove task when clicking 'Remove Task'
taskList.addEventListener("click", e => {
  if (e.target.matches(".remove-task")) {
    const idx = Number(e.target.dataset.index);
    tasks.splice(idx, 1);
    updateTasks();
  }
});

// — Close menu if clicked outside
document.addEventListener("click", e => {
  if (!e.target.closest(".menu")) {
    document.querySelectorAll(".menu-list.show")
      .forEach(dl => dl.classList.remove("show"));
  }
});









