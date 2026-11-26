
const productList = document.getElementById("productList");
const productForm = document.getElementById("productForm");

// Fetch and display products
async function fetchProducts() {

    try {
        const response = await fetch("/api/products");

        const products = await response.json();

        productList.innerHTML = "";

        products.forEach(product => {

            const card = document.createElement("div");

            card.className = "product-card";

            const title = document.createElement("h3");
            title.textContent = product.name;

            const price = document.createElement("p");
            price.textContent = `Price: ₹${product.price}`;

            const rating = document.createElement("p");
            rating.className = "rating";
            rating.textContent = `Rating: ${product.rating}/5 ⭐`;

            const id = document.createElement("p");
            id.textContent = `Product ID: ${product.id}`;

            card.append(title, price, rating, id);

            productList.appendChild(card);
        });

    } catch (error) {
        productList.textContent = "Unable to load products.";
        console.error(error);
    }
}

// Add new product
productForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name = document.getElementById("name").value;

    const price = document.getElementById("price").value;

    const rating = document.getElementById("rating").value;

    try {
        const response = await fetch("/api/products", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                price,
                rating
            })
        });

        const result = await response.json();

        if (!response.ok) {
            alert(result.message);
            return;
        }

        alert("Product added successfully!");

        productForm.reset();

        fetchProducts();

    } catch (error) {
        alert("Something went wrong!");
        console.error(error);
    }
});

// Load products when page opens
fetchProducts();
