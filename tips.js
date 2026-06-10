// Gas Saving Tips Module
const GAS_TIPS = [
  {
    title: '⏰ Best Time to Transact',
    tip: 'Gas fees are lowest on weekends and late nights (UTC). Try transacting between 2-8 AM UTC for cheapest fees.',
    savings: 'Save up to 50%'
  },
  {
    title: '🔄 Use Layer 2 Networks',
    tip: 'Base, Optimism and Arbitrum offer 10-100x cheaper transactions than Ethereum mainnet.',
    savings: 'Save up to 90%'
  },
  {
    title: '📦 Batch Transactions',
    tip: 'Combine multiple actions into one transaction using multicall contracts to save on base gas costs.',
    savings: 'Save up to 40%'
  },
  {
    title: '⚡ Set Custom Gas Limits',
    tip: 'Set gas limit slightly above the estimate. Unused gas is refunded but setting too low causes failures.',
    savings: 'Avoid failed txs'
  },
  {
    title: '🦄 Use DEX Aggregators',
    tip: 'DEX aggregators like 1inch find the most gas-efficient swap routes automatically.',
    savings: 'Save up to 30%'
  },
  {
    title: '📅 Avoid Peak Hours',
    tip: 'Avoid transacting during US/EU business hours (14:00-22:00 UTC) when demand is highest.',
    savings: 'Save up to 60%'
  }
];

function renderGasTips() {
  const container = document.querySelector('#gas-tips');
  if (!container) return;

  container.innerHTML = `
    <div style="max-width:600px;margin:24px auto;padding:0 24px">
      <h3 style="margin-bottom:16px">💡 Gas Saving Tips</h3>
      ${GAS_TIPS.map(tip => `
        <div style="background:var(--card);border-radius:12px;
          padding:16px;margin-bottom:12px;
          border:1px solid var(--border)">
          <div style="display:flex;justify-content:space-between;
            align-items:center;margin-bottom:8px">
            <strong>${tip.title}</strong>
            <span style="background:rgba(0,200,83,0.2);
              color:#00c853;padding:2px 8px;
              border-radius:20px;font-size:12px">
              ${tip.savings}
            </span>
          </div>
          <p style="color:#888;font-size:14px;line-height:1.5">
            ${tip.tip}
          </p>
        </div>
      `).join('')}
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', renderGasTips);