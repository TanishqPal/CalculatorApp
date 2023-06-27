
    class CalculatorApp {
      constructor() {
        this.display = new Display();
        this.currentValue = '';
        this.operator = '';
        this.previousValue = '';
        this.isError = false;
      }

      initialize() {
        this.clearDisplay();
      }

      clearDisplay() {
        this.currentValue = '';
        this.operator = '';
        this.previousValue = '';
        this.isError = false;
        this.display.clearDisplay();
      }

      handleButtonClick(buttonValue) {
        if (this.isError && buttonValue !== 'C') {
          return; // Disable further input until display is cleared
        }

        if (buttonValue === 'C') {
          this.clearDisplay();
        } else if (buttonValue === '=') {
          this.performCalculation();
        } else if (buttonValue === '+' || buttonValue === '-' || buttonValue === '*' || buttonValue === '/') {
          this.setOperator(buttonValue);
        } else {
          this.updateCurrentValue(buttonValue);
        }
      }

      updateCurrentValue(value) {
        if (this.currentValue.length < 12) {
          this.currentValue += value;
          this.display.updateDisplay(this.currentValue);
        }
      }

      setOperator(operator) {
        if (this.currentValue !== '') {
          this.operator = operator;
          this.previousValue = this.currentValue;
          this.currentValue = '';
        }
      }

      performCalculation() {
        if (this.operator === '') {
          return;
        }

        const a = parseFloat(this.previousValue);
        const b = parseFloat(this.currentValue);

        if (isNaN(a) || isNaN(b)) {
          this.display.updateDisplay('NaN');
          this.isError = true;
          return;
        }

        let result;
        switch (this.operator) {
          case '+':
            result = CalculatorUtils.add(a, b);
            break;
          case '-':
            result = CalculatorUtils.subtract(a, b);
            break;
          case '*':
            result = CalculatorUtils.multiply(a, b);
            break;
          case '/':
            if (b === 0) {
              this.display.updateDisplay('NaN');
              this.isError = true;
              return;
            }
            result = CalculatorUtils.divide(a, b);
            break;
        }

        if (result !== undefined) {
          this.currentValue = result.toString();
          this.display.updateDisplay(this.currentValue);
        }

        this.operator = '';
        this.previousValue = '';
      }
    }

    class Display {
      constructor() {
        this.displayElement = document.getElementById('display');
      }

      updateDisplay(value) {
        this.displayElement.value = value;
      }

      clearDisplay() {
        this.displayElement.value = '';
      }
    }

    class CalculatorUtils {
      static add(a, b) {
        return a + b;
      }

      static subtract(a, b) {
        return a - b;
      }

      static multiply(a, b) {
        return a * b;
      }

      static divide(a, b) {
        return a / b;
      }
    }

    const calculator = new CalculatorApp();
    calculator.initialize();

    function handleButtonClick(buttonValue) {
      calculator.handleButtonClick(buttonValue);
    }
