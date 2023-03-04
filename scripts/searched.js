const historyList = document.getElementById("history-list");
const books = document.getElementById("books");

let lastSearch = JSON.parse(localStorage.getItem("lastSearch")) || "";

historyList.innerHTML = `
<div>
<p style="text-transform: capitalize;">1. ${lastSearch.searchTerm}</p>
<p>Searched On: ${lastSearch.date} at ${lastSearch.time}</p>
</div>
`;

if (!lastSearch) {
    historyList.innerHTML = `<h3>Empty here</h3>`;
} else {
    let url = "https://www.googleapis.com/books/v1/volumes?q=" + queryMaker(lastSearch.searchTerm);
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            books.innerHTML = data.items.map((item) => {
                return `
         <div class="book">
                <img src="${item.volumeInfo.imageLinks.thumbnail}" alt="">
                <p class="title">${item.volumeInfo.title}</p>
                <p class="author">${item.volumeInfo.authors}</p>
                <p>Page Count: <span class="page-count">${item.volumeInfo.pageCount}</span></p>
                <p>Publisher: <span class="publisher">">${item.volumeInfo.publisher}</span></p>
                <a href="${item.saleInfo.buyLink}" class="buy btn" target="_blank">Buy Now</a>
            </div>
         `
            }).join("");
        });
}


function queryMaker(s) {
    s = s.toLowerCase().split(" ").join("+");
    return s;
}
