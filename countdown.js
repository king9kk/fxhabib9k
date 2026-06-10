// Gas Update Countdown Timer
let countdownInterval = null;
let secondsLeft = 15;

function startCountdown(seconds = 15) {
  secondsLeft = seconds;
  stopCountdown();

  countdownInterval = setInterval(() => {
    secondsLeft--;
    updateCountdownUI();

    if (secondsLeft <= 0) {
      secondsLeft = seconds;
      updateGasUI();
    }
  }, 1000);

  updateCountdownUI();
}

function stopCountdown() {
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
}

function updateCountdownUI() {
  const el = document.querySelector('#countdown');
  if (!el) return;

  const percent = (secondsLeft / 15) * 100;
  el.innerHTML = `
    <div style="display:flex;align-items:center;gap:8px;
      font-size:13px;color:#888">
      <svg width="24" height="24" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" 
          fill="none" stroke="var(--border)" stroke-width="2"/>
        <circle cx="12" cy="12" r="10"
          fill="none" stroke="#0052ff" stroke-width="2"
          stroke-dasharray="${2 * Math.PI * 10}"
          stroke-dashoffset="${2 * Math.PI * 10 * (1 - percent / 100)}"
          transform="rotate(-90 12 12)"
          style="transition: stroke-dashoffset 1s linear"/>
      </svg>
      <span>Refreshing in ${secondsLeft}s</span>
    </div>
  `;
}

function initRefreshButton() {
  const btn = document.querySelector('.refresh-btn');
  if (!btn) return;
  btn.addEventListener('click', async () => {
    btn.textContent = '🔄 Refreshing...';
    btn.disabled = true;
    await updateGasUI();
    renderGasChart();
    secondsLeft = 15;
    btn.textContent = '🔄 Refresh Now';
    btn.disabled = false;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  startCountdown(15);
  initRefreshButton();
});