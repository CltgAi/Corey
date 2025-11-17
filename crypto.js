
async function fetchCoin(id){
  try{ const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=' + id + '&vs_currencies=usd'); const data = await res.json(); return data[id].usd; }catch(e){console.error(e);return null;}
}
let coinChart, coinData=[];
function initCoinChart(){ const c=document.getElementById('coinCanvas'); if(!c) return; coinChart = new Chart(c.getContext('2d'),{type:'line',data:{labels:[],datasets:[{label:'Price',data:[],borderColor:'#f2a900'}]}}); }
async function updateCoin(id){ const price = await fetchCoin(id); if(price===null||price===undefined) return; document.getElementById('coinPrice').innerText = '$'+price.toFixed(2); const now=new Date().toLocaleTimeString(); coinData.push({t:now,p:price}); if(coinData.length>30) coinData.shift(); coinChart.data.labels = coinData.map(x=>x.t); coinChart.data.datasets[0].data = coinData.map(x=>x.p); coinChart.update(); }
document.addEventListener('DOMContentLoaded', function(){ initCoinChart(); const sel=document.getElementById('coinSelect'); if(sel) updateCoin(sel.value); setInterval(()=> updateCoin(sel.value),10000); });
