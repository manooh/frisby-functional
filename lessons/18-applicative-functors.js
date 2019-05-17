/*
LESSON 18: Applicative functors
*/

const { Box } = require('../js/lib');

{
    const res = Box(x => x + 1).ap(Box(2));
    console.log(res);
}

{
    const res = Box(x => y => x + y).ap(Box(2)).ap(Box(1));
    console.log(res);
}

// Rule check
{
    add = x => y => x + y;

    // first variant
    const res1 = Box(add).ap(Box(2)).ap(Box(3));
    console.log(res1);

    // second variant

    const liftA2 = (f, fx, fy) =>
        fx.map(f).ap(fy);

    const res2 = liftA2(add, Box(2), Box(3));
    console.log(res2);
}
