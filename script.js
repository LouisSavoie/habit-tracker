const newHabitButton = document.getElementById('new-habit-button')
const editHabitButton = document.getElementById('edit-habit-button')
const resetHabitButton = document.getElementById('reset-habit-button')
const deleteHabitButton = document.getElementById('delete-habit-button')
const habitNameInput = document.getElementById('habit-name-input')
const habitsList = document.getElementById('habits-list')
const personalStats = document.getElementById('personal-stats')

let habits = {}
let editing = ''
let personal = {
  level: 0,
  points: 0
}

function getLocalStorage() {
  if (localStorage.getItem('habitTracker') === null) {
    localStorage.habitTracker = JSON.stringify({ habits: habits, personal: personal })
  } else {
    let fromStorage = JSON.parse(localStorage.getItem('habitTracker'))
    habits = fromStorage.habits
    personal = fromStorage.personal
  }
}

function save() {
  localStorage.habitTracker = JSON.stringify({ habits: habits, personal: personal })
}

function updateHabitsList() {
  let habitsHTML = ''
  for ([key, habit] of Object.entries(habits)) {
    habitsHTML += `
      <li>
        <div class="habit-header">
          <span id="${key}" onclick="editHabit(this.id)">${habit.name}</span>
          <button onclick="plusHabit('${key}')">+</button>
        </div>
        <div class="habit-stats">
          <i class="fa-solid fa-arrow-up-short-wide"></i>
          <span>${habit.level}</span>
          <i class="fa-solid fa-circle"></i>
          <span>${habit.points}</span>
        </div>
      </li>
    `
  }
  habitsList.innerHTML = habitsHTML
}

function updatePersonalStats() {
  personalStats.innerHTML = `
    <i class="fa-solid fa-arrow-up-short-wide"></i>
    <span>${personal.level}</span>
    <i class="fa-solid fa-circle"></i>
    <span>${personal.points}</span>
  `
}

function editHabit(key) {
  habitNameInput.value = habits[key].name
  editing = key
  editHabitButton.classList.toggle('hide')
  resetHabitButton.classList.toggle('hide')
  deleteHabitButton.classList.toggle('hide')
  newHabitButton.classList.toggle('hide')
}

function plusHabit(key) {
  habits[key].points++
  personal.points++
  if (habits[key].points % 7 === 0) {
    habits[key].level++
    personal.level++
  }
  updateHabitsList()
  updatePersonalStats()
  save()
}

function load() {
  getLocalStorage()
  updateHabitsList()
  updatePersonalStats()
}

newHabitButton.addEventListener('click', () => {
  if (!habitNameInput.value) {return}
  if (habits[habitNameInput.value.toLowerCase()]) {return}
  habits[habitNameInput.value.toLowerCase()] = { name: habitNameInput.value, level: 0, points: 0 }
  habitNameInput.value = ''
  updateHabitsList()
  save()
})

editHabitButton.addEventListener('click', () => {
  if (!habitNameInput.value) {return}
  if (habitNameInput.value === habits[editing].name) {
    editing = ''
    habitNameInput.value = ''
    editHabitButton.classList.toggle('hide')
    resetHabitButton.classList.toggle('hide')
    deleteHabitButton.classList.toggle('hide')
    newHabitButton.classList.toggle('hide')
  } else {
    let oldHabit = habits[editing]
    delete habits[editing]
    habits[habitNameInput.value.toLowerCase()] = { name: habitNameInput.value, level: oldHabit.level, points: oldHabit.points }
    editing = ''
    habitNameInput.value = ''
    updateHabitsList()
    save()
    editHabitButton.classList.toggle('hide')
    resetHabitButton.classList.toggle('hide')
    deleteHabitButton.classList.toggle('hide')
    newHabitButton.classList.toggle('hide')
  }
})

resetHabitButton.addEventListener('click', () => {
  personal.points -= habits[editing].points
  personal.level -= habits[editing].level
  habits[editing].points = 0
  habits[editing].level = 0
  editing = ''
  habitNameInput.value = ''
  updateHabitsList()
  updatePersonalStats()
  save()
  editHabitButton.classList.toggle('hide')
  resetHabitButton.classList.toggle('hide')
  deleteHabitButton.classList.toggle('hide')
  newHabitButton.classList.toggle('hide')
})

deleteHabitButton.addEventListener('click', () => {
  personal.points -= habits[editing].points
  personal.level -= habits[editing].level
  delete habits[editing]
  editing = ''
  habitNameInput.value = ''
  updateHabitsList()
  updatePersonalStats()
  save()
  editHabitButton.classList.toggle('hide')
  resetHabitButton.classList.toggle('hide')
  deleteHabitButton.classList.toggle('hide')
  newHabitButton.classList.toggle('hide')
})

load()
