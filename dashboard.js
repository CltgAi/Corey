document.addEventListener("DOMContentLoaded", () => {
    initDashboard();
});

async function initDashboard() {
    // Check required IDs exist
    checkIDs([
        "marketStatus",
        "marketChart",
        "marketChange"
    ]);

    loadLiveMarketOverview();
    setInterval(loadLiveMarketOverview, 45000); // refresh every 45s
}

async function loadLiveMarketOverview() {
    const url = "https://api.coingecko.com/api/v3/global";

    const data = await safeFetchJSON(url);
    if (!data) {
        document.getElementById("marketStatus").innerHTML = "Market data unavailable.";
        return;
    }

    const mCap = data.data.total_market_cap.usd.toLocaleString();
    const vol = data.data.total_volume.usd.toLocaleString();
    const change = data.data.market_cap_change_percentage_24h_usd.toFixed(2);

    document.getElementById("marketStatus").innerHTML = `
        <strong>Total Market Cap:</strong> $${mCap}<br>
        <strong>Total Volume (24h):</strong> $${vol}
    `;

    document.getElementById("marketChange").innerText = change + "%";

    // Chart update
    const chartCtx = document.getElementById("marketChart");

    if (!window.marketChartObj) {
        window.marketChartObj = new Chart(chartCtx, {
            type: "doughnut",
            data: {
                labels: ["Market Cap", "Volume"],
                datasets: [{
                    data: [
                        data.data.total_market_cap.usd,
                        data.data.total_volume.usd
                    ]
                }]
            }
        });
    } else {
        window.marketChartObj.data.datasets[0].data = [
            data.data.total_market_cap.usd,
            data.data.total_volume.usd
        ];
        window.marketChartObj.update();
    }
}


