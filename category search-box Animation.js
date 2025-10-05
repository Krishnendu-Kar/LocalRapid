const searchInput = document.querySelector(".search-boxAni");

            // Texts to type in placeholder
            const texts = [
            "Search products...",
            "Search categories...",
            "Search offers..."
            ];

            let textIndex = 0;
            let charIndex = 0;
            let currentText = "";
            let typing = true;

            function typeAnimation() {
            if (typing) {
                // Typing characters
                currentText = texts[textIndex].slice(0, ++charIndex);
                searchInput.setAttribute("placeholder", currentText);

                if (charIndex === texts[textIndex].length) {
                typing = false;
                setTimeout(typeAnimation, 1500); // pause before deleting
                return;
                }
            } else {
                // Deleting characters
                currentText = texts[textIndex].slice(0, --charIndex);
                searchInput.setAttribute("placeholder", currentText);

                if (charIndex === 0) {
                typing = true;
                textIndex = (textIndex + 1) % texts.length; // move to next text
                }
            }

            setTimeout(typeAnimation, typing ? 100 : 60); // typing & deleting speed
            }

            // Start animation
            typeAnimation();