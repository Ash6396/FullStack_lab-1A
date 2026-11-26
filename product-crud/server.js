
const express = require("express");

const app = express();

const PORT = 3000;

// Middleware to read JSON data
app.use(express.json());

// Temporary product data
let products = [
    {
        id: 1,
        name: "Laptop",
        price: 55000,
        description: "HP Pavilion Laptop"
    },
    {
        id: 2,
        name: "Mobile",
        price: 25000,
        description: "Samsung Smartphone"
    },
    {
        id: 3,
        name: "Headphones",
        price: 2000,
        description: "Wireless Headphones"
    }
];

// 1. READ - Get all products
app.get("/products", (req, res) => {
    res.status(200).json(products);
});

// 2. READ - Get product by ID
app.get("/products/:id", (req, res) => {
    const id = Number(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.json(product);
});

// 3. CREATE - Add a new product
app.post("/products", (req, res) => {
    const { name, price, description } = req.body;

    if (!name || price === undefined || !description) {
        return res.status(400).json({
            message: "Please provide name, price and description"
        });
    }

    const newProduct = {
        id: products.length
            ? Math.max(...products.map(p => p.id)) + 1
            : 1,
        name,
        price,
        description
    };

    products.push(newProduct);

    res.status(201).json({
        message: "Product added successfully",
        product: newProduct
    });
});

// 4. UPDATE - Update product
app.put("/products/:id", (req, res) => {
    const id = Number(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    const { name, price, description } = req.body;

    if (!name || price === undefined || !description) {
        return res.status(400).json({
            message: "Please provide all product details"
        });
    }

    product.name = name;
    product.price = price;
    product.description = description;

    res.json({
        message: "Product updated successfully",
        product
    });
});

// 5. DELETE - Delete product
app.delete("/products/:id", (req, res) => {
    const id = Number(req.params.id);

    const productExists = products.some(p => p.id === id);

    if (!productExists) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    products = products.filter(p => p.id !== id);

    res.json({
        message: "Product deleted successfully"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
