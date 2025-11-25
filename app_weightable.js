// app_weightable.js

// ====== PRODUCT DISPLAY FUNCTION ======
function displayProducts(productArray, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error("Product container not found!");
        return;
    }

    if (productArray.length === 0) {
        container.innerHTML = `<div class="not-found-container"><h2>No Products Found</h2></div>`;
        return;
    }

    // Use map to create an array of HTML strings
    const allProductsHTML = productArray.map(product => {
        const weightOptionsHTML = product.available_weights.map(w =>
            `<option value="${w.price}">${w.weight}</option>`
        ).join('');

        // Return the HTML string for a single product
        return `
            <div class="product" data-product-id="${product.id}">
                <div onclick="window.location.href='product-details_weightable.html?id=${product.id}'">
                    <div class="image-wrapper">
                        <img loading="lazy" src="${product.image}" alt="${product.name}">
                        ${product.delivery_time ? `<p class="delivery_time"><i class="fa-solid fa-clock"></i> ${product.delivery_time}</p>` : ''}
                    </div>
                    <h3><abbr style="text-decoration: none;" title="${product.name}">${product.name}</abbr></h3>
                    <p class="product-subcategory">${product.sub_category}</p>
                </div>
                <div class="weight-selector-container">
                    <label for="weight-select-${product.id}">Weight:</label>
                    <select class="weight-selector" id="weight-select-${product.id}">
                        ${weightOptionsHTML}
                    </select>
                </div>
                <p class="price-comparison">(₹${product.price_per_100gm} / 100gm)</p>
                <div class="product-lower">
                    <p class="product-price" id="price-${product.id}">₹${product.available_weights[0].price}</p>
                    <button class="add-btn">Add to Cart</button>
                </div>
            </div>
        `;
    }).join(''); // Join all the strings into one    // --- Add Event Listeners AFTER creating all HTML ---

    // Set the innerHTML only ONCE
    container.innerHTML = allProductsHTML;

    // For Weight Selectors to update price
    container.querySelectorAll(".weight-selector").forEach(selector => {
        selector.addEventListener("change", function(e) {
            const productCard = e.target.closest('.product');
            const productId = productCard.dataset.productId;
            const priceElement = productCard.querySelector(`.product-price`); // Simplified selector
            
            const selectedPrice = e.target.value;
            priceElement.innerHTML = `₹${selectedPrice}`;
        });
    });

    // For Add to Cart buttons
    container.querySelectorAll(".add-btn").forEach(btn => {
        btn.addEventListener("click", function(e) {
            e.stopPropagation();
            const productCard = e.target.closest('.product');
            const productId = parseInt(productCard.dataset.productId);
            const product = productArray.find(p => p.id === productId);

            // Get selected weight and price
            const selector = productCard.querySelector('.weight-selector');
            const selectedWeightText = selector.options[selector.selectedIndex].text;
            const selectedPrice = parseFloat(selector.value);

            const itemToAdd = {
                ...product,
                price: selectedPrice,
                amount: selectedWeightText,
            };
            addToCart(itemToAdd);
        });
    });
}


// ====== CART MANAGEMENT (MODIFIED FOR WEIGHTABLE PRODUCTS) ======
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartAmountElement = document.querySelector(".cart-amount");
    if (cartAmountElement) {
        cartAmountElement.textContent = count;
    }
}
let body = document.querySelector('body');;   // ALWAYS attach to body, works everywhere

let cartMessage = document.createElement("div");
cartMessage.className = "cartMessage";
body.append(cartMessage);
function addToCart(product) {
    let cart = getCart();
    const cartItemId = `${product.id}-${product.amount}`;
    
    const existingItemIndex = cart.findIndex(item => item.cartItemId === cartItemId);

    if (existingItemIndex > -1) {
        // If the same product with the same weight exists, increase quantity
        // FIX: Use the correct variable name 'existingItemIndex'
        cart[existingItemIndex].quantity += 1; 
    } else {
        // Otherwise, add it as a new item
        cart.push({ ...product, quantity: 1, cartItemId: cartItemId });
    }

    saveCart(cart);
    updateCartCount();
    
        product.name = product.name
    .split(" ")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

    product.name=product.name.length > 20 ? product.name.substring(0, 20) + "..." : product.name;
    
    cartMessage.style.display= "inline-flex";
    cartMessage.innerHTML = `<strong> <i class="fa-solid fa-check" style="color: #50e658ff;font-size: 20px;"></i> ${product.amount} ${product.name} added to cart! </strong>`;
    
    setTimeout(() => {
    cartMessage.style.display = "none";
}, 4000); // 4000 ms = 4 seconds
}

// Initial Load
document.addEventListener("DOMContentLoaded", () => {
    // **FIXED**: This function is now called when the page loads.
    // Make sure your product list is named 'products_weightable' and your container has the id 'product-container'
    if (typeof products_weightable !== 'undefined') {
        displayProducts(products_weightable, 'product-container'); 
    }
    updateCartCount();
});