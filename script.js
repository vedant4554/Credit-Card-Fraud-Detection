const form = document.getElementById('transaction-form');
const result = document.getElementById('result');
const tableBody = document.querySelector('#transaction-table tbody');
const themeToggle = document.getElementById('theme-toggle');
const randomBtn = document.getElementById('random-btn');

// Detect fraud logic
function detectFraud(amount, location, time, cardPresent) {
  let isFraud = false;
  let reasons = [];

  if (amount > 1000) {
    isFraud = true;
    reasons.push("High transaction amount");
  }

  if (location !== 'usa' && cardPresent === 'no') {
    isFraud = true;
    reasons.push("Foreign location + card not present");
  }

  if (time < 6 || time > 22) {
    isFraud = true;
    reasons.push("Odd transaction hour");
  }

  return {
    isFraud,
    message: isFraud ? `⚠️ Fraud Detected: ${reasons.join(', ')}` : "✅ Transaction is SAFE"
  };
}

// Add row to summary table
function addToTable(amount, location, time, card, status) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>$${amount}</td>
    <td>${location}</td>
    <td>${time}:00</td>
    <td>${card}</td>
    <td style="color: ${status.includes('Fraud') ? 'red' : 'green'}">${status}</td>
  `;
  tableBody.prepend(row);
}

// Form submit
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const amount = parseFloat(document.getElementById('amount').value);
  const location = document.getElementById('location').value.trim().toLowerCase();
  const time = parseInt(document.getElementById('time').value);
  const cardPresent = document.getElementById('card-present').value;

  const detection = detectFraud(amount, location, time, cardPresent);
  result.textContent = detection.message;
  result.style.color = detection.isFraud ? 'red' : 'green';

  addToTable(amount, location, time, cardPresent, detection.message);
});

// Theme toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Random transaction filler
randomBtn.addEventListener('click', () => {
  const locations = ['usa', 'india', 'uk', 'germany', 'canada'];
  const randomAmount = Math.floor(Math.random() * 2000);
  const randomLocation = locations[Math.floor(Math.random() * locations.length)];
  const randomTime = Math.floor(Math.random() * 24);
  const card = Math.random() > 0.5 ? 'yes' : 'no';

  document.getElementById('amount').value = randomAmount;
  document.getElementById('location').value = randomLocation;
  document.getElementById('time').value = randomTime;
  document.getElementById('card-present').value = card;
});
