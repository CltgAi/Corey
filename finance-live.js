async function loadFinance() {

    // ─── 1. US STOCKS ───────────────────────────────────────────
    const us = await safeFetch(
        "https://financialmodelingprep.com/api/v3/quote/AAPL,MSFT,TSLA,AMZN?apikey=demo"
    );

    document.getElementById("live-us").innerHTML =
        us.error ? "Failed to load US stocks" :
        us.map(x => `<p>${x.symbol}: ${formatPrice(x.price)}</p>`).join("");


    // ─── 2. EU STOCKS (fallback simulated) ───────────────────────
    const euData = [
        { symbol: "SIE.DE", price: 138.22 },
        { symbol: "VOW3.DE", price: 121.40 },
        { symbol: "ADS.DE", price: 197.88 }
    ];

    document.getElementById("live-eu").innerHTML =
        euData.map(x => `<p>${x.symbol}: ${formatPrice(x.price)}</p>`).join("");


    // ─── 3. BONDS & ETFs (simulated) ─────────────────────────────
    const bonds = [
        { name: "US 10Y Bond", price: "4.11%" },
        { name: "US 2Y Bond", price: "4.32%" },
        { name: "S&P 500 ETF (SPY)", price: "$505" }
    ];

    document.getElementById("live-bonds").innerHTML =
        bonds.map(x => `<p>${x.name}: ${x.price}</p>`).join("");


    // ─── 4. CRYPTO TOP 20 ─────────────────────────────────────────
    const crypto = await safeFetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=20"
    );

    document.getElementById("crypto-table").innerHTML =
        crypto.error ? "Crypto API failed" :
        crypto.map(x =>
            `<p>${x.name}: ${formatPrice(x.current_price)}</p>`
        ).join("");

}

// Auto-load finance & crypto on start
loadFinance();
