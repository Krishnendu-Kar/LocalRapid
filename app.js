// ====== PRODUCT DISPLAY FUNCTION (FINAL CORRECTED VERSION) ======
function displayProducts(productArray, containerId, context = 'initial') {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error("Product container not found!");
        return;
    }
    container.innerHTML = '';

    if (productArray.length === 0) {
        // Your existing code for "not found" or "coming soon" is great, so it's kept.
        if (context === 'search') {
            container.innerHTML = `<div class="not-found-container">...</div>`; // Your HTML here
        } else {
            container.innerHTML = `<div class="container">...</div>`; // Your HTML here
        }
        return;
    }

    const timersToInitialize = [];

    productArray.forEach((product) => {
        const priceHTML = (product.price === product.originalPrice || !product.originalPrice)
            ? `₹${product.price}`
            : `₹${product.price} <del>₹${product.originalPrice}</del>`;

        const discount = ((product.originalPrice - product.price) / product.originalPrice) * 100;
        const discountpercent = discount.toFixed(2);
        const discountText = discountpercent > 0 ? `${discountpercent}% off` : "Best Quality";
        const discountHTML = `<span class="discount-percent">${discountText}</span>`;

        let timerHTML = '';
        if (product.timer) {
            timerHTML = `<div class="product-timer" id="timer-${product.id}"></div>`;
            timersToInitialize.push({ 
                timerId: `timer-${product.id}`, 
                btnId: `add-btn-${product.id}`, 
                endTime: product.timer 
            });
        }

        // --- THIS IS THE FIX ---
        // The entire product card is now a proper <a> link tag with a robust href.
        const productHTML = `
            <a href="./product-details.html?id=${product.id}" class="product">
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
            </a>
        `;
        container.innerHTML += productHTML;
    });

    timersToInitialize.forEach(timerInfo => {
        startCountdown(timerInfo.timerId, timerInfo.btnId, timerInfo.endTime);
    });

    // Your existing button logic is correct and will continue to work.
    container.querySelectorAll(".add-btn").forEach((btn) => {
        btn.addEventListener("click", function(e) {
            e.stopPropagation(); // This prevents the click from navigating the page
            e.preventDefault();  // This also prevents the default link behavior
            const productId = parseInt(btn.id.split('-')[2]);
            const product = productArray.find(p => p.id === productId);
            if (product) {
                addToCart(product);
            }
        });
    });
}

// ====== COUNTDOWN TIMER FUNCTION (Your code is perfect here) ======
function startCountdown(timerElementId, addBtnId, endTimeString) {
    const timerElement = document.getElementById(timerElementId);
    const addBtn = document.getElementById(addBtnId);
    const endTime = new Date(endTimeString).getTime();

    if (!timerElement || !addBtn) return;

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance < 0) {
            clearInterval(interval);
            timerElement.innerHTML = "Offer Expired!";
            timerElement.style.color = "red";
            addBtn.disabled = true;
            addBtn.innerText = "Closed";
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const fDays = String(days).padStart(2, '0');
        const fHours = String(hours).padStart(2, '0');
        const fMinutes = String(minutes).padStart(2, '0');
        const fSeconds = String(seconds).padStart(2, '0');

        timerElement.innerHTML = `<strong><i class="fa-solid fa-bomb"></i> ${fDays}d ${fHours}:${fMinutes}:${fSeconds}</strong>`;
    }, 1000);
}

// ====== CART MANAGEMENT (Your code is perfect here) ======
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

document.addEventListener("DOMContentLoaded", updateCartCount);