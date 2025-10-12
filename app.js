// ====== PRODUCT DISPLAY FUNCTION ======
function displayProducts(productArray, containerId, context = 'initial') {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error("Product container not found!");
        return;
    }
    container.innerHTML = '';

    // *** THIS IS THE CORRECTED LOGIC ***
    if (productArray.length === 0) {
        // Check the context to decide which message to show
        if (context === 'search') {
            // If the context is 'search', show the "Not Found" message
            container.innerHTML = `
                <div class="not-found-container">
                    <i class="fa-solid fa-box-open not-found-icon"></i>
                    <h2>No Products Found</h2>
                    <p>We couldn't find any products matching your search. Please try again with a different keyword.</p>
                </div>
            `;
        } else {
            // Otherwise (for empty category pages), show the original "COMING SOON" message
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
        return; // Stop the function here
    }
    // *** END OF CORRECTION ***

    productArray.forEach((product) => {
        const priceHTML = (product.price === product.originalPrice || !product.originalPrice)
            ? `₹${product.price}`
            : `₹${product.price} <del>₹${product.originalPrice}</del>`;

        const discount = ((product.originalPrice - product.price)/ product.originalPrice)*100;
        discountpercent= discount.toFixed(2);
        const discountText = discountpercent > 0 ? `${discountpercent}% off` : "Best Quality";
        const discountHTML = `<span class="discount-percent">${discountText}</span>`;
        const productHTML = `
            <div class="product" onclick="window.location.href='product-details.html?id=${product.id}'">
                <div class="image-wrapper">
                    <div class="image-discount">
                        ${discountpercent > 0 ? discountHTML : ''}
                        <img loading="lazy" src="${product.image}" alt="${product.name}">
                    </div>
                    <div>
                    ${product.delivery_time ? `<p class="delivery_time"><i class="fa-solid fa-clock"></i> ${product.delivery_time} </p>` : ''} ${product.message ? `<p class="message"> ${product.message} </p>` : ''}
                    </div>                                                                                                
                </div>
               <h3>
                <abbr style="text-decoration: none;" title="${product.name}">${product.name}</abbr></h3>

                <p class="product-subcategory">${product.sub_category}</P>
                <p class="product-message">${product.amount} | ${product.little_details}</p>
                <div class="product-lower">
                    <p class="product-price">${priceHTML}</p>
                    <button class="add-btn">Add to Cart</button>
                </div>
            </div>
        `;
        container.innerHTML += productHTML;
    });

    container.querySelectorAll(".add-btn").forEach((btn, index) => {
        btn.addEventListener("click", function(e) {
            e.stopPropagation();
            const product = productArray[index];
            addToCart(product);
        });
    });
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
    if(cartAmountElement) {
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