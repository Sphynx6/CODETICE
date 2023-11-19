//calculator class
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    //clear method clears the values of the current and previous operands and the operation
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    //update display method updates the values of the current and previous operands
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }   
        else {
            this.previousOperandTextElement.innerText = ''
        }
    }

    //append number method appends the value to the current operand 
    appendNumber(number) {
        if (isNaN(this.currentOperand) || this.currentOperand === '') {
            this.currentOperand = number;
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    //choose operation method
    chooseOperation(operation) {
        if (this.currentOperand === '') return //if current operand is empty,  return nothing
        if (this.previousOperand !== '') {
          this.calculate()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    //get display number method
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        let integerDigits;
        let decimalDigits;
        if (stringNumber.includes('.')) { //incase the number is a decimal
            integerDigits = parseFloat(stringNumber.split('.')[0]);
            decimalDigits = parseFloat(stringNumber.split('.')[1]);
            if (isNaN(decimalDigits)) {  
                decimalDigits = '';  //if decimalDigits is NaN, then it will be empty
            } 
        } 
        else {
            integerDigits = number;
            decimalDigits = null;
        }
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } 
        else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
            return integerDisplay +'.' + decimalDigits;
        } 
        else {
            return integerDisplay;
        }
    }

    //calculate method 
    calculate() {
        let calc;
        const prev = parseFloat(this.previousOperand); //converts previous number to float
        const current = parseFloat(this.currentOperand); //converts current number to float
        if (isNaN(prev) || isNaN(current)) return; //if prev or current is NaN, return nothing
        switch (this.operation) {
            case '+':
                calc = prev + current;
                break;
            case '-':
                calc = prev - current;
                break;
            case '*':
                calc = prev * current;
                break;
            case '/':
                calc = prev / current;
                break;
            case '%':
                calc = prev % current;
                break;
            default:
                return;
        }
        this.currentOperand = calc;
        this.operation = undefined;
        this.previousOperand = '';
    }
}

// declaration
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operators');
const equals = document.querySelector('.equal');
const ac = document.querySelector('.ac');
const currentOperandTextElement = document.querySelector('.current');
const previousOperandTextElement = document.querySelector('.previous');

//main
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
    calculator.calculate()
    calculator.updateDisplay()
    calculator.clear()
})
  
ac.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})
  
