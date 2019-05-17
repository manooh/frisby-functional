/*
LESSON 11: LazyBox
*/

const Box = x => ({
    map: f => Box(f(x)),
    fold: f => f(x)
});

const LazyBox = g => ({
    map: f => LazyBox(() => f(g())),
    fold: f => f(g())
});

//////////////////////////////////////
const resB = Box('   64   ')
    .map(s => s.trim())
    .map(r => parseInt(r))
    .map(i => i + 1)
    .map(i => String.fromCharCode(i))
    .map(s => s.toLowerCase())
    .fold(x => x);
;

console.log(resB);

//////////////////////////////////////
const resLB = LazyBox(() => '   64   ')
    .map(s => s.trim())
    .map(r => parseInt(r))
    .map(i => i + 1)
    .map(i => String.fromCharCode(i))
    .map(s => s.toLowerCase())
    .fold(x => x);
;

console.log(resLB);
