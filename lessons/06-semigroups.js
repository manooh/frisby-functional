/*
    LESSON 6: Semigroups
*/

const Sum = x => ({
    x,
    concat: ({x: y}) => Sum(x + y),
    inspect: () => `Sum(${x})`,
});

console.log(Sum(3).concat(Sum(2)).concat(Sum(4)));



const All = x => ({
    x,
    concat: ({x: y}) => All(x && y),
    inspect: () => `All(${x})`,
});

console.log(All(true).concat(All(true)));
console.log(All(true).concat(All(true)).concat(All(false)));


const First = x => ({
    concat: () => First(x),
    inspect: () => `First(${x})`,
});

console.log(First(3).concat(First(4)).concat(First(5)));
