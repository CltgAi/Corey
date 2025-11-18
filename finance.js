
async function fetchQuote(sym){
  try{
    const res = await fetch('https://query1.finance.yahoo.com/v7/finance/quote?symbols=' + sym);
    const data = await res.json();
    return data.quoteResponse.result[0];
  }catch(e){console.error(e);return null;}
}
let stockChart, stockData=[];
function initStockChart(){
  const c=document.getElementById('stockCanvas'); if(!c) return;
  stockChart = new Chart(c.getContext('2d'),{type:'line',data:{labels:[],datasets:[{label:'Price',data:[],borderColor:'#1f77d0'}]}});
}
async function updateStock(sym){
  const q = await fetchQuote(sym);
  if(!q) return;
  const price = q.regularMarketPrice;
  document.getElementById('stockPrice').innerText = price?('$'+price.toFixed(2)):'-';
  const now=new Date().toLocaleTimeString();
  stockData.push({t:now,p:price}); if(stockData.length>30) stockData.shift();
  stockChart.data.labels = stockData.map(x=>x.t); stockChart.data.datasets[0].data = stockData.map(x=>x.p); stockChart.update();
}
document.addEventListener('DOMContentLoaded', function(){ initStockChart(); const sel=document.getElementById('stockSelect'); if(sel) updateStock(sel.value); setInterval(()=> updateStock(sel.value),10000); });
document.addEventListener("DOMContentLoaded", () => {
    loadStock("AAPL", "applePrice", "appleChange");
    loadStock("MSFT", "msftPrice", "msftChange");
    loadStock("TSLA", "teslaPrice", "teslaChange");
});

async function loadStock(symbol, priceID, changeID) {
    const url = `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=demo`;

    const stockData = await safeFetchJSON(url);
    if (!stockData || !stockData[0]) {
        document.getElementById(priceID).innerText = "N/A";
        document.getElementById(changeID).innerText = "N/A";
        return;
    }

    const stock = stockData[0];

    document.getElementById(priceID).innerText = `$${stock.price}`;
    document.getElementById(changeID).innerText = `${stock.changesPercentage}%`;
}
