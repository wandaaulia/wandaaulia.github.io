document.addEventListener("DOMContentLoaded", function () {

  const submitForm = document.getElementById("inputBook");
  const searchForm = document.getElementById("search_form");
  const rak  = document.getElementById("rak");
  const hasil_search  = document.getElementById("hasil_search");
  const bar_menu = document.getElementById('bar-menu');
  const bar = document.getElementById('bar');

  submitForm.addEventListener("submit", function (event) {   
    event.preventDefault();
        
    if (rak.style.display === "none") {
      rak.style.display = "block";
      hasil_search.style.display = "none";
    }

    addBook();
  });

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    cariBook();
  });

  if (isStorageExist()){
    loadDataFromStorage();
  }

  bar.addEventListener('click', function() {
    bar_menu.classList.toggle("tampil");
  })

});

document.addEventListener("ondatasaved", () => {
  console.log("Data berhasil disimpan.");
});
document.addEventListener("ondataloaded", () => {
  refreshDataFromBooks();
});
