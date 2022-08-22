const newHabitButton = document.getElementById('new-habit-button')
const editHabitButton = document.getElementById('edit-habit-button')
const habitNameInput = document.getElementById('habit-name-input')
const habitsList = document.getElementById('habits-list')

let habits = {}
let editing = ''

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

function editHabit(key) {
  habitNameInput.value = habits[key].name
  editing = key
  editHabitButton.classList = ''
  newHabitButton.classList = 'hide'
}

function plusHabit(key) {
  habits[key].points++
  if (habits[key].points % 7 === 0) { habits[key].level++ }
  updateHabitsList()
}

newHabitButton.addEventListener('click', () => {
  if (!habitNameInput.value) {return}
  if (habits[habitNameInput.value.toLowerCase()]) {return}
  habits[habitNameInput.value.toLowerCase()] = { name: habitNameInput.value, level: 0, points: 0 }
  habitNameInput.value = ''
  updateHabitsList()
})

editHabitButton.addEventListener('click', () => {
  if (!habitNameInput.value) {return}
  if (habitNameInput.value === editing) {
    editing = ''
    habitNameInput.value = ''
    editHabitButton.classList = 'hide'
    newHabitButton.classList = ''
  } else {
    let oldHabit = habits[editing]
    delete habits[editing]
    habits[habitNameInput.value.toLowerCase()] = { name: habitNameInput.value, level: oldHabit.level, points: oldHabit.points }
    editing = ''
    habitNameInput.value = ''
    updateHabitsList()
    editHabitButton.classList = 'hide'
    newHabitButton.classList = ''
  }
})
