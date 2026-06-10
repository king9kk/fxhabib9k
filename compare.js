// Network Gas Comparison Module
const NETWORK_GAS = {
  ethereum: {
    name: 'Ethereum',
    icon: '⟠',
    avgGwei: 25,
    color: '#627eea'
  },
  base: {
    name: 'Base',
    icon: '🔵',
    avgGwei: 0.002,
    color: '#0052ff'
  },
  optimism: {
    name: 'Optimism',
    icon: '🔴',
    avgGwei: 0.003,
    color: '#ff0420'
  },
  arbitrum: {
    name: 'Arbitrum',
    icon: '🔷',
    avgGwei: 0.1,
    color: '#28a0f0'
  },
  polygon: {
    name: 'Polygon',
    icon: '🟣',
    avgGwei: 50,
    color: '#8247e5'
  }
};

async function renderNetworkComparison() {
  const container = document.querySelector('#network-compare');
  if (!container) return;

  const basePrices = await fetchGasPrices();
  const baseAvg = parseFloat(basePrices.average);

  const networks = Object.values(NETWORK_GAS).map(n => ({
    ...n,
    currentGwei: n.name === 'Base' ? baseAvg : n.avgGwei,
    transferCost: ((n.name === 'Base' ? baseAvg : n.avgGwei) * 21000 / 1e9).toFixed(8)
  }));

  networks.sort((a, b) => a.currentGwei - b.currentGwei);
  const maxGwei = Math.max(...networks.map(n => n.currentGwei));

  container.innerHTML = `
    <div style="max-width:600px;margin:24px auto;padding:0 24px">
      <h3 style="margin-bottom:16px">🌐 Network Comparison</h3>
      ${networks.map(n => `
        <div style="margin-bottom:12px">
          <div style="display:flex;justify-content:space-between;
            margin-bottom:4px;font-size:14px">
            <span>${n.icon} ${n.name}</span>
            <span style="color:${n.color}">${n.currentGwei} Gwei</span>
          </div>
          <div style="background:var(--border);border-radius:4px;height:8px">
            <div style="background:${n.color};height:8px;border-radius:4px;
              width:${Math.max((n.currentGwei / maxGwei) * 100, 1)}%">
            </div>
          </div>
          <div style="font-size:11px;color:#888;margin-top:2px">
            Transfer cost: ${n.transferCost} ETH
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  renderNetworkComparison();
  setInterval(renderNetworkComparison, 30000);
});