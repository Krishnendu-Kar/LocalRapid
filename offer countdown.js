
        // ====== COUNTDOWN TIMER ======
      async function startCountdown(timerString, buttonElement, timerContainerId, timerClass) {
            const countdownContainer = document.getElementById(timerContainerId);
            if (!countdownContainer) return;
            const countDownDate = new Date(timerString).getTime();
            const countdownInterval = setInterval(function() {
                const now = new Date().getTime();
                const distance = countDownDate - now;
                if (distance > 0) {
                    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                    countdownContainer.innerHTML = `<div class="${timerClass}">Deal Ends In: ${days}d ${hours}h ${minutes}m ${seconds}s</div>`;
                } else {
                    clearInterval(countdownInterval);
                    countdownContainer.innerHTML = `<div class="${timerClass}">DEAL EXPIRED</div>`;
                    if(buttonElement) {
                        buttonElement.disabled = true;
                        buttonElement.textContent = 'Deal Expired';
                        buttonElement.classList.add('disabled');
                    }
                }
            }, 1000);
        }