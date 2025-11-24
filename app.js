// ====== GLOBAL STATE FOR INFINITE SCROLL ======
let masterProductList = []; // This will hold the *full* list for the current page
let productsCurrentlyDisplayed = 0; // Tracks the count
let isLoading = false; // Prevents loading multiple batches at once
let isSearchActive = false; // Stops infinite scroll when a search is active
let initialLoadCount = 74; // Default initial load
let subsequentLoadCount = 14; // Default scroll load
const PRODUCT_CONTAINER_ID = 'productList'; // The main container ID

// ====== INITIALIZATION (GLOBAL) ======
// This runs on *every* page that includes app.js
document.addEventListener("DOMContentLoaded", () => {
    // 1. Setup the cart count immediately
    updateCartCount();
    
    // 2. Start the one-and-only global timer
    setInterval(updateAllTimers, 1000);
    
    // 3. Setup the one-and-only 'Add to Cart' click listener
    setupClickDelegate(PRODUCT_CONTAINER_ID);
    
    // 4. Setup the scroll listener
    window.addEventListener('scroll', handleScroll);
});

// ====== NEW: ENTRY POINT FOR PAGES ======
/**
 * Pages (like index.html) MUST call this function to start the product loading.
 * @param {Array} productArray The *full* list of products for this page (e.g., 20k random, or 500 'bestdeal')
 * @param {number} initialCount The number of products to load first (e.g., 74)
 * @param {number} subsequentCount The number to load on each scroll (e.g., 14)
 */
function initInfiniteScroll(productArray, initialCount = 74, subsequentCount = 14) {
    // 1. Set the global state for this page
    masterProductList = productArray;
    initialLoadCount = initialCount;
    subsequentLoadCount = subsequentCount;
    
    // 2. Reset flags
    productsCurrentlyDisplayed = 0;
    isLoading = false;
    isSearchActive = false;
    
    // 3. Clear the container (for page re-loads or search-to-home)
    const container = document.getElementById(PRODUCT_CONTAINER_ID);
    if (container) container.innerHTML = '';
    
    // 4. Load the first batch of products
    loadMoreProducts();
}

// ====== NEW: SCROLL HANDLER ======
function handleScroll() {
    // Stop if we're loading, a search is active, or we've loaded all products
    if (isLoading || isSearchActive || productsCurrentlyDisplayed >= masterProductList.length) {
        return;
    }
    
    const buffer = 300; // Load 300px *before* the user hits the bottom
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - buffer) {
        loadMoreProducts();
    }
}

// ====== NEW: LOAD MORE PRODUCTS LOGIC ======
function loadMoreProducts() {
    if (isLoading) return; // Safety check
    isLoading = true; // Set flag

    let productsToLoad = [];
    let isInitialLoad = (productsCurrentlyDisplayed === 0);

    if (isInitialLoad) {
        // First load
        productsToLoad = masterProductList.slice(0, initialLoadCount);
        productsCurrentlyDisplayed = productsToLoad.length;
    } else {
        // Subsequent load
        const newCount = productsCurrentlyDisplayed + subsequentLoadCount;
        productsToLoad = masterProductList.slice(productsCurrentlyDisplayed, newCount);
        productsCurrentlyDisplayed = newCount;
    }

    if (productsToLoad.length > 0) {
        if (isInitialLoad) {
            // Use the *replacing* function for the first load
            displayProducts(productsToLoad, PRODUCT_CONTAINER_ID);
        } else {
            // Use the *appending* function for all other loads
            appendProducts(productsToLoad, PRODUCT_CONTAINER_ID);
        }
    }
    
    isLoading = false; // Release the flag
}

// ====== NEW: HELPER TO BUILD HTML (AVOIDS DUPLICATE CODE) ======
function buildProductHTML(product) {
    const priceHTML = (product.price === product.originalPrice || !product.originalPrice)
        ? `₹${product.price}`
        : `₹${product.price} <del>₹${product.originalPrice}</del>`;

    const discount = ((product.originalPrice - product.price) / product.originalPrice) * 100;
    const discountpercent = discount.toFixed(2);
    const discountText = discountpercent > 0 ? `${discountpercent}% off` : "Best Quality";
    const discountHTML = `<span class="discount-percent">${discountText}</span>`;

    let timerHTML = '';
    if (product.timer) {
        timerHTML = `<div class="product-timer" 
                          id="timer-${product.id}" 
                          data-end-time="${product.timer}" 
                          data-btn-id="add-btn-${product.id}">
                     </div>`;
    }

    // Return the HTML string for one product
    return `
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
}

// ====== MODIFIED: DISPLAY PRODUCTS (FOR FIRST LOAD / SEARCH) ======
// This function now *REPLACES* all content in the container.
// It's used for the initial load and for search results.
function displayProducts(productArray, containerId, context = 'initial') {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (productArray.length === 0) {
        if (context === 'search') {
            container.innerHTML = `<div class="not-found-container">...</div>`; // Your HTML
        } else {
            container.innerHTML = `<div class="container">...</div>`; // Your HTML
        }
        return;
    }

    let allProductsHTML = '';
    productArray.forEach((product) => {
        allProductsHTML += buildProductHTML(product); // Use the helper
    });

    container.innerHTML = allProductsHTML; // REPLACES
    
    // Run the timer update (it's efficient and will find new timers)
    updateAllTimers();
}

// ====== NEW: APPEND PRODUCTS (FOR SCROLLING) ======
// This function *ADDS* content to the container.
// It's used for all infinite scroll loads *after* the first one.
function appendProducts(productArray, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let allProductsHTML = '';
    productArray.forEach((product) => {
        allProductsHTML += buildProductHTML(product); // Use the helper
    });

    container.innerHTML += allProductsHTML; // APPENDS
    
    // Run the timer update
    updateAllTimers();
}


// ====== NEW: CLICK LISTENER SETUP (RUNS ONCE) ======
// This sets up the one-click listener that works for all products.
function setupClickDelegate(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.addEventListener('click', function(e) {
        const clickedBtn = e.target.closest('.add-btn');
        
        if (clickedBtn) {
            e.stopPropagation(); // Stop the click from navigating the <a> tag
            e.preventDefault();  // Prevent the default link behavior
            
            const productId = parseInt(clickedBtn.id.split('-')[2]);
            
            // IMPORTANT: Search the *masterProductList* for the clicked product
            // This ensures we find the product even if it's not in the initial batch
            const product = masterProductList.find(p => p.id === productId); 
            
            if (product) {
                addToCart(product);
            } else {
                // Fallback in case master list isn't set (e.g., search page)
                // We can try to find it in the *full* original products.js list
                // Assumes 'packetProducts' exists from products.js
                const fallbackProduct = (typeof packetProducts !== 'undefined') 
                    ? packetProducts.find(p => p.id === productId) 
                    : null;
                if(fallbackProduct) addToCart(fallbackProduct);
            }
        }
    });
}

// ====== COUNTDOWN TIMER FUNCTION (PERFECT, UNCHANGED) ======
// This is perfectly efficient. No changes needed.
async function updateAllTimers() {
    const now = new Date().getTime();
    document.querySelectorAll('.product-timer[data-end-time]').forEach(timerElement => {
        const endTimeString = timerElement.dataset.endTime;
        const addBtnId = timerElement.dataset.btnId;
        const endTime = new Date(endTimeString).getTime();
        const distance = endTime - now;

        if (distance < 0) {
            timerElement.innerHTML = "Offer Expired!";
            timerElement.style.color = "red";
            timerElement.removeAttribute('data-end-time'); 
            const addBtn = document.getElementById(addBtnId);
            if (addBtn) {
                addBtn.disabled = true;
                addBtn.innerText = "Closed";
            }
        } else {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            const fDays = String(days).padStart(2, '0');
            const fHours = String(hours).padStart(2, '0');
            const fMinutes = String(minutes).padStart(2, '0');
            const fSeconds = String(seconds).padStart(2, '0');
            timerElement.innerHTML = `<strong><i class="fa-solid fa-bomb"></i> ${fDays}d ${fHours}:${fMinutes}:${fSeconds}</strong>`;
        }
    });
}


// ====== CART MANAGEMENT (PERFECT, UNCHANGED) ======
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
    const index = cart.findIndex(item => item.id === product.id);

    if (index !== -1) {
        cart[index].quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
    updateCartCount();
    product.name = product.name
    .split(" ")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

    product.name=product.name.length > 25 ? product.name.substring(0, 25) + "..." : product.name;
    
    cartMessage.style.display= "inline-flex";
    cartMessage.innerHTML = `<strong> <i class="fa-solid fa-check" style="color: #50e658ff;font-size: 20px;"></i> ${product.name} added to cart! </strong>`;
    
    setTimeout(() => {
    cartMessage.style.display = "none";
}, 4000); // 4000 ms = 4 seconds
}