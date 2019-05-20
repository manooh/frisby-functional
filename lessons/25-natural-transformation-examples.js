/*
LESSON 25: Apply Natural Transformations in everyday work
*/

const { List } = require('immutable-ext');
const { Nullable, Right, Left, Box } = require('../js/lib.js');
const Task = require('data.task');

{
    // Example 1
    // want to split words in an array
    // cannot call chain() on array
    // but because of NT law, we can use List instead
    const res = List(['hello', 'world']) // constructor is NT
        .chain(x => x.split(''));

    console.log(res);
}

{
    // Example 2
    // apply several functions to number

    const first = arr =>
        Nullable(arr[0]);

    const largeNumbers = arr =>
        arr.filter(x => x > 100);

    const larger = x =>
        x * 2;


    {
        const app = arr =>
            first(largeNumbers(arr).map(larger));

        console.log(app([2, 400, 5, 1000]));
        // problem: we need to run through whole array
        // --> apply NT
    }
    {
        const app = arr =>
            first(largeNumbers(arr)).map(larger);

        console.log(app([2, 400, 5, 1000]));
        // better
    }

}

{
    // Example 3
    // Find user, and then find user's best friend
    const fake = id => ({id: id, name: 'user1', best_friend_id: id + 1});

    const Db = ({
        find: id =>
            new Task((rej, res) =>
                res(id > 2 ? Right(fake(id)) : Left('not found')))
    });

    const eitherToTask = e =>
        e.fold(Task.rejected, Task.of);

    //
    Db.find(3) // Task(Right(user))
    .map(either =>
        either.map(user => Db.find(user.best_friend_id))); // Task(Right(Task(Right(user))))

    // getting out of hand, so:

    Db.find(3) // Task(Right(user))
    .chain(eitherToTask) // user
    .chain(user => Db.find(user.best_friend_id)) //  Task(Right(user))
    .chain(eitherToTask)
    .fork(console.err, console.log);

}
