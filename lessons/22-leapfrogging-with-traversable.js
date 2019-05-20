/*
LESSON 22: Leapfrogging types with Traversable
*/

const fs       = require('fs');
const Task     = require('data.task');
// wraps standard node callback functions and returns Task-based functions (as if we were to wrap manually)
const futurize = require('futurize').futurize(Task);
const path     = require('path');
const { List } = require('immutable-ext');

const abspath = path.resolve(__dirname) + '/inc/';


const readFile = futurize(fs.readFile);

const files1 = ['22-box.js', '22-config.json'];

// attempt: map 'readFile' over file names
const res1 = files1.map(fn =>
    readFile(abspath + fn, 'utf-8'));
console.log(res1);

// but now we have an array of tasks
// to turn array of tasks into task of array of results ...
// [Task] => Task([])
// turn types inside out: leapfrog --> traverse() instead of map()

// Array doesn't have .traverse() --> use List
const files2 = List(['22-test1.txt', '22-test2.txt'])
    .traverse(
        Task.of, // should always return a task
        fn => readFile(abspath + fn, 'utf-8'))
    .fork(console.error, console.log);
