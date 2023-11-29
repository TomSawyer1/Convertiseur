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
// ...

async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (fromCurrency === toCurrency) {
        alert('Please select different currencies.');
        return;
    }

    const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}`);
    const result = await response.json();

    const rates = result.rates;

    // Afficher le résultat
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    if (toCurrency === 'To all currency') {
        const table = document.createElement('table');
        table.innerHTML = `
            <tr>
                <th>Currency</th>
                <th>Converted Amount</th>
            </tr>
        `;

        Object.keys(rates).forEach(currency => {
            const convertedAmount = (amount * rates[currency]).toFixed(2);
            const row = table.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            cell1.textContent = currency;
            cell2.textContent = convertedAmount;
        });

        // Ajouter le tableau au résultat
        resultDiv.appendChild(table);
    } else {
        // Afficher la conversion normale
        resultDiv.textContent = `${amount} ${fromCurrency} equals ${result.rates[toCurrency]} ${toCurrency}`;
    }
}

// ...

window.onload = fetchCurrencies;
