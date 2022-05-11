
const text = document.getElementById("text");
const description = document.getElementById("text2")
const addTaskButton = document.getElementById("add-task-btn");
const saveTaskButton = document.getElementById("save-todo-btn");
const listBox = document.getElementById("listBox");
const saveInd = document.getElementById("saveIndex");
const date1 = document.getElementById("dateInput1");
const date2 = document.getElementById("dateInput2");

function getDifferenceInDays(date1, date2) {

    const dt_date1 = new Date(date1);
    const dt_date2 = new Date(date2);

     date1 = dt_date1.getTime();
     date2 = dt_date2.getTime();

    let calc;

    if (date1 > date2) {
        calc = new Date(date1 - date2);
    } else {
        calc = new Date(date2 - date1);
    }

   return calc;
}



//Tableau qui contient les nouvelles valeurs
let todoArray = [];

//bouton add qui ajoute les tâches avec le titre, la date et le jour restant
addTaskButton.addEventListener("click", (e) => {
    e.preventDefault();
    let todo = localStorage.getItem("todo");
    const remainingDays = getDifferenceInDays(date1, date2);
    if (todo === null) {
        todoArray = [];
    } else {
        todoArray = JSON.parse(todo);
    }
    todoArray.push(`${text.value} ${description.value} ${date1.value} ${date2.value} ${remainingDays.value}`);
    text.value = " ";
    date1.value = "";
    description.value = "";
    date2.value = "";
    remainingDays.value = "";
    localStorage.setItem("todo", JSON.stringify(todoArray));
    displayTodo();
});



//function qui affiche les boutons edit et delete
function displayTodo() {
    let todo = localStorage.getItem("todo");
    if (todo === null) {
        todoArray = [];
    } else {
        todoArray = JSON.parse(todo);
    }
    let htmlCode = "";
    todoArray.forEach((list, ind) => {
        htmlCode += `<div class='flex mb-4 items-center'>
      <p class='w-full text-grey-darkest'>${list}</p>
      <button onclick='edit(${ind})' class='flex-no-shrink p-2 ml-4 mr-2 border-2 rounded text-white text-grey bg-green-600'>Edit</button>
      <button onclick='deleteTodo(${ind})' class='flex-no-shrink p-2 ml-2 border-2 rounded text-white bg-red-500'>Delete</button>
      </div>`;
    });
    listBox.innerHTML = htmlCode;
}

//function du bouton delete
function deleteTodo(ind) {
    let todo = localStorage.getItem("todo");
    todoArray = JSON.parse(todo);
    todoArray.splice(ind, 1);
    localStorage.setItem("todo", JSON.stringify(todoArray));
    displayTodo();
}

//function du bouton edit
function edit(ind) {
    saveInd.value = ind;
    let todo = localStorage.getItem("todo");
    todoArray = JSON.parse(todo);
    text.value = todoArray[ind];
    addTaskButton.style.display = "none";
    saveTaskButton.style.display = "block";
}

//lorsqu'on modifie une tâche et qu'on l'enregistre
saveTaskButton.addEventListener("click", () => {
    let todo = localStorage.getItem("todo");
    todoArray = JSON.parse(todo);
    let id = saveInd.value;
    todoArray[id] = text.value;
    addTaskButton.style.display = "block";
    saveTaskButton.style.display = "none";
    text.value = "";
    localStorage.setItem("todo", JSON.stringify(todoArray));
    displayTodo();
});

//horloge
clock2();

function clock2() {
    const date = new Date();
    const hours = ((date.getHours() + 11) % 12 + 1);
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const hour = hours * 30;
    const minute = minutes * 6;
    const second = seconds * 6;

    document.querySelector('.heure').style.transform = `rotate(${hour}deg)`;

    document.querySelector('.minute').style.transform = `rotate(${minute}deg)`;

    document.querySelector('.seconde').style.transform = `rotate(${second}deg)`;
}

setInterval(clock2, 1000);

//filtre
let filterDiv = document.querySelector('#filterDiv')
let dynamicDiv = document.createElement('div')
dynamicDiv.setAttribute('id', 'clickables')
filterDiv.appendChild(dynamicDiv)
let searchBar = document.createElement('input');
searchBar.type = 'text'
searchBar.placeholder = 'Search';
searchBar.className = 'searchBar';
dynamicDiv.appendChild(searchBar);


searchBar.addEventListener('keyup', (e) => {
    console.log(e);
    const inputLetters = e.target.value.toLowerCase();
    const p = document.querySelectorAll("p");
    console.log(p);
    filterElements(inputLetters, p);
});
function filterElements(letters, elements) {
    if (letters.length > 2) {
        for (let i = 0; i < elements.lenght; i++) {
            if (elements[i].textContent.toLowerCase().includes(letters.toLowerCase)) {
                elements[i].item.style.display = "";


            } else {
                elements[i].item.style.display = "none"
            }
        }
    }
}

