// category-loader.js

document.addEventListener("DOMContentLoaded", () => {
    // 1. Automatically detect the category based on the filename
    // Example: "snacksCategory.html" -> "snacks"
    const path = window.location.pathname;
    const pageFilename = path.split("/").pop(); 
    const categoryName = pageFilename.replace('Category.html', '');

    // 2. Check if products exist
    if (typeof packetProducts === 'undefined') {
        console.error("Error: products.js is not loaded or is empty.");
        return;
    }

    // 3. Filter the full list to get only this category's items
    const categoryProducts = packetProducts.filter(product => product.category === categoryName);

    // 4. Initialize the Doom Scrolling (Infinite Scroll)
    // defined in app.js. 
    // Args: (List, InitialCount, SubsequentCount)
    initInfiniteScroll(categoryProducts, 23, 16);

    // 5. Setup Search Listener specific to this Category
    const searchInput = document.getElementById('productSearch');
    if (searchInput) {
        // Remove 'onkeyup' attribute from HTML to avoid conflicts, 
        // or just overwrite the behavior here.
        searchInput.onkeyup = (e) => {
            handleCategorySearch(e.target.value, categoryName);
        };
    }
});

/**
 * Handles searching within a specific category.
 * If search text exists, it disables infinite scroll and shows matches.
 * If search is cleared, it re-initializes infinite scroll.
 */
function handleCategorySearch(query, categoryName) {
    query = query.toLowerCase().trim();

    // If search is empty, reset to "Doom Scrolling" mode
    if (query.length === 0) {
        const originalList = packetProducts.filter(p => p.category === categoryName);
        
        // This resets flags and loads the first 23 items again
        initInfiniteScroll(originalList, 23, 16);
        return;
    }

    // If searching, stop the scroll loader
    isSearchActive = true; 
    
    // Filter logic
    const filteredProducts = packetProducts.filter(p => 
        p.category === categoryName && 
        p.name.toLowerCase().includes(query)
    );

    // Display all results found (Search doesn't usually use infinite scroll)
    displayProducts(filteredProducts, 'productList', 'search');
}