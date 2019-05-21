/*
LESSON 4: using chains to handle nested try-catch
*/

const fs = require('fs');
const { Either, Left, Right } = require('../js/lib');

const path = require('path');
const filePath = path.resolve(__dirname, './inc/');

const tryCatch = f =>
{
    try {
        return Right(f());
    }
    catch(e) {
        return Left(e);
    }
};

const res = filename => tryCatch( () => fs.readFileSync(filename))
    .chain(s => tryCatch(() => JSON.parse(s)))
    .fold(e => `Error: ${e}`,
          s => s);

console.log(res(filePath + '/04-config.json'));
console.log(res(filePath + '/04-doesntexist.json'));
console.log(res(filePath + '/04-config-err.json'));
