/* ==========================================================
   DARK MODE TOGGLE + SAVED PREFERENCE
========================================================== */
const toggle = document.getElementById("darkToggle");
const body = document.body;

if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
    toggle.textContent = "Light Mode";
}

toggle.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        toggle.textContent = "Light Mode";
    } else {
        localStorage.setItem("theme", "light");
        toggle.textContent = "Dark Mode";
    }
});


/* ==========================================================
   LIVE DATA FETCHING
========================================================== */

/* ------------------ CRYPTO (CoinGecko) ------------------ */
async function loadCrypto() {
    try {
        const res = await fetch(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6"
        );
        const data = await res.json();

        const card = document.getElementById("crypto-card");
        if (!card) return;

        card.innerHTML = `
            <h2>Crypto Overview</h2>
            ${data.map(c => `
                <p><strong>${c.name}</strong>: $${c.current_price.toLocaleString()}</p>
            `).join("")}
        `;
    } catch (error) {
        console.error("Crypto error:", error);
    }
}


/* ------------------ US STOCKS (Yahoo Finance) ------------------ */
async function loadStocks() {
    try {
        const symbols = ["AAPL", "MSFT", "TSLA", "NVDA", "AMZN", "GOOGL"];
        const res = await fetch(
            `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols.join(",")}`
        );

        const data = await res.json();
        const card = document.getElementById("stocks-card");
        if (!card) return;

        card.innerHTML = `
            <h2>Live US Stocks</h2>
            ${data.quoteResponse.result.map(
                s => `<p><strong>${s.symbol}</strong>: $${s.regularMarketPrice}</p>`
            ).join("")}
        `;
    } catch (error) {
        console.error("Stocks error:", error);
    }
}


/* ------------------ EU MARKETS ---*
