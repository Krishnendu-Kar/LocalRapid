
        // ====== CART MANAGEMENT ======
        function getCart() {
        return JSON.parse(localStorage.getItem("cart")) || []; }
        function saveCart(cart) { localStorage.setItem("cart", JSON.stringify(cart)); }
        function updateCartCount() {
            const cart = getCart();
            const count = cart.reduce((sum, item) => sum + item.quantity, 0);
            document.querySelector(".cart-amount").textContent = count;
        }
        function addToCart(product) {
            let cart = getCart();
            const index = cart.findIndex(item => item.id === product.id);
            if (index !== -1) { cart[index].quantity += 1; }
            else { cart.push({ ...product, quantity: 1 }); }
            saveCart(cart);
            updateCartCount();
            alert(`${product.name} added to cart!`);
        }
        document.addEventListener("DOMContentLoaded", updateCartCount);
