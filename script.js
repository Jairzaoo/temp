// Google Sheets CSV export URL (public)
const SHEET_ID = '16fQERKg5jus9Zk3USdnfaaZyRscBD0BoUPGmOCzy3go';
const GID = '0';
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${GID}`;

function parseCSV(text) {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map(line => {
        const values = line.split(',');
        let obj = {};
        headers.forEach((h, i) => obj[h.trim()] = values[i]?.trim());
        return obj;
    });
}

async function loadWeatherData() {
    const res = await fetch(CSV_URL);
    const csv = await res.text();
    const data = parseCSV(csv);
    const tbody = document.querySelector('#weather-table tbody');
    tbody.innerHTML = '';
    data.reverse().forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row['Data'] || ''}</td>
            <td>${row['Horario'] || ''}</td>
            <td>${row['Temperatura'] || ''}</td>
            <td>${row['Umidade'] || ''}</td>
        `;
        tbody.appendChild(tr);
    });
}

window.onload = loadWeatherData;
