//your JS code here. If required.
// Get the form element
const form = document.querySelector('form');

// Function to set cookies
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = 'expires=' + date.toUTCString();
  document.cookie = name + '=' + value + ';' + expires + ';path=/';
}

// Function to get cookie by name
function getCookie(name) {
  const cookieName = name + '=';
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return '';
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();

  const fontSizeInput = document.getElementById('fontsize');
  const fontColorInput = document.getElementById('fontcolor');

  const fontSize = fontSizeInput.value + 'px';
  const fontColor = fontColorInput.value;

  // Update CSS variables
  document.documentElement.style.setProperty('--fontsize', fontSize);
  document.documentElement.style.setProperty('--fontcolor', fontColor);

  // Save preferences in cookies
  setCookie('fontsize', fontSize, 30);
  setCookie('fontcolor', fontColor, 30);
}

// Fill form inputs with stored preferences on page load
window.addEventListener('load', () => {
  const savedFontSize = getCookie('fontsize');
  const savedFontColor = getCookie('fontcolor');

  if (savedFontSize) {
    document.getElementById('fontsize').value = parseInt(savedFontSize);
  }

  if (savedFontColor) {
    document.getElementById('fontcolor').value = savedFontColor;
  }
});

// Attach form submission handler
form.addEventListener('submit', handleFormSubmit);
