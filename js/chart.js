/**
 * Chart.js wrapper and chart rendering
 * Handles all chart-related operations
 */

let chartInstance = null;

/**
 * Initialize the chart
 */
export function initializeChart() {
    const ctx = document.getElementById('portfolioChart');
    if (!ctx) {
        console.warn('Chart canvas not found');
        return;
    }
    
    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Portfolio Value',
                data: [],
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed.y;
                            return new Intl.NumberFormat('fr-FR', {
                                style: 'currency',
                                currency: 'EUR',
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                            }).format(value);
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Years'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Portfolio Value'
                    },
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            // Format with currency (French formatting)
                            return new Intl.NumberFormat('fr-FR', {
                                style: 'currency',
                                currency: 'EUR',
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                            }).format(value);
                        }
                    }
                }
            }
        }
    });
}

/**
 * Update chart with new data
 * @param {Array} timeline - Timeline data from calculator
 * @param {string} currency - Currency symbol for formatting
 */
export function updateChart(timeline, currency = 'EUR') {
    if (!chartInstance) {
        initializeChart();
    }
    
    if (!chartInstance) return;
    
    const labels = timeline.map(point => Math.round(point.year));
    const data = timeline.map(point => point.balance);
    
    chartInstance.data.labels = labels;
    chartInstance.data.datasets[0].data = data;
    chartInstance.update('active');
}

/**
 * Get chart instance (for advanced features)
 */
export function getChartInstance() {
    return chartInstance;
}

