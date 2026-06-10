// Gas Price Alert System
const GAS_ALERT_KEY = 'gas_alerts';

function getGasAlerts() {
  try {
    return JSON.parse(localStorage.getItem(GAS_ALERT_KEY)) || [];
  } catch {
    return [];
  }
}

function addGasAlert(threshold, type = 'below') {
  const alerts = getGasAlerts();
  alerts.push({
    id: Date.now(),
    threshold: parseFloat(threshold),
    type,
    active: true,
    createdAt: new Date().toISOString()
  });
  localStorage.setItem(GAS_ALERT_KEY, JSON.stringify(alerts));
  showToast('Gas alert added!', 'success');
  renderGasAlerts();
}

function removeGasAlert(id) {
  let alerts = getGasAlerts();
  alerts = alerts.filter(a => a.id !== id);
  localStorage.setItem(GAS_ALERT_KEY, JSON.stringify(alerts));
  renderGasAlerts();
}

async function checkGasAlerts() {
  const prices = await fetchGasPrices();
  const avgPrice = parseFloat(prices.average);
  const alerts = getGasAlerts().filter(a => a.active);

  alerts.forEach(alert => {
    if (alert.type === 'below' && avgPrice < alert.threshold) {
      showToast(`⚡ Gas is low! ${avgPrice} Gwei`, 'success');
    }
    if (alert.type === 'above' && avgPrice > alert.threshold) {
      showToast(`⚠️ Gas is high! ${avgPrice} Gwei`, 'error');
    }
  });
}

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position:fixed;bottom:24px;right:24px;
    padding:12px 20px;border-radius:8px;
    background:${type === 'success' ? '#00c853' : '#ff3d00'};
    color:white;z-index:9999;font-size:14px;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function renderGasAlerts() {
  const container = document.querySelector('#gas-alerts');
  if (!container) return;
  const alerts = getGasAlerts();

  container.innerHTML = `
    <div style="max-width:600px;margin:24px auto;padding:0 24px">
      <h3 style="margin-bottom:16px">🔔 Gas Alerts</h3>
      ${alerts.length === 0
        ? '<p style="color:#888">No alerts set</p>'
        : alerts.map(a => `
          <div class="history-item">
            <span>${a.type === 'below' ? '⬇️' : '⬆️'} ${a.threshold} Gwei</span>
            <button onclick="removeGasAlert(${a.id})"
              style="background:#ff3d00;color:white;border:none;
              padding:4px 10px;border-radius:6px;cursor:pointer">
              Remove
            </button>
          </div>
        `).join('')}
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  renderGasAlerts();
  setInterval(checkGasAlerts, 30000);
});