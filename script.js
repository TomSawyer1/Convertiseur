// Récupérer les devises disponibles depuis l'API Frankfurter
async function fetchCurrencies() {
    const response = await fetch('https://api.frankfurter.app/currencies');
    const currencies = await response.json();

    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');

    // Ajouter les devises à la liste déroulante
    Object.keys(currencies).forEach(currency => {
        const option = document.createElement('option');
        option.value = currency;
        option.text = currency;
        fromCurrencySelect.add(option.cloneNode(true));
        toCurrencySelect.add(option);
    });
}

// API Frankfurter
async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    // Vérifier si les devises sont différentes
    if (fromCurrency === toCurrency) {
        alert('Please select different currencies.');
        return;
    }

    const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
    const result = await response.json();

    // Afficher le résultat
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `${amount} ${fromCurrency} equals ${result.rates[toCurrency]} ${toCurrency}`;
}

window.onload = fetchCurrencies;
