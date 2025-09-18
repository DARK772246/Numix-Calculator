const result = document.getElementById("result");

// Append value & vibrate
function tap(val) {
  navigator.vibrate?.(30);   // short vibration (if supported)
  // Special handling for operators that need to be replaced if last char is an operator
  const lastChar = result.value.slice(-1);
  const operators = ['+', '-', '*', '/', '.'];

  if (operators.includes(lastChar) && operators.includes(val)) {
    // Replace the last operator with the new one
    result.value = result.value.slice(0, -1) + val;
  } else {
    result.value += val;
  }
}

// Clear last character (DEL button)
function clearLast() {
  navigator.vibrate?.(30);
  result.value = result.value.slice(0, -1);
}

// Clear all
function clearAll() {
  navigator.vibrate?.(50);
  result.value = "";
}

// Calculate expression
function calc() {
  navigator.vibrate?.(50);
  try {
    // Replace 'xʸ' with Math.pow and '√' with Math.sqrt
    let expression = result.value
      .replace(/xʸ/g, '**') // Basic power operator for simple cases
      .replace(/√/g, 'Math.sqrt(');

    // Handle scientific functions correctly
    expression = expression.replace(/sin\(/g, 'Math.sin(');
    expression = expression.replace(/cos\(/g, 'Math.cos(');
    expression = expression.replace(/tan\(/g, 'Math.tan(');
    expression = expression.replace(/π/g, 'Math.PI');

    // Make sure parentheses are closed for sqrt and other functions if needed
    // This part can be tricky with simple eval, for a robust calculator,
    // a proper expression parser is needed.
    // For now, assume user correctly inputs parentheses for Math.pow and Math.sqrt.
    // Example: Math.pow(2,3) or Math.sqrt(9)

    result.value = eval(expression);
  } catch (e) {
    result.value = "Error";
    console.error("Calculation error:", e); // Log the error for debugging
  }
}