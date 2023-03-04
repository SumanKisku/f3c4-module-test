const books = document.getElementById("books");
const bookResultFor = document.getElementById("book-results");
const searchBar = document.getElementById("search-bar");
const search = document.getElementById("search");

// let url = "https://www.googleapis.com/books/v1/volumes?q=harry+potter";

// bookResultFor.innerText = "Book results for";

search.addEventListener("click", (e) => {
    e.preventDefault();
    if (searchBar.value === "") {
        bookResultFor.innerText = "Please enter the book name you are looking for";
    } else {
        let searchTerm = searchBar.value;
        url = "https://www.googleapis.com/books/v1/volumes?q=" + queryMaker(searchTerm);
        bookResultFor.innerText = `Book results for "${searchTerm}"`;

        // render books
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

                // save history in localstorage
                let searchHistory = localStorage.getItem("history") ? JSON.parse(localStorage.getItem("history")) : [];
                let time = new Date();
                let history = {
                    "searchTerm": searchTerm,
                    "date": `${time.toLocaleDateString()}`,
                    "time": `${time.toLocaleTimeString('en-US', {
                        hour: 'numeric', minute: 'numeric', hour12: true
                    })}`
                }
                searchHistory.push(history);
                localStorage.setItem("history", JSON.stringify(searchHistory));

                // last search
                localStorage.setItem("lastSearch", JSON.stringify(history));

            }).catch((err) => {
                bookResultFor.innerText = "Something went wrong, try another book or author";
                books.innerHTML = "";
                console.log("Error", err);
            })
    }
})

function queryMaker(s) {
    s = s.toLowerCase().split(" ").join("+");
    return s;
}
