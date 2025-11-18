/* ------------------------------
   PAGE SECTION SWITCHER
--------------------------------*/

function openSection(id) {
    document.querySelectorAll('.section').forEach(sec => sec.style.display = "none");

    document.getElementById(id).style.display = "block";
    document.getElementById("pageTitle").innerText = id.toUpperCase();
}

/* ------------------------------
   LIVE FINANCE (STOCK SIMULATION)
--------------------------------*/

let stockCtx = document.getElementById("stockChart");

let stockChart = new Chart(stockCtx, {
    type: "line",
    data: {
        labels: ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA"],
        datasets: [{
            label: "Stock Prices (Simulated)",
            data: [182, 323, 141, 178, 214],
            borderWidth: 3,
            borderColor: "#00aaff"
        }]
    },
    options: {
        responsive: true,
        scales: { y: { beginAtZero: false } }
    }
});

/* ------------------------------
   LIVE CRYPTO (SIMULATION)
--------------------------------*/

let cryptoCtx = document.getElementById("cryptoChart");

let cryptoChart = new Chart(cryptoCtx, {
    type: "bar",
    data: {
        labels: ["BTC", "ETH", "ADA", "XRP", "SOL"],
        datasets: [{
            label: "Crypto Prices (Simulated)",
            data: [42150, 2400, 0.52, 0.68, 102],
            backgroundColor: "#415a77"
        }]
    },
    options: {
        responsive: true
    }
});

/* ------------------------------
   LIVE MARKET STATUS (TEXT)
--------------------------------*/

document.getElementById("liveMarketBox").innerHTML =
    "<b>Stocks:</b> Mixed • <b>Crypto:</b> Slightly Up • <b>Gold:</b> Stable";
