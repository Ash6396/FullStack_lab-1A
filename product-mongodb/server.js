
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/product");

const app = express();

// Middleware
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected Successfully");
    })
    .catch((error) => {
        console.log("MongoDB Connection Error:", error);
    });

// CREATE - Add Product
app.post("/products", async (req, res) => {
    try {
        const product = new Product(req.body);

        const savedProduct = await product.save();

        res.status(201).json({
            message: "Product added successfully",
            product: savedProduct
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// READ - Get All Products
app.get("/products", async (req, res) => {
    try {
        const products = await Product.find();

        res.json(products);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// READ - Get Product By ID
app.get("/products/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json(product);

    } catch (error) {
        res.status(400).json({
            message: "Invalid product ID"
        });
    }
});

// UPDATE - Update Product
app.put("/products/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message: "Product updated successfully",
            product: updatedProduct
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// DELETE - Delete Product
app.delete("/products/:id", async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(
            req.params.id
        );

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message: "Product deleted successfully"
        });

    } catch (error) {
        res.status(400).json({
            message: "Invalid product ID"
        });
    }
});

// Start server after database connection
mongoose.connection.once("open", () => {
    app.listen(process.env.PORT || 3000, () => {
        console.log("Server running at http://localhost:3000");
    });
});
