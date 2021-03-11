// Select HTML elements //

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const acButton = document.querySelector('[data-ac]');
const previousOutputElement = document.querySelector('[data-previous]');
const currentOutputElement = document.querySelector('[data-current]');

// Calculator class creation //

class Calculator {
    constructor(previousOutputElement, currentOutputElement) {
        this.previousOutputElement = previousOutputElement;
        this.currentOutputElement = currentOutputElement;
        this.clear();
    }

    clear() {
        this.currentOutput = '';
        this.previousOutput = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOutput = this.currentOutput.toString().slice(0, -1);
    }
    append(number) {
        if (number === '.' && this.currentOutput.includes('.')) return;
        this.currentOutput = this.currentOutput.toString() + number.toString();
    }
    selectOperation(operation) {
        if (this.currentOutput === '') return;
        if (this.previousOutput !== '') {
            this.compute()
        }
        this.operation = operation;
        this.previousOutput = this.currentOutput;
        this.currentOutput = '';
    }
    compute() {
        let computationResult;
        const prev = parseFloat(this.previousOutput);
        const current = parseFloat(this.currentOutput);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computationResult = prev + current;
                break
            case '-':
                computationResult = prev - current;
                break
            case '*':
                computationResult = prev * current;
                break
            case '%':
                computationResult = prev / current;
                break
            default:
                return;
        }
        this.currentOutput = computationResult;
        this.operation = undefined;
        this.previousOutput = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
      integerDisplay = ''
        } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
        } else {
        return integerDisplay
        }
    }

    refreshDisplay() {
        this.currentOutputElement.textContent = this.getDisplayNumber(this.currentOutput);
        if (this.operation != null) {
            this.previousOutputElement.textContent = `${this.getDisplayNumber(this.previousOutput)} ${this.operation}`;
        } else {
            this.previousOutputElement.textContent = '';
        }
    }
}

// Create Calculator object //

const calculator = new Calculator(previousOutputElement, currentOutputElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.append(button.textContent);
        calculator.refreshDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.selectOperation(button.textContent);
        calculator.refreshDisplay();
    })
})

equalButton.addEventListener('click', button => {
    calculator.compute();
    calculator.refreshDisplay();
})

acButton.addEventListener('click', button => {
    calculator.clear();
    calculator.refreshDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.refreshDisplay();
})