const UNCOMPLETED_book_id = "incompleteBookshelfList";
const COMPLETED_book_id = "completeBookshelfList";
const Books_id = "bookId";


function makeBook(title, author, year, isCompleted) {
  const textTitle = document.createElement("h3");
  textTitle.innerText = title;
 
  const textPenulis = document.createElement("p");
  textPenulis.innerText = author;

  const textTahun = document.createElement("p");
  textTahun.innerHTML = `<span id="year">` + year + `</span>`;
 
  const container = document.createElement("article");
  container.classList.add("book_item");

  const books_item_info = document.createElement("div");
  books_item_info.classList.add("books_item_info");

  const containerTombol = document.createElement("div");
  containerTombol.classList.add("action");

  books_item_info.append(textTitle, textPenulis, textTahun);

  container.append(books_item_info);

  if (isCompleted) {
    containerTombol.append(createUndoButton(), createTrashButton());
    container.append(containerTombol);
  } else {
    containerTombol.append(createCheckButton(), createTrashButton());
    container.append(containerTombol);
  }

  return container;
}

function makeSearchBook(title, author, year, isCompleted) {
  const container = document.createElement("div");
  container.classList.add("search_info");

  const info_baca = document.createElement("div");
  info_baca.classList.add("info_baca");

  const simbol_no_baca = document.createElement("div");
  simbol_no_baca.classList.add("merah");

  const simbol_baca = document.createElement("div");
  simbol_baca.classList.add("hijau");

  const baca = document.createElement("h4");
  baca.innerText = "selesai dibaca";
    
  const no_baca = document.createElement("h4");
  no_baca.innerText = "belum dibaca";
 
  const textTitle = document.createElement("h3");
  textTitle.innerText = title;

  const textPenulis = document.createElement("p");
  textPenulis.innerText = "Penulis : " + author;

  const textTahun = document.createElement("p");
  textTahun.innerHTML = `<span id="year"> Tahun : ` + year + `</span>`; 
 
  const search_item = document.createElement("article");
  search_item.classList.add("search_item");

  search_item.append(textTitle, textPenulis, textTahun);

  if (isCompleted) {
    info_baca.append(simbol_baca, baca);
    container.append(search_item, info_baca);
  } else {
    info_baca.append(simbol_no_baca, no_baca);
    container.append(search_item, info_baca);
  }

  return container;
}

function createbtn(buttonTypeClass, text, eventListener) {
  const button = document.createElement("button");
  button.innerText = text;

  button.classList.add(buttonTypeClass);

  button.addEventListener("click", function (event) {
    eventListener(event);
  });
  return button;
}

function createCheckButton() {
  return createbtn("btn-baca", 'selesai dibaca', function (event) {
    addTaskToCompleted(event.target.parentElement.parentElement);
  });
}

function createTrashButton() {
  return createbtn("delete", 'hapus', function (event) {
    removeTaskFromCompleted(event.target.parentElement.parentElement);
  });
}

function createUndoButton() {
  return createbtn("btn-nobaca", 'belum dibaca', function (event) {
    undoTaskFromCompleted(event.target.parentElement.parentElement);
  });
}

function addBook() {
  const uncompletedBook = document.getElementById(UNCOMPLETED_book_id);
  const listCompleted = document.getElementById(COMPLETED_book_id);
  const bookTitle = document.getElementById("inputBookTitle");
  const bookAuthor = document.getElementById("inputBookAuthor");
  const bookYear = document.getElementById("inputBookYear");
  const inputBookIsComplete = document.getElementById("inputBookIsComplete");
  const boxSearch = document.getElementById("boxSearch");
  const pesan = document.getElementById("pesan");

  const book = makeBook(bookTitle.value, bookAuthor.value, bookYear.value, inputBookIsComplete.checked);
  const bookObject = composeBookObject(bookTitle.value, bookAuthor.value, bookYear.value, inputBookIsComplete.checked);

  book[Books_id] = bookObject.id;
  books.push(bookObject);

  if (inputBookIsComplete.checked) {
    listCompleted.append(book);
  } else {
    uncompletedBook.append(book);
  }
  updateDataToStorage();

  bookTitle.value = "";
  bookAuthor.value = "";
  bookYear.value = "";
  inputBookIsComplete.checked = "";
  boxSearch.value = "";
  boxSearch.innerText = "";
  pesan.innerText = "";
}

function addTaskToCompleted(taskElement) {
  const bookTitle = taskElement.querySelector(".book_item > .books_item_info > h3").innerText;
  const bookAuthor = taskElement.querySelector(".book_item > .books_item_info > h3").innerText;
  const bookYear = taskElement.querySelector("span#year").innerText;
  const pesan = document.getElementById("pesan");
  const listCompleted = document.getElementById(COMPLETED_book_id);
  const boxSearch = document.getElementById("boxSearch");

  const newBook = makeBook(bookTitle, bookAuthor, bookYear, true);
  const book = findBook(taskElement[Books_id]);

  book.isCompleted = true;
  newBook[Books_id] = book.id;

  listCompleted.append(newBook);

  taskElement.remove();

  pesan.innerText = "";
  boxSearch.value = "";
  boxSearch.innerText = "";


  updateDataToStorage();
}

function removeTaskFromCompleted(taskElement) {
  const bookTitle = taskElement.querySelector(".book_item > .books_item_info > h3").innerText;
  const pesan = document.getElementById("pesan");
  const boxSearch = document.getElementById("boxSearch");

  pesan.innerHTML = "";

  const bookPosition = findBookIndex(taskElement[Books_id]);
  books.splice(bookPosition, 1);

  const notif = document.createElement("p");
  notif.innerHTML = "<p>" + bookTitle + " berhasil dihapus <p>";

  pesan.append(notif);

  taskElement.remove();
  boxSearch.value = "";
  boxSearch.innerText = "";


  updateDataToStorage();
}

function undoTaskFromCompleted(taskElement){
  const listUncompleted = document.getElementById(UNCOMPLETED_book_id);
  const bookTitle = taskElement.querySelector(".book_item > .books_item_info > h3").innerText;
  const bookAuthor = taskElement.querySelector(".book_item > .books_item_info > h3").innerText;
  const bookYear = taskElement.querySelector("span#year").innerText;
  const pesan = document.getElementById("pesan");
  const boxSearch = document.getElementById("boxSearch");

  const newBook = makeBook(bookTitle, bookAuthor, bookYear, false);
  const book = findBook(taskElement[Books_id]);

  book.isCompleted = false;
  newBook[Books_id] = book.id;

  listUncompleted.append(newBook);
  taskElement.remove();

  pesan.innerText = "";
  boxSearch.value = "";
  boxSearch.innerText = "";
 
  updateDataToStorage();
}

function cariBook() {
  const searchBookTitle = document.getElementById("search_judul");
  const searchBook = document.getElementById("boxSearch");
  const pesan = document.getElementById("pesan");

  searchBook.innerText = "";

  const bookk = filterBook(searchBookTitle.value.toLowerCase());

  if (bookk === null) {
    searchBook.innerHTML = "<p class='font-merah'> data tidak ditemukan </p>";
    searchBookTitle.value = "";
  } else {
    for (book of bookk) {
      const newBook = makeSearchBook(book.title, book.author, book.year, book.isCompleted);
      newBook[Books_id] = book.id;

      searchBook.append(newBook);
      searchBookTitle.value = "";
    }

  }

  pesan.innerText = "";

  updateDataToStorage();
}
