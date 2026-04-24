const express = require('express');
const fs = require('fs'); 

const app = express();
const PORT = process.env.PORT;
const INSTANCE_ID = process.env.INSTANCE_ID;

const DATA = '/data/items.json'

app.use(express.json());


function loadProducts() {
    try {
        if (!fs.existsSync(DATA)) {
            fs.writeFileSync(DATA, JSON.stringify([]));
        }
        const data = fs.readFileSync(DATA);
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading file:', err);
        return [];
    }
}

function saveProducts(products) {
    fs.writeFileSync(DATA, JSON.stringify(products, null, 2));
}


app.get('/', (req, res) => {
    res.json({
        message: 'Response from Node.js backend',
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
    const products = loadProducts();
    res.json({
        products
    });
})

app.get('/stats', (req, res) => {

    const products = loadProducts();
    const products_count = products.length;
    let total_price = 0;

    products.forEach(p => {
        total_price += p.price
    });

    let avg_price =  products_count ? total_price / products_count : 0;    

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
        return res.status(400).json({ error: 'name, quantity and price are required' });
    }

    const products = loadProducts();

    const newProduct = {
        id: products.length + 1,
        name,
        quantity,
        price
    };
    products.push(newProduct);
    saveProducts(products);

    res.status(201).json(newProduct);
});

// Endpoint health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// New simple endpoint
app.get('/hello', (req, res) => {
    res.json({ message: 'hello' });
});

app.listen(PORT, () => {
    console.log(`Serwer listening on port ${PORT}`);
});