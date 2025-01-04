document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (!isNaN(key)) {
        appendToDisplay(key);  // For numbers (0-9)
    } else if (key === '.') {
        appendToDisplay('.');  // Decimal point
    } else if (key === '+') {
        appendToDisplay('+');  // Addition
    } else if (key === '-') {
        appendToDisplay('-');  // Subtraction
    } else if (key === '*') {
        appendToDisplay('*');  // Multiplication
    } else if (key === '/') {
        appendToDisplay('/');  // Division
    } else if (key === 'Enter' || key === '=') {
        calculate();  // Equals or Enter key to calculate
    } else if (key === 'Backspace') {
        deleteChar();  // Backspace to delete last character
    } else if (key === 'Escape') {
        clearDisplay();  // Escape key to clear the display
    }
});

function appendToDisplay(value) {
    const display = document.getElementById("display");
    if (display.value === "0" && value !== ".") {
        display.value = value;
    } else {
        display.value += value;
    }
}

function clearDisplay() {
    document.getElementById("display").value = "0";
}

function deleteChar() {
    let currentValue = document.getElementById("display").value;
    document.getElementById("display").value = currentValue.slice(0, -1) || "0";
}

function toggleSign() {
    let currentValue = document.getElementById("display").value;
    document.getElementById("display").value = currentValue.startsWith('-') ? currentValue.substring(1) : '-' + currentValue;
}

function calculate() {
    let currentValue = document.getElementById("display").value;
    try {
        document.getElementById("display").value = eval(currentValue.replace('÷', '/').replace('×', '*'));
    } catch {
        document.getElementById("display").value = "Error";
    }
}
