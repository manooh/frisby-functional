/*
LESSON 24: Apply Natural Transformations in everyday work
*/

const { Right, Left, Nullable, Box } = require('../js/lib');
const Task = require('data.task');

//////////////////////////////////////////
const eitherToTask = e =>
    e.fold(Task.rejected, Task.of);

eitherToTask(Right('nightingale'))
    .fork(e => console.error('err', e),
          r => console.log('res', r));

eitherToTask(Left('errrrr'))
    .fork(e => console.error('err', e),
          r => console.log('res', r));


//////////////////////////////////////////
{
    const boxToEither = b =>
        b.fold(Right); // x => Right(x)


    // why did we say Right, not left?
    // because Natural Transformation law: nt(x).map(f) == nt(x.map(f))

    // let's check.

    const res1 = boxToEither(Box(100)).map(x => x * 2);
    const res2 = boxToEither(Box(100).map(x => x * 2));

    console.log(res1, res2);
}

// wouldn't work with Left

//////////////////////////////////////////
{
    const first = arr => // turn array into Either
        Nullable(arr[0]);

    // check if law applies
    const res1 = first([1,2,3]).map(x => x + 1);
    const res2 = first([1,2,3].map(x => x + 1));

    console.log(res1, res2);
}
