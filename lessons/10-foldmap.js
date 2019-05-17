/*
LESSON 10: foldMap
*/

const { Map, List } = require('immutable-ext');
const { Sum } = require('../js/monoid');

// to get sum of all, first try with reduce
const res1 = List.of(Sum(1), Sum(2), Sum(3))
    .reduce((acc, x) => acc.concat(x, Sum.empty()))
    .get();

console.log(res1);

//////////////////////////////

// change reduce to fold
//(start with empty value, otherwise blows up with empty input list)
const res2 = List.of(Sum(1), Sum(2), Sum(3))
    .fold(Sum.empty())
    .get();

console.log(res2);

//////////////////////////////

// change from List to Map
const res3 = Map({brian: Sum(3), sara: Sum(2)})
    .fold(Sum.empty())
    .get();

console.log(res3);

//////////////////////////////

// we don't want values in Sums to begin with, so do that as a first step
// (with .map)

const res4 = Map({brian: 3, sara: 2})
    .map(Sum) // same as: .map(x => Sum(x))
    .fold(Sum.empty())
    .get();

console.log(res4);

//////////////////////////////

// map and fold is so common, there is a function for it: foldMap

const res5 = Map({brian: 3, sara: 2})
    .foldMap(Sum, Sum.empty())
    .get();

console.log(res5);
