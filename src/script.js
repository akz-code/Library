//* Variables útiles

const buttonAddBook = document.querySelector("#buttonAddBook");
const buttonClose = document.querySelector("#buttonClose");
const buttonSave = document.querySelector("#buttonSave");

const modal = document.querySelector("#modal");
const formContainer = document.querySelector("#form-container");
const form = document.querySelector("#form");
const bookGrid = document.querySelector("#book-grid");

//* Clases

class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    this.books.push(newBook);

    this.displayBooks()
  }

  displayBooks() {
    bookGrid.innerHTML = ""; //esto limpia el contenedor de los libros
    this.books.forEach((book, index) => {
      const cardBook = document.createElement("div");

      cardBook.classList.add(
        "flex",
        "flex-col",
        "item-center",
        "justify-center",
        "gap-2",
        "p-3",
        "rounded-lg",
        "shadow-sm",
        "shadow-slate-500",
        "bg-slate-200"
      );

      const readClass = book.isRead
        ? "bg-green-400 text-green-950 text-center m-auto py-2 px-6 rounded-xl w-max shadow-sm shadow-black font-semibold active:scale-95 active:shadow-none"
        : "bg-red-400 text-red-950 text-center m-auto py-2 px-6 rounded-xl w-max shadow-sm shadow-black font-semibold active:scale-95 active:shadow-none";

      cardBook.innerHTML = `
      <h3 class="text-center text-lg font-bold p-2">"${book.title}"</h3>
      <p class="text-center italic font-semibold p-2">${book.author}</p>
      <p class="text-center p-2">Pages: ${book.pages}</p>
      <button class="${readClass}" onclick="myLibrary.toggleReadStatus(${index})">${
        book.isRead ? "Read" : "Unread"
      }</button>
      <button class="text-center m-auto py-1 px-3 rounded-xl w-max bg-red-700 text-white font-semibold active:scale-105" onclick="myLibrary.deleteBook(${index})">Delete</button>`;

      bookGrid.appendChild(cardBook)

      console.log(this.books);
    });
  }

  toggleReadStatus(index){
    this.books[index].isRead = !this.books[index].isRead
    this.displayBooks()
  }

  deleteBook(index){
    this.books.splice(index, 1)
    this.displayBooks()
  }
}

const myLibrary = new Library();  // Crea una instancia de la clase Library, que contiene las instancias de la clase Book en un array, esta es la instancia que se va modificando en dependencia de las accione del usuario


//* Lógica para la ventana modal

const openModal = () => {
  modal.classList.remove("opacity-0");
  modal.classList.add("opacity-100");
  modal.classList.remove("-z-10");
  formContainer.classList.remove("scale-0");
  formContainer.classList.add("scale-100");
};

const closeModal = () => {
  modal.classList.add("opacity-0");
  modal.classList.remove("opacity-100");
  // modal.classList.add("-z-10");
  formContainer.classList.add("scale-0");
  formContainer.classList.remove("scale-100");
  form.reset();
  setTimeout(() => {
    modal.classList.add("-z-10"); // Para que se muestre la animación al cerrar la ventana modal
  }, 500);
};

// Botones

buttonAddBook.addEventListener("click", openModal);

buttonClose.addEventListener("click", closeModal);



form.addEventListener("submit", (e) => {
  e.preventDefault(); // evitar la recarga de la página cuando se envía el form

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("read").checked;



  if (title !== "" && pages !== "" && author !== "") {
    myLibrary.addBook(title, author, pages, isRead);
    closeModal();
    form.reset(); //reset es un método de js para reiniciar formularios
  }
});
