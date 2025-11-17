console.log("UI Loaded Successfully — GitHub Pages OK!");
// ---- Dashboard Data Simulation ---- //

let datasetsCount = 3;
let latestUpload = "finance_dataset.csv";
let analysisCount = 12;

document.getElementById("datasetsCount").textContent = datasetsCount;
document.getElementById("latestUpload").textContent = latestUpload;
document.getElementById("analysisCount").textContent = analysisCount;

// ---- Activity Chart ---- //

const ctx = document.getElementById('activityChart').getContext('2d');

const activityChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [{
            label: "AI Tasks Completed",
            data: [3, 7, 5, 8, 12, 10, 15],
            borderWidth: 3,
        }]
    }
});
