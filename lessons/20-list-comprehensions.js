/*
LESSON 20: List Comprehension with Applicative Functors
*/

const { List } = require('immutable-ext');

console.log('\n=== ITERATIVE ===');
{
    const items = ['shirt','sweater'];
    const sizes = ['large','medium','small'];
    const colors = ['black', 'white'];

    for (const i of items) {
        for(const s of sizes) {
            for (const c of colors) {
                console.log(`${i}-${s}-${c}`);
            }
        }
    }
}

console.log('\n=== APPLICATIVE FUNCTOR ===');
{
    // list comprehension
    const merch = () =>
        List.of(i => s => c => `${i}-${s}-${c}`)
            .ap(List.of('shirt','sweater'))
            .ap(List.of('large','medium','small'))
            .ap(List.of('black','white'));

    console.log(
        merch()
            .reduce((acc, x) => acc + '\n' + x))
    ;
}
