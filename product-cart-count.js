        let body = document.querySelector('body');;   // ALWAYS attach to body, works everywhere

        let cartMessage = document.createElement("div");
        cartMessage.className = "cartMessage";
        body.append(cartMessage);
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
                product.name = product.name
            .split(" ")
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");

            product.name=product.name.length > 16 ? product.name.substring(0, 16) + "..." : product.name;
            
            cartMessage.style.display= "inline-flex";
            cartMessage.innerHTML = `<strong> <i class="fa-solid fa-check" style="color: #50e658ff;font-size: 20px;"></i> ${product.name} added to cart! </strong>`;
            
            setTimeout(() => {
            cartMessage.style.display = "none";
            }, 4000); // 4000 ms = 4 seconds

}
        document.addEventListener("DOMContentLoaded", updateCartCount);
