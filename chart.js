// Gas History Chart
function renderGasChart() {
  const history = JSON.parse(
    localStorage.getItem('gas_history') || '[]'
  ).slice(0, 10).reverse();

  const container = document.querySelector('#gas-chart');
  if (!container || history.length === 0) return;

  const maxVal = Math.max(...history.map(h => parseFloat(h.fast)), 0.01);
  const width = 560;
  const height = 160;
  const padding = 32;
  const chartW = width - padding * 2;
  const chartH = height - padding * 2;
  const step = chartW / Math.max(history.length - 1, 1);

  const points = (key, color) => {
    const coords = history.map((h, i) => {
      const x = padding + i * step;
      const y = padding + chartH - (parseFloat(h[key]) / maxVal) * chartH;
      return `${x},${y}`;
    });
    return `
      <polyline 
        points="${coords.join(' ')}" 
        fill="none" 
        stroke="${color}" 
        stroke-width="2"
      />
      ${history.map((h, i) => {
        const x = padding + i * step;
        const y = padding + chartH - (parseFloat(h[key]) / maxVal) * chartH;
        return `<circle cx="${x}" cy="${y}" r="3" fill="${color}"/>`;
      }).join('')}
    `;
  };

  container.innerHTML = `
    <div style="max-width:600px;margin:24px auto;padding:0 24px">
      <h3 style="margin-bottom:16px">📈 Gas History</h3>
      <svg width="100%" viewBox="0 0 ${width} ${height}"
        style="background:var(--card);border-radius:12px">
        <line x1="${padding}" y1="${padding}" 
          x1="${padding}" y2="${padding + chartH}"
          stroke="var(--border)" stroke-width="1"/>
        <line x1="${padding}" y1="${padding + chartH}"
          x2="${padding + chartW}" y2="${padding + chartH}"
          stroke="var(--border)" stroke-width="1"/>
        ${points('slow', '#00c853')}
        ${points('average', '#ffab00')}
        ${points('fast', '#ff3d00')}
      </svg>
      <div style="display:flex;gap:16px;margin-top:8px;font-size:12px">
        <span style="color:#00c853">● Slow</span>
        <span style="color:#ffab00">● Average</span>
        <span style="color:#ff3d00">● Fast</span>
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  renderGasChart();