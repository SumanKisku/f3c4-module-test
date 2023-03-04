const historyList = document.getElementById("history-list");
const clear = document.getElementById("clear");

let history = JSON.parse(localStorage.getItem("history")) || [];

if(history.length == 0) {
    historyList.innerHTML = `<h3>No search history available, try something to search</h3>`;
} else {
    historyList.innerHTML = history.map((item, index) => {
        return `
        <div>
        <p style="text-transform: capitalize;">${++index}. ${item.searchTerm}</p>
        <p>Searched On: ${item.date}</span> at ${item.time}</p>
    </div>
    `
}).join("");
}

// clear search history
clear.addEventListener("click", ()=> {
    localStorage.removeItem("history");
    historyList.innerHTML =  `<h3 style="text-align:center;">Search History cleared</h3>`;
    setTimeout(()=> {
        historyList.innerHTML = "";
    }, 1000)
})