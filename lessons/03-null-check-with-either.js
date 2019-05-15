/*
LESSON 3: Handling null checks with Either (Left and Right)

Example: finding the color code, handling inexistent colors.
*/

const Right = x => ({
    map: f => Right(f(x)),  // just like Box
    fold: (f, g) => g(x),   // calls right function
    inspect: () => `Right(${x})`
});

const Left = x => ({
    map: f => Left(x),  // simply doesn't do anything
    fold: (f, g) => f(x),   // calls left function
    inspect: () => `Left(${x})`
});

const Nullable = x =>
    x != null ? Right(x) : Left(x);

// === Test ===
// check function of Left and Right
console.log(Right(3).map(x => x * 3));  // Right applies map
console.log(Left(3).map(x => x * 3));   // Left doesn't
console.log('---------');

// Find color in array. Handle inexistent color
const colors = {red: '#ff0000', green: '#00ff00', blue: '#0000ff'};
const findColor = name =>
    Nullable(colors[name])
        .map(s => s.toUpperCase())
        .fold(() => 'no color',
              s  => s);

console.log(findColor('blue'));
console.log(findColor('yellow'));
