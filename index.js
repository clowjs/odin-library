const myLibrary = [];
const newBookButton = document.querySelector("#btn-add-book");
const bookList = document.querySelector(".book-list");

newBookButton.addEventListener("click", () => {
  const title = prompt("Enter book title");
  const author = prompt("Enter book author");
  const pages = prompt("Enter book pages");

  let haveRead = null
  
  while (haveRead !== "yes" && haveRead !== "no") {
    haveRead = prompt("Have you read this book? (yes/no)");
  }
  
  haveRead = haveRead === "yes" ? true : false;

  const book = new Book(title, author, pages, haveRead);
  addBookToLibrary(book);
  displayBooks();
});

function Book(title, author, pages, haveRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;

  this.info = () => {
    return `"${this.title}" by "${this.author}", ${this.pages} pages, ${
      this.haveRead ? "have read" : "not read yet"
    }`;
  };
};

function addBookToLibrary(book) {
  myLibrary.push(book);
  displayBooks();
}

function toggleHaveRead(book) {
  book.haveRead = !book.haveRead;
  displayBooks();
}

function removeBookFromLibrary(book) {
  myLibrary.splice(myLibrary.indexOf(book), 1);
}

function displayBooks() {
  bookList.innerHTML = "";

  myLibrary.forEach(book => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book");

    const bookInfo = document.createElement("div");
    bookInfo.classList.add("book-info");

    const bookTitle = document.createElement("h2");
    bookTitle.textContent = book.title;

    const bookDetails = document.createElement("div");
    bookDetails.classList.add("details");

    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = book.author;

    const bookPages = document.createElement("p");
    bookPages.textContent = `${book.pages} pages`;

    const haveRead = document.createElement("button");
    haveRead.textContent = book.haveRead ? "Read" : "Not read";
    haveRead.classList.add("have-read");
    haveRead.style.backgroundColor = book.haveRead ? "#36a336" : "#dc3545";
    haveRead.addEventListener("click", () => {
      toggleHaveRead(book);
    });

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
      removeBookFromLibrary(book);
      displayBooks();
    });

    bookDetails.appendChild(bookAuthor);
    bookDetails.appendChild(bookPages);

    bookInfo.appendChild(bookTitle);
    bookInfo.appendChild(bookDetails);

    bookCard.appendChild(bookInfo);
    bookCard.appendChild(haveRead);
    bookCard.appendChild(removeButton);

    bookList.appendChild(bookCard);
  });
}