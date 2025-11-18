// =========================
// GLOBAL SAFE FETCH WRAPPER
// =========================
async function safeFetchJSON(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
        return await res.json();
    } catch (err) {
        console.error("Fetch error:", url, err);
        return null;
    }
}


function makeChart(id,type,labels,datasets,opts){const el=document.getElementById(id); if(!el) return; new Chart(el.getContext('2d'),{type:type,data:{labels:labels,datasets:datasets},options:opts||{}});} 
