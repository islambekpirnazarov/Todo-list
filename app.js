const formTask = document.querySelector("form")
const inputTask = document.querySelector("#input")
const list = document.querySelector("#list")
const itemNum = document.querySelector('.items-number')
const active = document.querySelector('.active')
const complate = document.querySelector('.complated')
const clearComplate = document.querySelector('.clear-complated')
const all = document.querySelector('.all')
const darkLight = document.querySelector('.dark-light__icon')
let todos = []
let activeTodos = []
let complateTodos = []

const regEx = /^.{3,40}$/

if(!localStorage.getItem("todos")){
    localStorage.setItem('todos', JSON.stringify(todos))
} else {
    todos = JSON.parse(localStorage.getItem('todos'))
}


// Get Renders Todo function
function getRenderTodos(array) {
    list.innerHTML = ""
    if(array.length > 0) {
    array.forEach((element, index) => {
            list.innerHTML += `
                <li>
                    <div class="todo-message">
                    <span class="${element.complate ? "active" : ""}" onclick="complateTodo(${index})">
                        <img src="./images/icon-check.svg" alt="" class="dark-check">
                        <img src="./images/icon-check copy.svg" alt="" class="light-check">
                    </span>
                    <div>${element.title}</div>
                    </div>
                    <button class="btn" onclick="deleteTodo(${index})">
                    <img src="./images/icon-cross.svg" alt="">
                    </button>
                </li>
            `
        })
    }
    else list.innerHTML = `<div style="text-align: center; padding: 15px;" class="not-found">Is not found</div>`
}
getRenderTodos(JSON.parse(localStorage.getItem('todos')))

// Set Todo Data
function setTodo(message) {
    const newTodo = {
        title : message,
        complate : false
    }
    todos.push(newTodo)
    localStorage.setItem('todos', JSON.stringify(todos))
    getRenderTodos(todos)
    itemNumFilter(todos)
}
function itemNumFilter (array) {
    itemNum.innerHTML = `${array.length} items left`
}
// Delete Todo 
function deleteTodo(id) {
    todos = todos.filter(item => todos.indexOf(item) !== id)
    localStorage.setItem('todos', JSON.stringify(todos))
    getRenderTodos(todos)
    itemNumFilter(todos)
}
// Complated Todo 
function complateTodo(id) {
    todos = todos.map(item => {
        if(todos.indexOf(item) === id) {
            return {...item, complate : item.complate ? false : true}
        }
        else return item
    })
    localStorage.setItem('todos', JSON.stringify(todos))
    getRenderTodos(todos)
    itemNumFilter(todos)
}

// Form task events

formTask.addEventListener('submit', (e) => {
    e.preventDefault()
    if(regEx.test(inputTask.value) && inputTask.value.trim().length > 2){
        setTodo(inputTask.value)
    }
    formTask.reset()
})

// Todos filter 

function complatedTodo() {
    complateTodos = todos.filter(item => {
        if(!item.complate) {
            return item
        }
    })
    localStorage.setItem('todos', JSON.stringify(todos))
    getRenderTodos(complateTodos)
    itemNumFilter(complateTodos)
}
complate.addEventListener('click', () => {
    activeTodos = todos.filter(item => {
        if(item.complate) {
            return item
        }
    })
    localStorage.setItem('todos', JSON.stringify(todos))
    getRenderTodos(activeTodos)
    itemNumFilter(activeTodos)
})


clearComplate.addEventListener('click', () => {
    complatedTodo()
})
active.addEventListener('click', () => {
    complatedTodo()
})

all.addEventListener('click', () => {
    localStorage.setItem('todos', JSON.stringify(todos))
    getRenderTodos(todos)
    itemNumFilter(todos)
})


darkLight.addEventListener('click', () => {
    document.body.classList.toggle("active")
})