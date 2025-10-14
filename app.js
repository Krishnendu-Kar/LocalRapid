// ====== PRODUCT DISPLAY FUNCTION ======
// ====== PRODUCT DISPLAY FUNCTION ======
function displayProducts(productArray, containerId, context = 'initial') {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error("Product container not found!");
        return;
    }
    container.innerHTML = '';

    if (productArray.length === 0) {
        if (context === 'search') {
            container.innerHTML = `
                <div class="not-found-container">
                    <i class="fa-solid fa-box-open not-found-icon"></i>
                    <h2>No Products Found</h2>
                    <p>We couldn't find any products matching your search. Please try again with a different keyword.</p>
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="container">
                    <div class="come-soon">
                        <h1>COMING SOON</h1>
                        <hr>
                        <p class="soon-text">We are working hard to bring this page to you!</p>
                    </div>
                </div>
            `;
        }
        return;
    }

    // Array to keep track of timers we need to start
    const timersToInitialize = [];

    productArray.forEach((product) => {
        const priceHTML = (product.price === product.originalPrice || !product.originalPrice)
            ? `₹${product.price}`
            : `₹${product.price} <del>₹${product.originalPrice}</del>`;

        const discount = ((product.originalPrice - product.price) / product.originalPrice) * 100;
        const discountpercent = discount.toFixed(2);
        const discountText = discountpercent > 0 ? `${discountpercent}% off` : "Best Quality";
        const discountHTML = `<span class="discount-percent">${discountText}</span>`;

        // === MODIFICATION START: Timer HTML ===
        // Create a placeholder for the timer if the product has a timer value, regardless of category
        let timerHTML = '';
        if (product.timer) { // <-- The condition is changed here!
            // Give the timer element a unique ID based on the product ID
            timerHTML = `<div class="product-timer" id="timer-${product.id}"></div>`;
            // Add this product's info to our list of timers to start later
            timersToInitialize.push({ 
                timerId: `timer-${product.id}`, 
                btnId: `add-btn-${product.id}`, 
                endTime: product.timer 
            });
        }
        // === MODIFICATION END ===

        const productHTML = `
            <div class="product" onclick="window.location.href='product-details.html?id=${product.id}'">
                <div class="image-wrapper">
                    <div class="image-discount">
                        ${discountpercent > 0 ? discountHTML : ''}
                        <img loading="lazy" src="${product.image}" alt="${product.name}">
                    </div>
                    <div>
                        ${product.delivery_time ? `<p class="delivery_time"><i class="fa-solid fa-clock"></i> ${product.delivery_time} </p>` : ''} 
                        ${product.message ? `<p class="message"> ${product.message} </p>` : ''}
                    </div>                                                      
                </div>
                <h3><abbr style="text-decoration: none;" title="${product.name}">${product.name}</abbr></h3>
                <p class="product-subcategory">${product.sub_category}${timerHTML}</p>
                <p class="product-message">${product.amount} | ${product.little_details}</p>
                <div class="product-lower">
                    
                    <p class="product-price">${priceHTML}</p>
                    <button class="add-btn" id="add-btn-${product.id}">Add to Cart</button>
                </div>
            </div>
        `;
        container.innerHTML += productHTML;
    });

    // === MODIFICATION START: Activate Timers ===
    // After all products are on the page, start the countdowns
    timersToInitialize.forEach(timerInfo => {
        startCountdown(timerInfo.timerId, timerInfo.btnId, timerInfo.endTime);
    });
    // === MODIFICATION END ===

    container.querySelectorAll(".add-btn").forEach((btn) => {
        btn.addEventListener("click", function(e) {
            e.stopPropagation();
            // Find the product ID from the button's ID
            const productId = parseInt(btn.id.split('-')[2]);
            const product = productArray.find(p => p.id === productId);
            if (product) {
                addToCart(product);
            }
        });
    });
}


// ====== COUNTDOWN TIMER FUNCTION ======
function startCountdown(timerElementId, addBtnId, endTimeString) {
    const timerElement = document.getElementById(timerElementId);
    const addBtn = document.getElementById(addBtnId);
    const endTime = new Date(endTimeString).getTime();

    if (!timerElement || !addBtn) return;

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = endTime - now;

        // If the countdown is over
        if (distance < 0) {
            clearInterval(interval);
            timerElement.innerHTML = "Offer Expired!";
            timerElement.style.color = "red";
            addBtn.disabled = true;
            addBtn.innerText = "Closed";
            return;
        }

        // Time calculations for days, hours, minutes, and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Add leading zeros if number is less than 10
        const fDays = String(days).padStart(2, '0');
        const fHours = String(hours).padStart(2, '0');
        const fMinutes = String(minutes).padStart(2, '0');
        const fSeconds = String(seconds).padStart(2, '0');

        // Display the result
        timerElement.innerHTML = `<strong><i class="fa-solid fa-bomb"></i> ${fDays}d ${fHours}:${fMinutes}:${fSeconds}</strong>`;


    }, 1000);
}


// ====== CART MANAGEMENT ======
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

function addToCart(product) {
    let cart = getCart();
    const index = cart.findIndex(item => item.id === product.id);

    if (index !== -1) {
        cart[index].quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
    updateCartCount();
    alert(`${product.name} added to cart!`);
}

// Update cart count on every page load
document.addEventListener("DOMContentLoaded", updateCartCount);