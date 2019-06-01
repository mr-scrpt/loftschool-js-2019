let arr = [1, 2, 3, 4];

let notArr = 0;

let emptyArr = [];

function calculator(number = 0) {
    const obj = {
        sum () {
            const arg = [...arguments];
            let sums = arg.reduce( (accumulator, currentValue) => {
                return accumulator + currentValue;
            });

            return number + sums;
        },

        dif () {
            const arg = [...arguments];
            let sums = arg.reduce( (accumulator, currentValue) => {
                return accumulator + currentValue;
            });

            return number - sums;
        },

        div () {
            const arg = [...arguments];

            let sums = arg.reduce( (accumulator, currentValue, i, arr) => {
                if ( i > 0) {
                    return accumulator / currentValue;
                } else {
                    return number / currentValue;
                }
            }, number);

            return sums;
        }
    };

    return obj;
}
let cal = calculator(10);
console.log(cal.div(5,4,3));