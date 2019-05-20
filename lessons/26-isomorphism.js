/*
LESSON 26: Isomorphisms and round trip data transformations
*/
const { Right, Left } = require('../js/lib.js');

const Iso = (to, from) =>
({
    to,
    from
});


{
    // claim: String is isomorph to Char array
    // String ~ [Char]

    const chars = Iso(s => s.split(''),
                      c => c.join(''));

    const res = chars.from(chars.to('hello world'));
    console.log(res);

    // useful to be able to convert between types and back
    // e.g. to array, apply array methods, back to string

    const truncate = str =>
        chars.from(chars.to(str).slice(0,3)).concat('…');

    console.log(truncate('hello world'));
}

{
    // claim: Singleton array [a] is isomorphic to Either, null, or a
    // [a] ~ Either null a

    const singleton = Iso(e => e.fold( // turn Either into array
                            () => [],  // - put Left into empty array
                            x => [x]), // - put Right value into array
                          ([x]) => x ? Right(x) : Left()); // turn array into Either

    const filterEither = (e, pred) =>
        singleton.from(singleton.to(e).filter(pred));

    const res = filterEither(Right('hello'), x => x.match(/h/ig))
        .map(x => x.toUpperCase());

    console.log(res);
}
