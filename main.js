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


/* ------------------ EU MARKETS ------------------ */
async function loadEU() {
    try {
        const indexes = ["^FTSE", "^GDAXI", "^FCHI", "^STOXX50E"]; // UK, Germany, France, EU
        const res = await fetch(
            `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${indexes.join(",")}`
        );

        const data = await res.json();
        const card = document.getElementById("eu-card");
        if (!card) return;

        card.innerHTML = `
            <h2>EU Stocks</h2>
            ${data.quoteResponse.result.map(
                idx => `<p><strong>${idx.symbol}</strong>: ${idx.regularMarketPrice}</p>`
            ).join("")}
        `;
    } catch (error) {
        console.error("EU error:", error);
    }
}


/* ------------------ COMMODITIES ------------------ */
async function loadCommodities() {
    try {
        const symbols = ["GC=F", "SI=F", "CL=F", "NG=F", "HG=F"]; 
        const res = await fetch(
            `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols.join(",")}`
        );

        const data = await res.json();
        const card = document.getElementById("commodities-card");
        if (!card) return;

        const names = {
            "GC=F": "Gold",
            "SI=F": "Silver",
            "CL=F": "Crude Oil",
            "NG=F": "Natural Gas",
            "HG=F": "Copper"
        };

        card.innerHTML = `
            <h2>Commodities</h2>
            ${data.quoteResponse.result.map(
                item => `<p><strong>${names[item.symbol]}</strong>: ${item.regularMarketPrice}</p>`
            ).join("")}
        `;
    } catch (error) {
        console.error("Commodities error:", error);
    }
}


/* ------------------ ETFs & BONDS ------------------ */
async function loadETFBonds() {
    try {
        const symbols = ["TLT", "IEF", "BND", "SPY", "QQQ"];
        const res = await fetch(
            `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols.join(",")}`
        );

        const data = await res.json();
        const card = document.getElementById("etf-card");
        if (!card) return;

        card.innerHTML = `
            <h2>Bonds & ETFs</h2>
            ${data.quoteResponse.result.map(
                e => `<p><strong>${e.symbol}</strong>: $${e.regularMarketPrice}</p>`
            ).join("")}
        `;
    } catch (error) {
        console.error("ETF error:", error);
    }
}


/* ------------------ TOP 50 PRICES (Crypto) ------------------ */
async function loadTop50() {
    try {
        const res = await fetch(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50"
        );
        const data = await res.json();

        const card = document.getElementById("top50-card");
        if (!card) return;

        card.innerHTML = `
            <h2>Top 50 Live Prices</h2>
            <div style="max-height:300px; overflow-y:auto;">
                ${data.map(c => `
                    <p><strong>${c.name}</strong>: $${c.current_price.toLocaleString()}</p>
                `).join("")}
            </div>
        `;
    } catch (error) {
        console.error("Top 50 error:", error);
    }
}


/* ==========================================================
   AUTO REFRESH EVERY 20 SECONDS
========================================================== */
function refreshAll() {
    loadCrypto();
    loadStocks();
    loadEU();
    loadCommodities();
    loadETFBonds();
    loadTop50();
}

refreshAll();
setInterval(refreshAll, 20000);
