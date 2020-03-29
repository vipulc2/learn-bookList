class Book {
  constructor(title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {

  addBookToList(book) {
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

  showMessage(msg,color){
    let div = document.createElement("div");
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

  removeBook(target){
    if(target.className === "remove"){
      target.parentElement.parentElement.remove();

      let ui = new UI();

      ui.showMessage("Book Removed!","orange");
      Store.removeBooks(target.parentElement.previousElementSibling.textContent);

    }
  }

  clearFields(){
    document.querySelector(".book").value = "",
    document.querySelector(".author").value = "",
    document.querySelector(".isbn").value = "";
  }

}

// LOCAL STORAGE 
class Store {

  static getBooks(){
    let books;
    if(localStorage.getItem("books")===null){
      books = [];
    }else{
      books= JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static displayBooks(){
    let books = Store.getBooks();

    books.forEach(book => {
      let ui = new UI();

      ui.addBookToList(book);
    });
  }

  static addBooks(book){
    let books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBooks(isbn){
    let books = Store.getBooks();
    books.forEach((book,index) => {
      if(book.isbn === isbn){
        books.splice(index,1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

document.addEventListener("DOMContentLoaded", Store.displayBooks);

// submit button
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

    ui.addBookToList(book);//adds to Book list
    Store.addBooks(book);//Stores to Local Storage
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