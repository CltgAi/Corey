https://api.api-ninjas.com
// === LIVE STOCK API ===
// Using free Yahoo Finance endpoint (no API key)
async function getLiveStockPrice(symbol) {
    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.quoteResponse.result[0].regularMarketPrice;
    } catch (error) {
        console.error("Error fetching stock price:", error);
        return null;
    }
}

// === LIVE CHART ===
let chart;
let chartData = [];

function updateChart(price) {
    const now = new Date().toLocaleTimeString();
    chartData.push({ time: now, price });

    if (chartData.length > 20) chartData.shift(); // Keep last 20 points

    chart.data.labels = chartData.map(p => p.time);
    chart.data.datasets[0].data = chartData.map(p => p.price);
    chart.update();
}

// Initialize Chart.js
function createStockChart() {
    const ctx = document.getElementById("stockChart").getContext("2d");

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: [],
            datasets: [{
                label: "Stock Price",
                data: [],
                borderWidth: 2,
                borderColor: "blue",
                pointRadius: 0,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

// Main function to update everything
async function autoUpdateStock() {
    const symbol = document.getElementById("stockSelector").value;

    const price = await getLiveStockPrice(symbol);
    if (!price) return;

    document.getElementById("livePrice").innerText = "$" + price.toFixed(2);
    updateChart(price);
}

// EVENT: stock dropdown changes
document.addEventListener("DOMContentLoaded", () => {
    createStockChart();
    autoUpdateStock();
    setInterval(autoUpdateStock, 5000); // refresh every 5 sec
});
