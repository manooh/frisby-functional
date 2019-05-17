/*
LESSON 13: Tasks for asynchronous actions
*/

// TODO ??? doesn't work in one go, but works if I first do appI() and then appF()
// console broken thereafter

const Task = require('data.task');
const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, './inc/13-config.json');


///// Imperative code
const appI = () =>
    fs.readFile(filePath, 'utf-8', (err, contents) => {
        if (err) throw err;

        const newContents = contents.replace(/8/g, '6');

        fs.writeFile(filePath, newContents, (err, _) => {
            if (err) throw err;
            console.log('success I');
        });
    });

appI();


////// Wrap in tasks

const readFile = (filename, enc) =>
    new Task((rej, res) =>
        fs.readFile(filename, enc, (err, contents) =>
            err ? rej(err) : res(contents)));

const writeFile = (filename, contents) =>
    new Task((rej, res) =>
        fs.writeFile(filename, contents, (err) =>
            err ? rej(err) : res(contents)));

const appF = (path) =>
    readFile(path, 'utf-8')
        .map(contents => contents.replace(/6/g, '4'))
        .chain(contents => writeFile(path, contents));

appF(filePath)
    .fork(e => console.log(e),
          x => console.log('success F', x));
