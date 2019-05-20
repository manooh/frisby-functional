/*
LESSON 23: Maintaining Structure whilst asyncing
*/

const fs = require('fs');
const Task = require('data.task');
const { List, Map } = require('immutable-ext');

const httpGet = (path, params) =>
    Task.of(`${path} result`);

Map({home: '/', about: '/about-us', blog: '/blog'})
    .map(route => httpGet(route, {}));

// returns a Map of Tasks
// we'd rather have a Task of results
// => traverse

Map({home: '/', about: '/about-us', blog: '/blog'})
    .traverse(
        Task.of,
        route => httpGet(route, {}))
    .fork(console.error, console.log);

// we can extend this principle and do nested traverse
Map({home: ['/', '/home'], about: ['/about-us']})
    .traverse(
        Task.of,
        routes => List(routes).traverse(
            Task.of,
            route => httpGet(route, {})))
    .fork(console.error, console.log);
