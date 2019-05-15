/*
LESSON 1: Container Types (Box)

We want to compose a workflow of different methods into one unified workflow, instead of separate lines with lots of assignments and state changes.

Let's capture each assignment in a minimal context: a box. Now we can apply different functions to our context.
*/


// Box: composition within a context
const Box = x => ({

    map:  f  => Box(f(x)), // calls function and returns new box
    fold: f  => f(x),      // calls function and returns raw result
    get:  () => x          // returns raw result
});

const val = '  64  ';
const ch = Box(val)    // create a new Box
    .map(s => s.trim())     // apply a bunch of things
    .map(s => parseInt(s))
    .map(i => i + 1)
    .map(i => String.fromCharCode(i))
    .get();                 // get out result

console.log(`Processing val '${val}' into: '${ch}'.`);
