const display = document.getElementById('password-display');
const lengthSlider = document.getElementById('length-slider');
const themeToggle = document.getElementById('slider');
const strengthBar = document.getElementById('strength-bar');

const chars = {
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lower: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-="
};

// --- Live Updates ---
const updateAll = () => {
    document.getElementById('length-val').innerText = lengthSlider.value;
    generatePassword();
};

const generatePassword = () => {
    let length = lengthSlider.value;
    let charset = chars.lower;
    let types = 1;

    if (document.getElementById('uppercase').checked) { charset += chars.upper; types++; }
    if (document.getElementById('numbers').checked) { charset += chars.numbers; types++; }
    if (document.getElementById('symbols').checked) { charset += chars.symbols; types++; }

    let password = "";
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    display.value = password;
    updateStrength(length, types);
};

// --- Strength Meter Logic ---
function updateStrength(len, types) {
    let score = (len / 50) * 50 + (types / 4) * 50;
    strengthBar.style.width = score + "%";
    strengthBar.style.height = "6px";
    strengthBar.style.borderRadius = "10px";
    
    if (score < 40) strengthBar.style.background = "#ff7675";
    else if (score < 75) strengthBar.style.background = "#fdcb6e";
    else strengthBar.style.background = "#55efc4";
}

// --- Event Listeners ---
document.getElementById('generate-btn').addEventListener('click', generatePassword);
document.getElementById('reset-btn').addEventListener('click', () => {
    display.value = "";
    strengthBar.style.width = "0%";
});

// Dark Mode Toggle
themeToggle.addEventListener('change', () => {
    document.documentElement.setAttribute('data-theme', themeToggle.checked ? 'dark' : 'light');
});

// Live generation when settings change
[lengthSlider, ...document.querySelectorAll('input[type="checkbox"]')].forEach(el => {
    el.addEventListener('input', updateAll);
});

// Copy Function
document.getElementById('copy-btn').onclick = () => {
    navigator.clipboard.writeText(display.value);
    display.style.background = "rgba(85, 239, 196, 0.2)";
    setTimeout(() => display.style.background = "transparent", 500);
};