const API_URL = '/api/items'

async function loadProducts () {
    const res = await fetch(API_URL);
    const data = await res.json();
    
    const products = data.products;
    let html= '<table>';
    html += '<tr><th>ID</th><th>Nazwa</th><th>Cena</th><th>Ilosc</th></tr>';

    products.forEach(p => {
        html += `<tr>
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>${p.price}</td>
            <td>${p.quantity}</td>
            </tr>`;
    });

    html += '</table>';
    document.getElementById('product-list').innerHTML = html;
}

async function addProduct() {
  const name = document.getElementById('name').value;
  const quantity = parseInt(document.getElementById('quantity').value);
  const price = parseFloat(document.getElementById('price').value);

  if (!name || isNaN(quantity) || isNaN(price)) {
    alert('Wypełnij wszystkie pola poprawnie!');
    return;
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, quantity, price })
  });

  if (res.ok) {
    document.getElementById('name').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('price').value = '';
    loadProducts();
  } else {
    const err = await res.json();
    alert('Błąd: ' + err.error);
  }
}


window.onload = loadProducts;