const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 49.99 }
];

const productList = document.getElementById("product-list");
const emptyCart = document.getElementById("empty-cart");
const cartTotal = document.getElementById("cart-total");
const totalPriceEl = document.getElementById("total-price");
const checkoutBtn = document.getElementById("checkout-btn");

// Load from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = 0;

// Save cart & total to localStorage
function saveToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("total", JSON.stringify(total));
}

// Recalculate total from cart 
function calculateTotal() {
    total = 0;
    cart.forEach(item => {
        total += item.price;
    });

    total = Number(total.toFixed(2));
}

// Display products list
function displayProducts() {
    productList.innerHTML = "";

    products.forEach(product => {
        const div = document.createElement("div");
        div.className = "product";

        div.innerHTML = `
            <span>${product.name} - $${product.price}</span>
            <button>Add to Cart</button>
        `;

        div.querySelector("button").addEventListener("click", () => {
            addToCart(product);
        });

        productList.appendChild(div);
    });
}

// Add product to cart
function addToCart(p) {
    cart.push(p);

    calculateTotal();
    saveToLocalStorage();
    updateCart();
}

// Update cart UI
function updateCart() {
    // Clear old cart items
    document.querySelectorAll(".cart-item").forEach(item => item.remove());

    if (cart.length === 0) {
        emptyCart.style.display = "block";
        cartTotal.classList.add("hidden");
        totalPriceEl.textContent = "$0.00";
        return;
    }

    emptyCart.style.display = "none";

    cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
            <span>${item.name} - $${item.price.toFixed(2)}</span>
            <button class="remove-btn">Remove</button>
        `;

        div.querySelector(".remove-btn").addEventListener("click", () => {
            removeFromCart(index);
        });

        emptyCart.parentElement.appendChild(div);
    });

    totalPriceEl.textContent = `$${total.toFixed(2)}`;
    cartTotal.classList.remove("hidden");
}

// Remove product from cart
function removeFromCart(index) {
    cart.splice(index, 1);

    calculateTotal();
    saveToLocalStorage();
    updateCart();
}

// Checkout
checkoutBtn.addEventListener("click", () => {
    alert("Checkout Successful!");

    cart = [];
    total = 0;

    saveToLocalStorage();

    document.querySelectorAll(".cart-item").forEach(item => item.remove());
    emptyCart.style.display = "block";
    cartTotal.classList.add("hidden");
    totalPriceEl.textContent = "$0.00";
});

// Initial load
displayProducts();
calculateTotal();
updateCart();
