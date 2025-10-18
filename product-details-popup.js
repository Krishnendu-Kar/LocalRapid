        // ADD THIS NEW FUNCTION TO YOUR SCRIPT
        function setupModalListeners() {
            // --- Setup for Stock Modal ---
            const stockMessageTrigger = document.getElementById('stock-message');
            const stockModalOverlay = document.getElementById('info-modal-overlay');
            const closeStockButton = document.getElementById('close-stock-button');

            // Add listeners only if the stock elements exist
            if (stockMessageTrigger && stockModalOverlay && closeStockButton) {
                stockMessageTrigger.addEventListener('click', () => stockModalOverlay.classList.remove('hidden'));
                closeStockButton.addEventListener('click', () => stockModalOverlay.classList.add('hidden'));
                stockModalOverlay.addEventListener('click', (event) => {
                    if (event.target === stockModalOverlay) {
                        stockModalOverlay.classList.add('hidden');
                    }
                });
            }

            // --- Setup for Expiry Date Modal ---
            const expiryDateTrigger = document.getElementById('expiry-date-message');
            const expiryModalOverlay = document.getElementById('expiry-modal-overlay');
            const closeExpiryButton = document.getElementById('close-expiry-button');

            // Add listeners only if the expiry date elements exist
            if (expiryDateTrigger && expiryModalOverlay && closeExpiryButton) {
                expiryDateTrigger.addEventListener('click', () => expiryModalOverlay.classList.remove('hidden'));
                closeExpiryButton.addEventListener('click', () => expiryModalOverlay.classList.add('hidden'));
                expiryModalOverlay.addEventListener('click', (event) => {
                    if (event.target === expiryModalOverlay) {
                        expiryModalOverlay.classList.add('hidden');
                    }
                });
            }

            // --- General Event Listener for 'Escape' key to close any open modal ---
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Escape') {
                    if (stockModalOverlay && !stockModalOverlay.classList.contains('hidden')) {
                        stockModalOverlay.classList.add('hidden');
                    }
                    if (expiryModalOverlay && !expiryModalOverlay.classList.contains('hidden')) {
                        expiryModalOverlay.classList.add('hidden');
                    }
                }
            });
        }
