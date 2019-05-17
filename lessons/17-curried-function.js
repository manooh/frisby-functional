/*
LESSON 17: Curried function
*/

// Preloading a function with one argument.
// Example: increment
{
    // function of function to add two values
    const add = (x, y) => x + y;
    // i++
    const inc = y => add(1, y);
    // 2++
    const res = inc(2);

    console.log(res);
}

{
    // function of function to add two values
    const add = x => (y => x + y);
    // i++
    const inc = add(1); // (y => 1 + y)
    // 2++
    const res = inc(2);

    console.log(res);
}

// Another example: modulo
{
    const modulo = (divider, dividend) => dividend % divider;
    const isOdd = dividend => !!modulo(2, dividend);

    const res = isOdd(23);

    console.log(res);
}

{
    const modulo = (divider) => (dividend => dividend % divider);
    const isOdd = dividend => !!modulo(2);

    const res = isOdd(23);

    console.log(res);
}

// Example: filter
{
    const modulo = (divider, dividend) => dividend % divider;
    const isOdd = dividend => !!modulo(2, dividend);

    const filter = pred => (xs => xs.filter(pred));
    const getAllOdds = filter(isOdd);

    const res = getAllOdds([1,2,3,4]);

    console.log(res);
}

// Example: censor (replace)
{
    const replace = regex => repl => str => str.replace(regex, repl);
    const censor = replace(/[aeiou]/ig)('*');
    const res = censor('hello world');
    console.log(res);

    const map = f => xs => xs.map(f);
    const censorAll = map(censor);

    console.log(['hello', 'world']);
}
