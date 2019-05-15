/*
LESSON 2: Refactoring using Box

Processing two inputs, price and percentage, and calculating the discount.
Not using imperative code.
*/

const { Box } = require('../js/lib');

const moneyToFloat = moneyStr =>
    Box(moneyStr)
        .map(s => s.replace(/\$/g, ''))
        .map(s => parseFloat(s))
        .get();

const percentageToFloat = percentageStr =>
    Box(percentageStr)
        .map(s => s.replace(/%/g, ''))
        .map(s => parseFloat(s) / 100)
        .get();

const floatToMoney = amount =>
    Box(amount)
        .map(x => x.toFixed(2))
        .map(s => '$' + s)
        .get();


const applyDiscount = (money, percentage) =>
    Box(money)
        .map(moneyToFloat)
        .map(m => m * (1 -
            Box(percentage)
                .map(percentageToFloat)
                .get()
            )
        )
        .map(floatToMoney)
        .get();


// Test
applyDiscountAndLog = (money, percentage) => {
    applyDiscount(money, percentage);
    console.log(`${money} - ${percentage} = ${applyDiscount(money, percentage)}`);
};

applyDiscountAndLog('$5.00', '20%');
applyDiscountAndLog('$100.00', '0.5%');
