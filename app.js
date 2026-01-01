function showSection(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  document.querySelectorAll("nav a").forEach(a => a.classList.remove("active"));
  event.target.classList.add("active");
}

function openFinanceTab(tabId) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));

  document.getElementById(tabId).classList.add("active");
  event.target.classList.add("active");
}

function updateAISummary(id, score, text) {
  const el = document.getElementById(id + "-summary");
  if (!el) return;

  el.innerHTML = `<h3>AI Market Summary</h3><p>${text}</p>`;
}

function generateAIAlerts() {
  const alerts = [
    "⚠️ Tech stocks showing overbought signals",
    "📈 Crypto volatility rising",
    "📉 Bond yields pressuring equities",
    "🧠 AI suggests defensive positioning"
  ];

  document.getElementById("ai-alert-list").innerHTML =
    alerts.map(a => `<li>${a}</li>`).join("");
}

function togglePro() {
  document.body.classList.toggle("pro");
}

document.addEventListener("DOMContentLoaded", () => {
  updateAISummary(
    "dashboard",
    0.7,
    "Markets remain cautiously bullish with mixed signals across assets."
  );
  generateAIAlerts();
});
