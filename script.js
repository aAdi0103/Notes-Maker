var cancelbtn = document.querySelector("#cancelbtn");
var content = document.querySelector("#content");
var overlay = document.querySelector("#overlay");
var create = document.querySelector("#create");
var theme = document.querySelector("#Theme");
var main = document.querySelector("#main");
var rem = document.querySelector("#rem");
const title = document.querySelector("#title");
const data = document.querySelector("#data");
const make = document.querySelector("#makebtn");
const cards = document.querySelector("#cards");


overlay.style.display="none";



//storing a default blank array in localStorage if this conditions is true
if (localStorage.getItem("tasks") === null)
    localStorage.setItem("tasks", JSON.stringify([]));

// localStorage is web storage API which stores values without any timelimit it keeps data even if browser is 
// closed or reopened

// sessionStorage is also a web storage API which stores value for a period of a page session

create.addEventListener("click", function () {
    overlay.style.display = "block";
});

cancelbtn.addEventListener("click", function () {
    overlay.style.display = "none";
});

make.addEventListener("click", function () {
    overlay.style.display = "none";
    document.querySelector("#mid").style.opacity = 0;

    let titval = title.value;
    let dataval = data.value;

    // Get the current date
const currentDate = new Date();

// Extract date components
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
const day = currentDate.getDate();

// Create a formatted date string (YYYY-MM-DD)
const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;


    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentTime.getSeconds().toString().padStart(2, '0');

    const formattedTime = `${hours}:${minutes}`;

    var datas = {
        titleval: titval,
        datavalue: dataval,
        date: formattedDate,
        time: formattedTime
    };

    //getting all tasks
    let allPreviousTasks = localStorage.getItem("tasks");

    //parse all tasks to push in that array a new tasks bcz by default in localStorage
    //stringified values are stored and we can't perform push operation in string 
    let allPreviousParsedTasks = JSON.parse(allPreviousTasks);

    //push new tasks
    allPreviousParsedTasks.push(datas);

    //again convert it to string 
    let allPreviousStringifiedTasks = JSON.stringify(allPreviousParsedTasks);

    //again save the new task to localStorage
    localStorage.setItem("tasks", allPreviousStringifiedTasks);

    title.value = "";
    data.value = "";

    printer();
});

function printer() {
    // Getting all tasks stored in localStorage
    const allTasks = localStorage.getItem("tasks");

    // parse all tasks to convert all stringify tasks in array to apply forEach
    const parsedTasks = JSON.parse(allTasks);


    let clutter = "";
    parsedTasks.forEach(function (a, index) {
        clutter += `<div id="card-${index}" class="w-44 p-2 text-base shadow-2xl rounded-md bg-zinc-700">
                        <h3 class="text-[22px] text-yellow-50">${a.titleval}</h3>
                        <p class="text-[15px] mt-2 -mb-2 text-white-300">${a.datavalue}</p>
                        <p class="text-[8px] mt-3 -mb-3  text-white">${a.date} ${a.time}</p>
                        <button onclick="editTask(${index})" class="text-[10px] text-blue-500 ">Edit</button>
                        <button onclick="deleteTask(${index})" class="ml-2 text-[10px] text-red-500">Delete</button>
                    </div>`;
    });

    if (clutter !== "") {
        document.querySelector("#mid").style.opacity = 0;
    }

    cards.innerHTML = clutter;
}

function editTask(index) {
    let allTasks = localStorage.getItem("tasks");
    let parsedTasks = JSON.parse(allTasks);
    let taskToEdit = parsedTasks[index];

    title.value = taskToEdit.titleval;
    data.value = taskToEdit.datavalue;

    deleteTask(index); // Delete the task after editing

    // Show the overlay for editing
    overlay.style.display = "block";
}

function deleteTask(index) {
    let allTasks = localStorage.getItem("tasks");
    let parsedTasks = JSON.parse(allTasks);
    parsedTasks.splice(index, 1);
    let allStringifiedTasks = JSON.stringify(parsedTasks);
    localStorage.setItem("tasks", allStringifiedTasks);

    printer(); // Reprint the tasks after deletion
}

printer();

let flag=false;

theme.addEventListener("click",function(){

   if(flag===false){
    theme.style.backgroundColor="white"
    theme.style.color="black"
    main.style.backgroundColor="rgb(39 39 42)"
    rem.style.color="white"
    // hel.style.backgroundColor="white"
    flag=true;
   }
   else{
    theme.style.backgroundColor="black"
    theme.style.color="white"
    main.style.backgroundColor="rgb(244 244 245)"
    rem.style.color="black"
    flag=false;
   }
})


//things to perform when localstorage work starts

// 1) Save a default blank array in localstorage
// 2) Add an object(which contains value) to array when make button click ho
// 3) Make a function which will extract datas from localStorage and print on screen
