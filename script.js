"use-strict";

let delBtn = document.getElementsByClassName("del");
let input = document.querySelector('.list-input')
let doneToDoBtn = document.getElementsByClassName("check-btn");
let addBtn = document.querySelector('.input-button')


document.addEventListener('DOMContentLoaded', getLocalTodos)

//DELETE BTN
for (var i = 0; i < delBtn.length; i++) {
  delBtn[i].addEventListener('click', delItems)
}

function delItems(e) {
  let btnClicked = e.target;
  let todoItem = btnClicked.parentElement.parentElement
  todoItem.remove()
  removeLocalTodos(todoItem)
}

//CHECK OUT THE DONE TASKS
for(var i=0; i < doneToDoBtn.length; i++){
  doneToDoBtn[i].addEventListener('click', checkItems)
}

function checkItems(e) {
  var btnClicked = e.target;
  btnClicked.parentElement.parentElement.parentElement.classList.toggle('checked')
}


//ACTIVATE ADD BUTTON

input.addEventListener('keyup', getInput)

function getInput(e) {
  e.preventDefault()

  let newTodo = input.value;
  if(newTodo) {
    return addBtn.classList.add('active');
  }
  return addBtn.classList.remove('active');
}


//GET THE TODO VALUES
let newTodo = input.value
addBtn.addEventListener('click', addInput)

function addInput() {
  let newTodo = input.value;
  addItems(newTodo)
  
}


//ADD TO DO ITEMS

function addItems(mytodo) {
  let listItemDiv = document.createElement(`div`)
  listItemDiv.classList.add('todo-lists');

  let listContent = `
  <div class="todos">
    <div>
      <span class="check-btn"><i class='bx bx-check-double'></i></span>
      <p>${mytodo}</p>
    </div>
    <span class="del"></i><i class='bx bx-x'></i></span>
  </div>`

  listItemDiv.innerHTML = listContent;
  let listItem = document.getElementsByClassName('todo-lists')[0];
  listItem.append(listItemDiv);

  // add the EventListener
  listItemDiv.getElementsByClassName('check-btn')[0].addEventListener('click', checkItems)
  listItemDiv.getElementsByClassName('del')[0].addEventListener('click', delItems)
  saveLocalTodos(mytodo)
  
  // saveLocalTodos(mytodo)

}

// SAVE LOCAL  STORAGE
function saveLocalTodos(todo) {
  let list;
  if(localStorage.getItem('list') === null) {
    list = [];
  } else {
    list = JSON.parse(localStorage.getItem('list'))
  }
  list.push(todo);
  // console.log(JSON.stringify(list))
  localStorage.setItem('list', JSON.stringify(list))
}


// DISPLAY LOCAL STORAGE ITEM
function getLocalTodos() {
  let list;

  if(localStorage.getItem('list') === null) {
    list = [];
  } else {
    list = JSON.parse(localStorage.getItem('list'))
  }
  list.forEach((todo) => {



    let listItemDiv = document.createElement(`div`)
    listItemDiv.classList.add('todo-lists');

    let listContent = `
    <div class="todos">
      <div>
        <span class="check-btn"><i class='bx bx-check-double'></i></span>
        <p>${todo}</p>
      </div>
      <span class="del"></i><i class='bx bx-x'></i></span>
    </div>`

    listItemDiv.innerHTML = listContent;
    let listItem = document.getElementsByClassName('todo-lists')[0];
    listItem.append(listItemDiv);

    // add the EventListener
    listItemDiv.getElementsByClassName('check-btn')[0].addEventListener('click', checkItems)
    listItemDiv.getElementsByClassName('del')[0].addEventListener('click', delItems)

  })
}


// REMOVE ITEM FROM LOCAL STORAGE

function removeLocalTodos(todo) {
  let list;


  if(localStorage.getItem('list') === null) {
    list = [];
  } else {
    list = JSON.parse(localStorage.getItem('list'))
  }

  // delete the info in the localStorage too so it deletes on reload too
  let listIndex = todo.firstElementChild.lastElementChild.innerText

  //delete only one from the index
  list.splice(list.indexOf(listIndex), 1)

  localStorage.setItem('list', JSON.stringify(list))

}
