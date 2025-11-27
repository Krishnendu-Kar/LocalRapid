document.addEventListener("DOMContentLoaded", function () {
    // 1. Define your menu items
    const menuItems = [
        { name: "Home", link: "index.html" },
        { name: "Snacks", link: "snacksCategory.html" },
        { name: "Best Deal", link: "bestdealCategory.html" },
        { name: "Combo Offer", link: "comboCategory.html" },
        { name: "Staples", link: "groceryCategory.html" },
        { name: "Medicine", link: "medicineCategory.html" },
        { name: "Candle", link: "candleCategory.html" },
        { name: "Soap Shampoo Detergents", link: "soapSampooDiterjentCategory.html" },
        { name: "Oil", link: "oilCategory.html" },
        { name: "Biscuits", link: "biscuitCategory.html" },
        { name: "Cold Drink", link: "colddrinkCategory.html" },
        { name: "Daily Use Products", link: "dailyProductCategory.html" },
        { name: "Study Material", link: "educationCategory.html" },
        { name: "Other", link: "otherCategory.html" },
        { name: "Lucky Winners", link: "lucky winners.html" },
        { name: "Tutorial Video", link: "tutorial video.html" },
        { name: "Become a Seller", link: "seller home.html" },
        { name: "About Us", link: "about_us.html" }
    ];

    // 2. Select the container
    const container = document.getElementById("global-sidebar-container");
    
    if (!container) {
        console.error("Error: Element with id 'global-sidebar-container' not found.");
        return;
    }

    // --- NEW LOGIC STARTS HERE ---
    
    // Get the current file name from the URL
    // .split('/').pop() takes the last part of the URL (the filename)
    let currentFile = window.location.pathname.split("/").pop();
    
    // Decode the URL (turns "lucky%20winners.html" back into "lucky winners.html")
    currentFile = decodeURIComponent(currentFile);

    // Handle the homepage case (if website.com/ matches index.html)
    if (currentFile === "") currentFile = "index.html";

    // 3. Generate the HTML
    const linksHtml = menuItems.map(item => {
        // Compare the cleaned filename with your link
        const isActive = (currentFile === item.link) ? 'active' : '';
        
        return `<a class="bar-a ${isActive}" href="${item.link}">${item.name}</a>`;
    }).join('');

    // --- NEW LOGIC ENDS HERE ---

    container.innerHTML = `
        <div class="hamburger border" id="hamburger-btn">
            <i class="fa-solid fa-bars-staggered"></i> All
        </div>
        
        <div class="sidebar" id="sidebar">
            ${linksHtml}
        </div>

        <div class="overlay" id="overlay"></div>
    `;

    // 4. Add Event Listeners
    const hamburger = document.getElementById("hamburger-btn");
    const overlay = document.getElementById("overlay");
    const sidebar = document.getElementById("sidebar");

    function toggleSidebar() {
        sidebar.classList.toggle("active");
        overlay.classList.toggle("active");
    }

    hamburger.addEventListener("click", toggleSidebar);
    overlay.addEventListener("click", toggleSidebar);
});