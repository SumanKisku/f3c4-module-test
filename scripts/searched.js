const historyList = document.getElementById("history-list");
const books = document.getElementById("books");

let lastSearch = JSON.parse(localStorage.getItem("lastSearch"));
console.log(lastSearch);

historyList.innerHTML = `
<div>
<p style="text-transform: capitalize;">1. ${lastSearch.searchTerm}</p>
<p>Searched On: ${lastSearch.date} at ${lastSearch.time}</p>
</div>
`;