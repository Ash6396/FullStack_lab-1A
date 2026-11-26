const STORAGE_KEYS = {
  products: "amazon-demo-products-v1",
  cart: "amazon-demo-cart-v1",
  orders: "amazon-demo-orders-v1"
};

const IMAGE_OPTIONS = {
  laptop: { src: "images/img-1.png", alt: "Laptop and tablet" },
  watch: { src: "images/img-2.png", alt: "Smartwatch" },
  lights: { src: "images/img-3.png", alt: "Colorful room lighting" }
};

const ICON_OPTIONS = {
  headphones: "headphones",
  chair: "chair",
  phone: "smartphone"
};

const PAYMENT_LABELS = {
  "demo-card": "Card (demo simulation)",
  "demo-upi": "UPI (demo simulation)",
  cod: "Cash on delivery (simulation)"
};

const SAMPLE_PRODUCTS = [
  {
    id: "sample-laptop",
    name: "Everyday Laptop & Tablet",
    category: "Electronics",
    price: 54999,
    description: "A versatile setup for work, study, and everything in between.",
    image: "laptop"
  },
  {
    id: "sample-watch",
    name: "Smartwatch Series 5",
    category: "Electronics",
    price: 6999,
    description: "Track your day, stay connected, and keep moving.",
    image: "watch"
  },
  {
    id: "sample-lights",
    name: "ColorGlow LED Light Kit",
    category: "Home",
    price: 1499,
    description: "Add a little color and atmosphere to your favorite room.",
    image: "lights"
  },
  {
    id: "sample-headphones",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 3299,
    description: "Comfortable wireless listening for commutes and quiet time.",
    image: "headphones"
  },
  {
    id: "sample-chair",
    name: "Ergonomic Desk Chair",
    category: "Home",
    price: 8999,
    description: "A supportive seat for focused work and everyday comfort.",
    image: "chair"
  },
  {
    id: "sample-phone",
    name: "Everyday Smartphone",
    category: "Electronics",
    price: 24999,
    description: "A capable phone for photos, messages, and daily essentials.",
    image: "phone"
  }
];

const statusElement = document.querySelector("#app-status");
const productGrid = document.querySelector("#product-grid");
const cartItemsElement = document.querySelector("#cart-items");
const ordersListElement = document.querySelector("#orders-list");
const sellerProductList = document.querySelector("#seller-product-list");
const productForm = document.querySelector("#product-form");
const checkoutForm = document.querySelector("#checkout-form");
const checkoutToggle = document.querySelector("#checkout-toggle");
const categoryFilter = document.querySelector("#category-filter");
const catalogSearch = document.querySelector("#catalog-search");

let statusTimer;

function showStatus(message, kind) {
  window.clearTimeout(statusTimer);
  statusElement.textContent = message;
  statusElement.className = `app-status is-visible ${kind || "info"}`;
  statusTimer = window.setTimeout(() => {
    statusElement.classList.remove("is-visible");
  }, 4500);
}

function isValidProduct(product) {
  return product !== null
    && typeof product === "object"
    && typeof product.id === "string"
    && typeof product.name === "string"
    && typeof product.category === "string"
    && Number.isFinite(product.price)
    && product.price > 0
    && product.price <= 10000000
    && typeof product.description === "string"
    && product.name.trim().length > 0
    && product.category.trim().length > 0
    && product.description.trim().length > 0
    && (Object.hasOwn(IMAGE_OPTIONS, product.image) || Object.hasOwn(ICON_OPTIONS, product.image));
}

function readStoredValue(key, fallback, isValid) {
  try {
    const stored = window.localStorage.getItem(key);
    if (stored === null) {
      return fallback;
    }

    const value = JSON.parse(stored);
    if (!isValid(value)) {
      throw new Error("Saved data has an unexpected format.");
    }
    return value;
  } catch (error) {
    console.error(`Unable to load ${key} from local storage.`, error);
    showStatus("Saved data could not be loaded. The demo is using fresh data for this session.", "error");
    return fallback;
  }
}

function saveStoredValue(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Unable to save ${key} to local storage.`, error);
    showStatus("Changes are available for this session but could not be saved in this browser.", "error");
    return false;
  }
}

const products = readStoredValue(
  STORAGE_KEYS.products,
  SAMPLE_PRODUCTS,
  value => Array.isArray(value) && value.every(isValidProduct)
);
const cart = readStoredValue(
  STORAGE_KEYS.cart,
  [],
  value => Array.isArray(value)
    && value.every(item => item && typeof item.productId === "string"
      && Number.isInteger(item.quantity) && item.quantity > 0)
);
const orders = readStoredValue(
  STORAGE_KEYS.orders,
  [],
  value => Array.isArray(value)
    && value.every(order => order && typeof order.id === "string"
      && typeof order.placedAt === "string" && Array.isArray(order.items))
);

function formatPrice(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}

function makeElement(tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) {
    element.className = className;
  }
  if (text !== undefined) {
    element.textContent = text;
  }
  return element;
}

function makeProductImage(product, className) {
  const imageOption = IMAGE_OPTIONS[product.image];
  if (imageOption) {
    const image = makeElement("img", className);
    image.src = imageOption.src;
    image.alt = imageOption.alt;
    image.loading = "lazy";
    return image;
  }

  const icon = makeElement("span", `${className} material-symbols-outlined`, ICON_OPTIONS[product.image]);
  icon.setAttribute("aria-hidden", "true");
  return icon;
}

function findProduct(productId) {
  return products.find(product => product.id === productId);
}

function updateCategoryOptions() {
  const selectedCategory = categoryFilter.value || "all";
  const categories = [...new Set(products.map(product => product.category))]
    .sort((first, second) => first.localeCompare(second));

  categoryFilter.replaceChildren(new Option("All", "all"));
  categories.forEach(category => categoryFilter.add(new Option(category, category)));
  categoryFilter.value = categories.includes(selectedCategory) ? selectedCategory : "all";
}

function renderProducts() {
  updateCategoryOptions();
  const searchTerm = catalogSearch.value.trim().toLocaleLowerCase();
  const selectedCategory = categoryFilter.value;
  const visibleProducts = products.filter(product => {
    const matchesSearch = `${product.name} ${product.category} ${product.description}`
      .toLocaleLowerCase()
      .includes(searchTerm);
    return matchesSearch && (selectedCategory === "all" || product.category === selectedCategory);
  });

  document.querySelector("#result-count").textContent =
    `${visibleProducts.length} ${visibleProducts.length === 1 ? "item" : "items"}`;
  productGrid.replaceChildren();

  if (visibleProducts.length === 0) {
    productGrid.append(makeElement("p", "empty-state", "No products match your search. Try another name or category."));
    return;
  }

  visibleProducts.forEach(product => {
    const card = makeElement("article", "product-card");
    card.append(makeProductImage(product, "product-image"));

    const details = makeElement("div", "product-details");
    details.append(makeElement("span", "product-category", product.category));
    details.append(makeElement("h3", "product-name", product.name));
    details.append(makeElement("p", "product-description", product.description));

    const purchaseRow = makeElement("div", "product-purchase");
    purchaseRow.append(makeElement("strong", "product-price", formatPrice(product.price)));
    const addButton = makeElement("button", "primary-button add-to-cart", "Add to cart");
    addButton.type = "button";
    addButton.dataset.addToCart = product.id;
    purchaseRow.append(addButton);
    details.append(purchaseRow);
    card.append(details);
    productGrid.append(card);
  });
}

function updateCartBadge(itemCount) {
  document.querySelector("#cart-count").textContent = String(itemCount);
  document.querySelector("#cart-heading-count").textContent = `(${itemCount})`;
  document.querySelector(".cart").setAttribute("aria-label", `Cart, ${itemCount} items`);
}

function renderCart() {
  const validCartItems = cart.filter(item => findProduct(item.productId));
  if (validCartItems.length !== cart.length) {
    cart.splice(0, cart.length, ...validCartItems);
    saveStoredValue(STORAGE_KEYS.cart, cart);
  }

  cartItemsElement.replaceChildren();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => {
    const product = findProduct(item.productId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);
  updateCartBadge(itemCount);
  document.querySelector("#cart-subtotal").textContent = formatPrice(subtotal);
  document.querySelector("#cart-total").textContent = formatPrice(subtotal);
  checkoutToggle.disabled = itemCount === 0;
  if (itemCount === 0) {
    checkoutForm.hidden = true;
    cartItemsElement.append(makeElement("p", "empty-state", "Your cart is empty. Add a product to get started."));
    return;
  }

  cart.forEach(item => {
    const product = findProduct(item.productId);
    const row = makeElement("article", "cart-row");
    row.append(makeProductImage(product, "cart-image"));

    const details = makeElement("div", "cart-product-details");
    details.append(makeElement("h3", "", product.name));
    details.append(makeElement("p", "cart-product-price", formatPrice(product.price)));
    const controls = makeElement("div", "quantity-controls");
    const decrease = makeElement("button", "quantity-button", "−");
    decrease.type = "button";
    decrease.dataset.cartAction = "decrease";
    decrease.dataset.productId = product.id;
    decrease.setAttribute("aria-label", `Remove one ${product.name}`);
    const quantity = makeElement("span", "quantity-value", String(item.quantity));
    const increase = makeElement("button", "quantity-button", "+");
    increase.type = "button";
    increase.dataset.cartAction = "increase";
    increase.dataset.productId = product.id;
    increase.setAttribute("aria-label", `Add one ${product.name}`);
    const remove = makeElement("button", "text-button remove-item", "Remove");
    remove.type = "button";
    remove.dataset.cartAction = "remove";
    remove.dataset.productId = product.id;
    controls.append(decrease, quantity, increase, remove);
    details.append(controls);
    row.append(details);
    row.append(makeElement("strong", "cart-line-total", formatPrice(product.price * item.quantity)));
    cartItemsElement.append(row);
  });
}

function renderOrders() {
  ordersListElement.replaceChildren();
  if (orders.length === 0) {
    ordersListElement.append(makeElement("p", "empty-state", "No orders yet. Completed demo checkouts will appear here."));
    return;
  }

  orders.forEach(order => {
    const card = makeElement("article", "order-card");
    const header = makeElement("div", "order-card-header");
    const heading = makeElement("div", "order-heading");
    heading.append(makeElement("h3", "", `Order ${order.id}`));
    const date = new Date(order.placedAt);
    heading.append(makeElement("p", "order-date", Number.isNaN(date.getTime()) ? order.placedAt : date.toLocaleString()));
    header.append(heading);
    header.append(makeElement("span", "order-status", "Demo order placed"));
    card.append(header);

    const itemList = makeElement("ul", "order-items");
    order.items.forEach(item => {
      itemList.append(makeElement("li", "", `${item.name} × ${item.quantity} — ${formatPrice(item.price * item.quantity)}`));
    });
    card.append(itemList);

    const footer = makeElement("div", "order-card-footer");
    footer.append(makeElement("span", "", `Payment: ${order.payment}`));
    footer.append(makeElement("strong", "", `Total ${formatPrice(order.total)}`));
    card.append(footer);
    ordersListElement.append(card);
  });
}

function renderSellerProducts() {
  sellerProductList.replaceChildren();
  document.querySelector("#seller-product-count").textContent = `(${products.length})`;
  if (products.length === 0) {
    sellerProductList.append(makeElement("p", "empty-state", "No products in your catalog."));
    return;
  }

  products.forEach(product => {
    const row = makeElement("article", "seller-product-row");
    row.append(makeProductImage(product, "seller-product-image"));
    const details = makeElement("div", "seller-product-details");
    details.append(makeElement("strong", "", product.name));
    details.append(makeElement("span", "", `${product.category} · ${formatPrice(product.price)}`));
    row.append(details);
    const actions = makeElement("div", "seller-product-actions");
    const edit = makeElement("button", "secondary-button compact-button", "Edit");
    edit.type = "button";
    edit.dataset.editProduct = product.id;
    const remove = makeElement("button", "text-button delete-button", "Delete");
    remove.type = "button";
    remove.dataset.deleteProduct = product.id;
    actions.append(edit, remove);
    row.append(actions);
    sellerProductList.append(row);
  });
}

function renderApp() {
  renderProducts();
  renderCart();
  renderOrders();
  renderSellerProducts();
}

function addToCart(productId) {
  const product = findProduct(productId);
  if (!product) {
    showStatus("That product is no longer available.", "error");
    return;
  }

  const item = cart.find(cartItem => cartItem.productId === productId);
  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ productId, quantity: 1 });
  }
  const saved = saveStoredValue(STORAGE_KEYS.cart, cart);
  renderCart();
  if (saved) {
    showStatus(`${product.name} added to your cart.`, "success");
  }
}

function handleCartAction(action, productId) {
  const itemIndex = cart.findIndex(cartItem => cartItem.productId === productId);
  if (itemIndex === -1) {
    return;
  }

  if (action === "remove") {
    cart.splice(itemIndex, 1);
  } else if (action === "decrease") {
    cart[itemIndex].quantity -= 1;
    if (cart[itemIndex].quantity === 0) {
      cart.splice(itemIndex, 1);
    }
  } else if (action === "increase") {
    cart[itemIndex].quantity += 1;
  }
  saveStoredValue(STORAGE_KEYS.cart, cart);
  renderCart();
}

function resetProductForm() {
  productForm.reset();
  document.querySelector("#product-id").value = "";
  document.querySelector("#product-form-title").textContent = "Add a product";
  document.querySelector("#save-product-button").textContent = "Add product";
  document.querySelector("#cancel-edit-button").hidden = true;
}

function editProduct(productId) {
  const product = findProduct(productId);
  if (!product) {
    showStatus("That product could not be found.", "error");
    return;
  }

  document.querySelector("#product-id").value = product.id;
  document.querySelector("#product-name").value = product.name;
  document.querySelector("#product-category").value = product.category;
  document.querySelector("#product-price").value = String(product.price);
  document.querySelector("#product-description").value = product.description;
  document.querySelector("#product-image").value = product.image;
  document.querySelector("#product-form-title").textContent = "Edit product";
  document.querySelector("#save-product-button").textContent = "Save changes";
  document.querySelector("#cancel-edit-button").hidden = false;
  productForm.scrollIntoView({ behavior: "smooth", block: "center" });
}

productGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-add-to-cart]");
  if (button) {
    addToCart(button.dataset.addToCart);
  }
});

cartItemsElement.addEventListener("click", event => {
  const button = event.target.closest("[data-cart-action]");
  if (button) {
    handleCartAction(button.dataset.cartAction, button.dataset.productId);
  }
});

sellerProductList.addEventListener("click", event => {
  const editButton = event.target.closest("[data-edit-product]");
  if (editButton) {
    editProduct(editButton.dataset.editProduct);
    return;
  }

  const deleteButton = event.target.closest("[data-delete-product]");
  if (!deleteButton) {
    return;
  }

  const product = findProduct(deleteButton.dataset.deleteProduct);
  if (!product || !window.confirm(`Delete "${product.name}" from the catalog?`)) {
    return;
  }

  const productIndex = products.findIndex(item => item.id === product.id);
  products.splice(productIndex, 1);
  const cartIndex = cart.findIndex(item => item.productId === product.id);
  let cartSaved = true;
  if (cartIndex !== -1) {
    cart.splice(cartIndex, 1);
    cartSaved = saveStoredValue(STORAGE_KEYS.cart, cart);
  }
  const productsSaved = saveStoredValue(STORAGE_KEYS.products, products);
  renderApp();
  if (productsSaved && cartSaved) {
    showStatus(`${product.name} removed from the catalog.`, "success");
  }
});

catalogSearch.addEventListener("input", renderProducts);
categoryFilter.addEventListener("change", renderProducts);
document.querySelector("#search-form").addEventListener("submit", event => {
  event.preventDefault();
  renderProducts();
  document.querySelector("#products").scrollIntoView({ behavior: "smooth" });
});

checkoutToggle.addEventListener("click", () => {
  checkoutForm.hidden = false;
  document.querySelector("#customer-name").focus();
});

checkoutForm.addEventListener("submit", event => {
  event.preventDefault();
  if (!checkoutForm.reportValidity()) {
    return;
  }
  if (cart.length === 0) {
    showStatus("Add an item to your cart before checking out.", "error");
    return;
  }

  const formData = new FormData(checkoutForm);
  const orderItems = cart.map(item => {
    const product = findProduct(item.productId);
    return product
      ? { name: product.name, price: product.price, quantity: item.quantity }
      : null;
  }).filter(Boolean);

  if (orderItems.length === 0) {
    showStatus("Your cart no longer contains available products.", "error");
    renderCart();
    return;
  }

  const order = {
    id: `DEMO-${Date.now().toString(36).toUpperCase()}`,
    placedAt: new Date().toISOString(),
    payment: PAYMENT_LABELS[String(formData.get("payment"))],
    items: orderItems,
    total: orderItems.reduce((total, item) => total + item.price * item.quantity, 0)
  };

  orders.unshift(order);
  cart.splice(0, cart.length);
  const ordersSaved = saveStoredValue(STORAGE_KEYS.orders, orders);
  const cartSaved = saveStoredValue(STORAGE_KEYS.cart, cart);
  checkoutForm.reset();
  checkoutForm.hidden = true;
  renderCart();
  renderOrders();
  if (ordersSaved && cartSaved) {
    showStatus(`Demo order ${order.id} placed. No payment was processed.`, "success");
  } else {
    showStatus("The demo order is visible for this session, but could not be saved. No payment was processed.", "error");
  }
});

productForm.addEventListener("submit", event => {
  event.preventDefault();
  if (!productForm.reportValidity()) {
    return;
  }

  const id = document.querySelector("#product-id").value;
  const product = {
    id: id || `seller-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    name: document.querySelector("#product-name").value.trim(),
    category: document.querySelector("#product-category").value.trim(),
    price: Number(document.querySelector("#product-price").value),
    description: document.querySelector("#product-description").value.trim(),
    image: document.querySelector("#product-image").value
  };

  if (!isValidProduct(product)) {
    showStatus("Check the product details and try again.", "error");
    return;
  }

  const existingIndex = products.findIndex(item => item.id === id);
  if (existingIndex === -1) {
    products.unshift(product);
  } else {
    products[existingIndex] = product;
  }
  const saved = saveStoredValue(STORAGE_KEYS.products, products);
  resetProductForm();
  renderProducts();
  renderSellerProducts();
  if (saved) {
    showStatus(existingIndex === -1 ? "Product added to the catalog." : "Product details updated.", "success");
  }
});

document.querySelector("#cancel-edit-button").addEventListener("click", resetProductForm);

renderApp();
