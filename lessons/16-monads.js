/*
LESSON 16: Monads
*/

const { Box } = require('../js/lib');

// Box(Box(x)) -> (Box(x))
const join = m => m.chain(x => x);


const m = Box(Box(Box(3)));
// these two are equal:
const res1 = join(m.map(join));
const res2 = join(join(m));

console.log(res1, res2);

const w = Box('wonder');
const r1 = join(Box(w));
const r2 = join(w.map(Box));

console.log(r1, r2);
