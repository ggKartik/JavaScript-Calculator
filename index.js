// var cur;
// var pre;
// var op;
class Calculator {
    constructor(preoperand, curoperand) {
        this.preoperand = preoperand;
        this.curoperand = curoperand;
        this.clear();
    }

    clear() {
        this.cur = '';
        this.pre = '';
        this.operation = undefined;
    }

    delete() {
        this.cur = this.cur.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === "." && this.cur.includes(".")) return;
        this.cur = this.cur.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.cur === '') return;
        if (this.pre !== '') {
            this.compute();
        }
        this.operation = operation;
        this.pre = this.cur;
        this.cur = '';
    }

    compute() {
        console.log("computed")
        let result;
        const op2 = parseFloat(this.cur);
        const op1 = parseFloat(this.pre);
        console.log(op1);
        console.log(this.operation);
        console.log(op2);
        if (isNaN(op1) || isNaN(op2)) return;

        switch (this.operation) {
            case '+':
                result = op1 + op2
                break

            case '-':
                result = op1 - op2
                break

            case '*':
                result = op1 * op2
                break

            case '÷':
                result = op1 / op2
                break

            default:
                return
        }
        this.cur = result;
        this.operation = undefined;
        this.pre = '';
        console.log(this.cur);

    }

    getdisplay(number) {
        const numberstring = number.toString();
        const integer = parseFloat(numberstring.split('.')[0]);
        const decimal = numberstring.split('.')[1];
        var dis;

        if (isNaN(integer)) {
            dis = '';
        } else {
            dis = integer.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }

        if (decimal != null) {
            return dis + '.' + decimal;
        } else {
            return dis;
        }

    }

    updateDisplay() {
        // console.log("displayed");
        this.curoperand.innerHTML = this.getdisplay(this.cur);
        if (this.operation != null) {
            this.preoperand.innerHTML = this.getdisplay(this.pre) + this.operation;
        } else {
            this.preoperand.innerHTML = '';
        }
    }

}

const operation = document.querySelectorAll('[data-operation]');
const numbers = document.querySelectorAll('[data-number]');
const equals = document.querySelector('[data-equal]');
const del = document.querySelector('[data-del]');
const reset = document.querySelector('[data-reset]');
const preoperand = document.querySelector('[data-preoperand]');
const curoperand = document.querySelector('[data-curoperand]');

const calculator = new Calculator(preoperand, curoperand);

numbers.forEach(i => {
    i.addEventListener('click', function () {
        console.log("clicked")
        calculator.appendNumber(i.innerHTML);
        calculator.updateDisplay();
    });
});

operation.forEach(i => {
    i.addEventListener('click', function () {
        // console.log(i.innerHTML);
        calculator.chooseOperation(i.innerHTML);
        calculator.updateDisplay();
    });
});

equals.addEventListener('click', function () {
    // console.log("clicked");
    calculator.compute();
    calculator.updateDisplay();
});

reset.addEventListener('click', i => {
    // console.log("clicked");
    calculator.clear();
    calculator.updateDisplay();
});

del.addEventListener('click', function () {
    calculator.delete();
    calculator.updateDisplay();
    console.log("del")
});