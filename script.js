// Grab elements
const elHours = document.getElementById('hours');
const elMinutes = document.getElementById('minutes');
const elSeconds = document.getElementById('seconds');
const elAmPm = document.getElementById('ampm');
const elWeekday = document.getElementById('weekday');
const elMonth = document.getElementById('month');
const elDay = document.getElementById('day');
const elYear = document.getElementById('year');

const btnFormat = document.getElementById('toggle-format');
const btnTheme = document.getElementById('toggle-theme');

// Load saved preferences
let is24h = JSON.parse(localStorage.getItem('clock:is24h') ?? 'true');
let isLight = JSON.parse(localStorage.getItem('clock:isLight') ?? 'false');
applyTheme(isLight);
updateFormatButton();

// Main tick
function tick() {
  const now = new Date();

  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  let ampm = '';
  if (!is24h) {
    ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // 0 -> 12
  }

  elHours.textContent = String(hours).padStart(2, '0');
  elMinutes.textContent = String(minutes).padStart(2, '0');
  elSeconds.textContent = String(seconds).padStart(2, '0');
  elAmPm.textContent = ampm;

  const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  elWeekday.textContent = weekdays[now.getDay()];
  elMonth.textContent = months[now.getMonth()];
  elDay.textContent = now.getDate();
  elYear.textContent = now.getFullYear();
}

// Controls
btnFormat.addEventListener('click', () => {
  is24h = !is24h;
  localStorage.setItem('clock:is24h', JSON.stringify(is24h));
  updateFormatButton();
  tick(); // immediate refresh
});

btnTheme.addEventListener('click', () => {
  isLight = !isLight;
  localStorage.setItem('clock:isLight', JSON.stringify(isLight));
  applyTheme(isLight);
});

function updateFormatButton() {
  btnFormat.textContent = is24h ? '24h' : '12h';
  btnFormat.setAttribute('aria-pressed', String(!is24h)); // highlight when 12h
}

function applyTheme(light) {
  document.body.classList.toggle('light', light);
  btnTheme.setAttribute('aria-pressed', String(light));
}

// Start clock
tick();
setInterval(tick, 1000);
