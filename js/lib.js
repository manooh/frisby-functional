// Box: composition within a context
const Box = x => ({

    map:  f  => Box(f(x)), // calls function and returns new box
    fold: f  => f(x),      // calls function and returns raw result
    get:  () => x,         // returns raw result
    inspect: () => `Box(${x})`  // custom output (deprecated)
});

module.exports = { Box };
