const API_URL = '/api/stats'

async function loadStats () {
    const res = await fetch(API_URL);
    const data = await res.json();
    
    const stats = data.stats;
    let html= `<h1>Liczba produktów: ${stats.products_count}</h1>`;
    html += `<h2> Średnia cena: ${stats.avg_price}</h2>`;
    html += `<h3> ID instancji: ${data.instance}</h3>`;

    document.getElementById('stats').innerHTML = html;
}

window.onload = loadStats;