// Selectors
const deleteAll = document.querySelector("#deleteAll");
const addItemButton = document.querySelector("#addItemButton");
const inputText = document.querySelector("#input-text");
const ulList = document.querySelector("#list");


// add new item
/* 
              <li
                class="list-group-item list-group-item-action d-flex justify-content-between align-content-center"
              >
                Yemek ye.
                <div class="icon-container">
                  <i class="fa-solid fa-check my-auto me-1 p-1 border border-1 rounded-3 shadow"></i>
                  <i class="fas fa-trash-alt my-auto p-1 border border-1 rounded-3 shadow"></i>
                </div>
              </li>
*/
addItemButton.addEventListener("click", (e) => {
  if (inputText.value.trim() === "") {
    alert("Lütfen bir görev giriniz");
    e.preventDefault();
    return;
  }
  setItemsToLS(inputText.value);
  createItem(inputText.value);
  inputText.value = "";
  e.preventDefault();
});

//load items
loadItems();

// get items from Local Storage
function getItemFromLS() {
  if (!localStorage.getItem("items")) {
    items = [];
  }
  else {
    items = JSON.parse(localStorage.getItem("items"));
  }
  return items;
}

//to define loadItems function
function loadItems() {
  items = getItemFromLS();
  items.forEach(item => {
    createItem(item);
  });
}

// set item to Local Storage
function setItemsToLS(text) {
  items = getItemFromLS();
  items.push(text);
  localStorage.setItem("items", JSON.stringify(items));
}

// delete item from LS
function deleteItemFromLS(text){
  items = getItemFromLS();
  items.forEach(function(item,index){
      if(item === text){
          items.splice(index,1);   
      }
  });
  localStorage.setItem('items',JSON.stringify(items));
}



function createItem(inputText, e) {
  console.log(inputText);
  //create a li element
  const li = document.createElement("li");
  li.classList = "list-group-item list-group-item-action d-flex justify-content-between align-content-center";
  //create text node
  const textNode = document.createTextNode(inputText);
  li.appendChild(textNode);
  //create a div tag
  const div = document.createElement("div");
  div.className = "icon-container"
  div.innerHTML = `
  <i class="fa-solid fa-check my-auto me-1 p-1 border border-1 rounded-3 shadow"></i>
  <i class="fas fa-trash-alt my-auto p-1 border border-1 rounded-3 shadow"></i>`;
  //add div tag to li tag
  li.appendChild(div);
  // add a li tag inside ul tag
  ulList.appendChild(li);
  console.log(li)
}




// toggle an item for check
document.querySelector("ul").addEventListener("click", checkItem);

//checkItem function
function checkItem(e) {
  console.log("tıklandı");
  if (e.target.className === "fa-solid fa-check my-auto me-1 p-1 border border-1 rounded-3 shadow") {
    console.log(e.target)
    e.target.parentElement.parentElement.classList.toggle("checked");
  }
}

// delete an item
document.querySelector("ul").addEventListener("click", deleteItem);
function deleteItem(e) {
  if (e.target.className === "fas fa-trash-alt my-auto p-1 border border-1 rounded-3 shadow") {
    console.log(e.target)
    e.target.parentElement.parentElement.remove();
    deleteItemFromLS(e.target.parentElement.parentElement.textContent);
    console.log(e.target.parentElement.parentElement.textContent);
  }
}

// delete all items from ul
/* const deleteAll = document.querySelector("#deleteAll"); */
deleteAll.addEventListener("click", () => {
  const ulList = document.querySelector("#list");
  while (ulList.firstChild) {
    ulList.removeChild(ulList.firstChild);
  }
  localStorage.clear();
});