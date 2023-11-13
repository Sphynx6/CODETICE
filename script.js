class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText =
        this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }   
        else {
            this.previousOperandTextElement.innerText = ''
        }
    }
    appendNumber(number) {
        if (isNaN(this.currentOperand) || this.currentOperand === '') {
            this.currentOperand = number;
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
          this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        let integerDigits;
        let decimalDigits;
        if (stringNumber.includes('.')) {
            integerDigits = parseFloat(stringNumber.split('.')[0]);
            decimalDigits = parseFloat(stringNumber.split('.')[1]);
            if (isNaN(decimalDigits)) {
                decimalDigits = 0;
            } 
        } else {
            integerDigits = parseFloat(stringNumber);
            decimalDigits = null;
        }
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            case '%':
                computation = prev % current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }
}

const numbers = document.querySelectorAll('[data-nb]');
const operators = document.querySelectorAll('[data-op]');
const equals = document.querySelector('[data-eq]');
const allClear = document.querySelector('[data-ac]');
const currentOperandTextElement = document.querySelector('[data-cur]');
const previousOperandTextElement = document.querySelector('[data-pre]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numbers.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})
operators.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
})
  
equals.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})
  
allClear.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})
  
