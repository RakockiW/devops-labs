const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const INSTANCE_ID = process.env.HOSTNAME;

app.use(express.json());

let products = [
    { id: 1, name: 'Laptop', price: 1500, quantity: 5},
    { id: 2, name: 'Myszka', price: 50, quantity: 20},
    { id: 3, name: 'Klawiatura', price: 100, quantity: 15}
]

// Endpoint główny — zwraca informacje o żądaniu
app.get('/', (req, res) => {
    res.json({
        message: 'Odpowiedź z backendu Node.js',
        receivedHeaders: {
            host: req.headers['host'],
            xRealIp: req.headers['x-real-ip'],
            xForwardedFor: req.headers['x-forwarded-for'],
            xForwardedProto: req.headers['x-forwarded-proto'],
        },
        timestamp: new Date().toISOString(),
    });
});

app.get('/items', (req, res) => {
    res.json({
        products: products
    })
})

app.get('/stats', (req, res) => {

    const products_count = products.length;
    let total_price = 0;

    products.forEach(p => {
        total_price += p.price
    });

    let avg_price =  total_price / products_count;    

    res.json({
        instance: INSTANCE_ID,
        stats: {
            products_count,
            avg_price
        }
    })
})

app.post('/items', (req, res) => {
    const { name, quantity, price } = req.body;

    if (!name || quantity == null || price == null) {
        return res.status(400).json({ error: 'name, quantity i price są wymagane' });
    }

    const newProduct = {
        id: products.length + 1,
        name,
        quantity,
        price
    };
    products.push(newProduct);

    res.status(201).json(newProduct);
});

// Endpoint health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`Serwer nasłuchuje na porcie ${PORT}`);
});