console.log("Frontend JS connected");
// symbolInput.value = "AAPL";
// symbolInput.value = "TSLA";
// symbolInput.value = "MSFT";
// symbolInput.value = "GOOGL";
// symbolInput.value = "NVDA";

const searchBtn = document.getElementById("searchBtn");
const symbolInput = document.getElementById("symbolInput");
const stockContainer = document.getElementById("stockContainer");

searchBtn.addEventListener("click", async() => {
    console.log("Button clicked ");
    let symbolInput = document.getElementById("symbolInput");
    const symbol = symbolInput.value.toUpperCase().trim();
    console.log(symbol);

        fetchStock(symbol);
});

// function displayStock(data) {

//     const stock = data["Global Quote"];

//     stockContainer.innerHTML = "";

//     for (let key in stock) {

//         stockContainer.innerHTML += `

//             <strong>${key}</strong> : ${stock[key]} <br><br>
        
//         `;
//     }

// }


function displayStock(data) {

    const stock = data["Global Quote"];

    const change = stock["09. change"].trim();

    const changeClass = change.startsWith("-")  ?  "negative" : "positive";
    console.log(change);
    console.log(changeClass);

    stockContainer.innerHTML = `

        <div class="stock-card">

            <h2>${stock["01. symbol"]}</h2>

            <h1>$${stock["05. price"]}</h1>

            <p class="${changeClass}">
                Change: ${stock["09. change"]}
                (${stock["10. change percent"]})
            </p>

            <hr>

            <p>Open: ${stock["02. open"]}</p>

            <p>High: ${stock["03. high"]}</p>

            <p>Low: ${stock["04. low"]}</p>

            <p>Previous Close: ${stock["08. previous close"]}</p>

            <p>Volume: ${stock["06. volume"]}</p>

        </div>

    `;
}


const exampleButtons = document.querySelectorAll(".examples button");
console.log(exampleButtons);

exampleButtons.forEach((button) => {
    button.addEventListener("click", async() => {
        // console.log(button.innerHTML);
        // console.log(button.textContent);        // this is more safer to use than using innerHTML
        const symbol = button.textContent;
        console.log(symbol);

        fetchStock(symbol);
    });
});

async function fetchStock(symbol) {

    try {

        const response = await fetch(`/stock/${symbol}`);

        const data = await response.json();

        console.log(data);

        displayStock(data);

    }

    catch(err) {

        console.log(err);

    }

}