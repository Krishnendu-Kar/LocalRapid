document.addEventListener("DOMContentLoaded", function() {
    createBackToTopButton();
});

function createBackToTopButton() {
    // 1. Create the Styles programmatically
    const style = document.createElement('style');
    style.innerHTML = `
        #backToTop {
            display: none; /* Hidden by default */
            position: fixed;
            bottom: 80px; /* Above the footer/mobile nav */
            right: 20px;
            z-index: 999;
            font-size: 18px;
            border: none;
            outline: none;
            background-color: #ff5959;
            color: white;
            cursor: pointer;
            padding: 12px 16px;
            border-radius: 50%;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            transition: transform 0.3s, background-color 0.3s;
        }

        #backToTop:hover {
            background-color: #d63c3c;
            transform: translateY(-5px);
        }
    `;
    document.head.appendChild(style);

    // 2. Create the HTML Button element
    const btn = document.createElement('button');
    btn.id = "backToTop";
    btn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    btn.title = "Go to top";
    
    // Add click event for smooth scrolling
    btn.onclick = function() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    // Append to body
    document.body.appendChild(btn);

    // 3. Add Scroll Logic
    window.addEventListener('scroll', function() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            btn.style.display = "block";
        } else {
            btn.style.display = "none";
        }
    });
}