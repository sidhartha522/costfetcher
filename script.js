// Global variables
let currentExchangeRate = 0;
let deferredPrompt;

// DOM Elements
const exchangeRateElement = document.getElementById('exchangeRate');
const lastUpdatedElement = document.getElementById('lastUpdated');
const footerLastUpdatedElement = document.getElementById('footerLastUpdated');
const refreshRateButton = document.getElementById('refreshRate');
const calculatorForm = document.getElementById('calculatorForm');
const resultsDiv = document.getElementById('results');
const errorDiv = document.getElementById('error');

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializePWA();
    fetchExchangeRate();
    setupEventListeners();
});

// PWA Installation and Service Worker
function initializePWA() {
    // Register service worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then((registration) => {
                    console.log('SW registered: ', registration);
                })
                .catch((registrationError) => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }

    // Handle app install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        showInstallPrompt();
    });

    // Handle successful installation
    window.addEventListener('appinstalled', () => {
        console.log('PWA was installed');
        hideInstallPrompt();
    });
}

function showInstallPrompt() {
    const installPrompt = document.createElement('div');
    installPrompt.className = 'install-prompt';
    installPrompt.innerHTML = `
        <span>📱 Install this app for easy access!</span>
        <div>
            <button onclick="installApp()">Install</button>
            <button class="close-btn" onclick="hideInstallPrompt()">×</button>
        </div>
    `;
    document.body.appendChild(installPrompt);
}

function hideInstallPrompt() {
    const prompt = document.querySelector('.install-prompt');
    if (prompt) {
        prompt.remove();
    }
}

function installApp() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            }
            deferredPrompt = null;
            hideInstallPrompt();
        });
    }
}

// Event Listeners
function setupEventListeners() {
    refreshRateButton.addEventListener('click', fetchExchangeRate);
    calculatorForm.addEventListener('submit', calculatePrice);
}

// Exchange Rate Functions
async function fetchExchangeRate() {
    try {
        showLoading(true);
        hideError();
        
        // Using exchangerate-api.com for real-time rates
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/CNY');
        
        if (!response.ok) {
            throw new Error('Failed to fetch exchange rate');
        }
        
        const data = await response.json();
        currentExchangeRate = data.rates.INR;
        
        updateExchangeRateDisplay();
        updateLastUpdated();
        
    } catch (error) {
        console.error('Error fetching exchange rate:', error);
        
        // Try fallback API
        try {
            const fallbackResponse = await fetch('https://api.fxratesapi.com/latest?base=CNY&symbols=INR');
            const fallbackData = await fallbackResponse.json();
            currentExchangeRate = fallbackData.rates.INR;
            updateExchangeRateDisplay();
            updateLastUpdated();
        } catch (fallbackError) {
            // Use cached rate or default
            const cachedRate = localStorage.getItem('lastExchangeRate');
            if (cachedRate) {
                currentExchangeRate = parseFloat(cachedRate);
                updateExchangeRateDisplay();
                showError('Using cached exchange rate. Please check your internet connection.');
            } else {
                currentExchangeRate = 11.5; // Fallback rate
                updateExchangeRateDisplay();
                showError('Unable to fetch current exchange rate. Using approximate rate of ₹11.5 per CNY.');
            }
        }
    } finally {
        showLoading(false);
    }
}

function updateExchangeRateDisplay() {
    exchangeRateElement.textContent = `1 CNY = ₹${currentExchangeRate.toFixed(4)}`;
    // Cache the rate
    localStorage.setItem('lastExchangeRate', currentExchangeRate.toString());
}

function updateLastUpdated() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-IN', { 
        hour: '2-digit', 
        minute: '2-digit',
        timeZone: 'Asia/Kolkata'
    });
    const dateString = now.toLocaleDateString('en-IN', {
        timeZone: 'Asia/Kolkata'
    });
    
    const updateText = `${dateString} at ${timeString}`;
    lastUpdatedElement.textContent = `Updated: ${timeString}`;
    footerLastUpdatedElement.textContent = updateText;
    
    // Cache the update time
    localStorage.setItem('lastUpdated', updateText);
}

function showLoading(show) {
    if (show) {
        refreshRateButton.innerHTML = '<div class="loading"></div>';
        refreshRateButton.disabled = true;
    } else {
        refreshRateButton.innerHTML = '🔄';
        refreshRateButton.disabled = false;
    }
}

// Calculation Functions
function calculatePrice(event) {
    event.preventDefault();
    
    try {
        hideError();
        
        // Get input values
        const furniturePrice = parseFloat(document.getElementById('furniturePrice').value);
        
        // Validate furniture price
        if (isNaN(furniturePrice) || furniturePrice <= 0) {
            throw new Error('Please enter a valid furniture price');
        }
        
        // Get volume transport values
        const transportChargeVolume = parseFloat(document.getElementById('transportChargeVolume').value) || 0;
        const furnitureVolume = parseFloat(document.getElementById('furnitureVolume').value) || 0;
        
        // Get weight transport values
        const transportChargeWeight = parseFloat(document.getElementById('transportChargeWeight').value) || 0;
        const furnitureWeight = parseFloat(document.getElementById('furnitureWeight').value) || 0;
        
        // Calculate transport costs
        const volumeTransportCost = transportChargeVolume * furnitureVolume;
        const weightTransportCost = transportChargeWeight * furnitureWeight;
        const totalTransportCost = volumeTransportCost + weightTransportCost;
        
        if (currentExchangeRate <= 0) {
            throw new Error('Exchange rate not available. Please refresh the rate.');
        }
        
        // Calculate costs
        const subtotalCNY = furniturePrice + totalTransportCost;
        const subtotalINR = subtotalCNY * currentExchangeRate;
        const totalPriceINR = subtotalINR;
        
        // Display results
        displayResults({
            furniturePrice,
            volumeTransportCost,
            weightTransportCost,
            totalTransportCost,
            subtotalCNY,
            subtotalINR,
            totalPriceINR
        });
        
    } catch (error) {
        showError(error.message);
    }
}

function displayResults(calculations) {
    // Update result elements
    document.getElementById('furniturePriceCNY').textContent = `¥${calculations.furniturePrice.toFixed(2)}`;
    document.getElementById('volumeTransportCost').textContent = `¥${calculations.volumeTransportCost.toFixed(2)}`;
    document.getElementById('weightTransportCost').textContent = `¥${calculations.weightTransportCost.toFixed(2)}`;
    document.getElementById('totalTransportCost').textContent = `¥${calculations.totalTransportCost.toFixed(2)}`;
    document.getElementById('subtotalCNY').textContent = `¥${calculations.subtotalCNY.toFixed(2)}`;
    document.getElementById('subtotalINR').textContent = `₹${calculations.subtotalINR.toFixed(2)}`;
    document.getElementById('totalPrice').textContent = `₹${calculations.totalPriceINR.toFixed(2)}`;
    
    // Show results
    resultsDiv.classList.remove('hidden');
    
    // Smooth scroll to results
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Utility Functions
function showError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
}

function hideError() {
    errorDiv.classList.add('hidden');
}

// Load cached data on startup
function loadCachedData() {
    const cachedRate = localStorage.getItem('lastExchangeRate');
    const cachedUpdate = localStorage.getItem('lastUpdated');
    
    if (cachedRate) {
        currentExchangeRate = parseFloat(cachedRate);
        updateExchangeRateDisplay();
    }
    
    if (cachedUpdate) {
        footerLastUpdatedElement.textContent = cachedUpdate;
        lastUpdatedElement.textContent = `Cached: ${cachedUpdate.split(' at ')[1]}`;
    }
}

// Initialize cached data
loadCachedData();

// Auto-refresh exchange rate every 30 minutes
setInterval(() => {
    if (navigator.onLine) {
        fetchExchangeRate();
    }
}, 30 * 60 * 1000);

// Handle online/offline status
window.addEventListener('online', () => {
    fetchExchangeRate();
});

window.addEventListener('offline', () => {
    showError('You are offline. Using cached exchange rate.');
});
