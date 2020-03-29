// BOOK CONSTRUCTOR
function Book(title,author,isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI CONSTRUCTOR 
function UI(){}

//  ADDING BOOK TO LIST
UI.prototype.addBookToList = book => {
  let list = document.querySelector(".book-list");
  
  // CREATE ROW
  let row = document.createElement("tr");
  row.innerHTML = 
  ` <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a class="remove" href="#">X</a></td>
  `
  list.appendChild(row);
}

UI.prototype.showMessage = (msg,color) => {

  let div =document.createElement("div");
  div.className = `msg ${color}`;
  div.textContent = msg;
  
  // CONTAINER IS PARENT WHICH WE WILL USE TO INSERT THE div
  // THE div WILL BE ADDED BEFORE sectionAdd IN container PARENT
  let container = document.querySelector(".container"),
      sectionAdd = document.querySelector(".section-add");

  container.insertBefore(div,sectionAdd); // first parameter is the element you want to insert and the second parameter is what the first element will come before of in relation.
  
  // TIMEOUT
  setTimeout(()=>{
    document.querySelector(".msg").remove();

  },2000);

}

// REMOVE BOOK PROTOTYPE
UI.prototype.removeBook = target => {
  if(target.className === "remove"){
    target.parentElement.parentElement.remove();

    let ui = new UI();
    ui.showMessage("Book Removed!","orange");
  }
}


// CLEAR ALL FIELDS
UI.prototype.clearFields = () => {
  document.querySelector(".book").value = "",
  document.querySelector(".author").value = "",
  document.querySelector(".isbn").value = "";
}

// SUBMIT BUTTON
document.querySelector("form").addEventListener("submit", e => {

  let title = document.querySelector(".book").value,
      author = document.querySelector(".author").value,
      isbn = document.querySelector(".isbn").value;

  let book = new Book(title,author,isbn);

  let ui = new UI();

  // VALIDATE DATA
  if(title === "" || author === "" || isbn === ""){

    ui.showMessage("Please fill all fields","red")

  }else{

    ui.addBookToList(book);
    ui.clearFields();
    ui.showMessage("Book Added!","green");

  }

  e.preventDefault();
});

// REMOVE BOOKS CLICK EVENT
document.querySelector(".section-show").addEventListener("click", e => {

  let ui = new UI();

  ui.removeBook(e.target);

  e.preventDefault();
});