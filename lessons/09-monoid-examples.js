/*
LESSON 9: Monoid examples
*/

const { List } = require('immutable-ext');


const Sum = x => ({
    x,
    concat: ({x: y}) => Sum(x + y),
    get: () => x
});
Sum.empty = () => Sum(0);

//console.log(Sum.empty().concat(Sum(3)).get());
//console.log(Sum(3).concat(Sum.empty()).get());


/*********************************************************/
const Product = x => ({
    x,
    concat: ({x: y}) => Product(x * y),
    get: () => x
});
Product.empty = () => Product(1);

//console.log(Product.empty().concat(Product(4)).get());
//console.log(Product(4).concat(Product.empty()).get());


/*********************************************************/
const Any = x => ({
    x,
    concat: ({x: y}) => Any(x && y),
    get: () => x
});
Any.empty = () => Any(false);

//console.log(Any.empty().concat(Any(true)).get());
//console.log(Any(true).concat(Any.empty()).get());


/*********************************************************/
const Max = x => ({
    x,
    concat: ({x: y}) => Max(y > x ? y : x),
    get: () => x
});
Max.empty = () => Max(-Infinity);

//console.log(Max.empty().concat(Max(-23)).get());
//console.log(Max(-23).concat(Max.empty()).get());


/*********************************************************/
const Min = x => ({
    x,
    concat: ({x: y}) => Min(y < x ? y : x),
    get: () => x
});
Min.empty = () => Min(Infinity);

//console.log(Min.empty().concat(Min(123)).get());
//console.log(Min(123).concat(Min.empty()).get());


/*********************************************************/
const sum = xs => xs.reduce( (acc, curr) => acc + curr, 0);
//console.log(sum([1,2,3]));
//console.log(sum([]));


const all = xs => xs.reduce( (acc, curr) => acc && curr, true);
console.log(all([true, true, true]));
console.log(all([]));


/*********************************************************/
// -> First alone cannot be a Monoid, because: what would the special element be??
// not safe, blows up if no first
const NoMonoidFirst = x => ({
    concat: () => NoMonoidFirst(x)
});

const first = xs => xs.reduce( (acc, curr) => acc);
console.log(first([1,2,3]));
//console.log(first([])); // not a monoid, blows up


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

const stats = List.of(
    {page: 'Home', views: 40},
    {page: 'About', views: 10},
    {page: 'Blog', views: 4}
);

const totalStats = stats.foldMap(
    x => Sum(x.views),
    Sum(0)
);

console.log(`totalStats : `, totalStats.get());


/*********************************************************/

const First = either => ({
    concat: o =>
        either.isLeft ? o : First(either),
    fold: f => f(either),
    map:  f => First(f(either)),
    get: () => either
});
First.empty = () => First(Left());

console.log(First.empty().concat(First(1)).concat(First(2)).get());


// TODO continue

/*********************************************************/

const Fn = f => ({
    fold: f,
    concat: o =>
        Fn(x => f(x).concat(o.fold(x)))
});

const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
const All = xs => xs.reduce( (acc, curr) => acc && curr, true);

const hasVowels = x => !!x.match(/[aeiou]/i);
const isLongWord = x => x.length > 4;

//const both = Fn(compose(All, hasVowels))
//                .concat(Fn(compose(All, isLongWord)));
//['gym', 'bird', 'lilac'].filter(x => both.fold(x).x);


// ???

/*********************************************************/


const Pair = (x, y) => ({
    x,
    y,
    concat: ({x: x1, y: y1}) =>
        Pair(x.concat(x1), y.concat(y1)),
    get: () => [x, y]
});

console.log(Pair([1],[2]).concat(Pair([3],[4])).get());
