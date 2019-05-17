
const Sum = x => ({
    x,
    concat: ({x: y}) => Sum(x + y),
    get: () => x
});
Sum.empty = () => Sum(0);


/*********************************************************/
const Product = x => ({
    x,
    concat: ({x: y}) => Product(x * y),
    get: () => x
});
Product.empty = () => Product(1);


/*********************************************************/
const Any = x => ({
    x,
    concat: ({x: y}) => Any(x && y),
    get: () => x
});
Any.empty = () => Any(false);


/*********************************************************/
const Max = x => ({
    x,
    concat: ({x: y}) => Max(y > x ? y : x),
    get: () => x
});
Max.empty = () => Max(-Infinity);


/*********************************************************/
const Min = x => ({
    x,
    concat: ({x: y}) => Min(y < x ? y : x),
    get: () => x
});
Min.empty = () => Min(Infinity);


/*********************************************************/
const Right = x => ({
    map: f => Right(f(x)),
    fold: (f, g) => g(x),
    concat: o =>
        o.fold(
            e => Left(e),
            r => Right(x.concat(r))
        ),
    isLeft: false
});

const Left = x => ({
    map: f => Left(x),
    fold: (f, g) => f(x),
    concat: o => Left(x),
    isLeft: true
});


/*********************************************************/

const First = either => ({
    concat: o =>
        either.isLeft ? o : First(either),
    fold: f => f(either),
    map:  f => First(f(either)),
    get: () => either
});
First.empty = () => First(Left());


/*********************************************************/


const Pair = (x, y) => ({
    x,
    y,
    concat: ({x: x1, y: y1}) =>
        Pair(x.concat(x1), y.concat(y1)),
    get: () => [x, y]
});


module.exports = { Sum, Product, Any, Max, Min, Right, Left, First, Pair}; 