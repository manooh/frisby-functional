/*
LESSON 12: Capture side effects in a task
*/

const Task = require('data.task');

//////
Task.of(1) // acts like a box
    .map(x => x + 1)
    .chain(x => Task.of(x + 1))
    .fork(e => console.log('err', e),
          x => console.log('success', x));

Task.rejected(1) // has a rejected case
    .map(x => x + 1) // doesn't do anything
    .chain(x => Task.of(x + 1))
    .fork(e => console.log('err', e),
          x => console.log('success', x));

////////

const launchMissilesNOW = () => // runs immediately
    console.log('launch missiles NOW!');

// different Task constructor
const launchMissiles = () => // delayed run
    new Task((rej, res) => {     // takes two functions, corresponds to fork()
        console.log('launch missiles!');
        res('missile');
    });

launchMissilesNOW();
launchMissiles() // doesn't run -> delayed
    .map(x => x + '!');

launchMissiles() // runs
    .map(x => x + '!')
    .fork(e => console.log('err', e),
          x => console.log('success', x));
