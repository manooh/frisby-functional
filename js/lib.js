// Box: composition within a context
const Box = x => ({

    map:  f  => Box(f(x)), // calls function and returns new box
    fold: f  => f(x),      // calls function and returns raw result
    chain: f => f(x),
    get:  () => x,         // returns raw result
    inspect: () => `Box(${x})`  // custom output (deprecated)
});

const Right = x => ({
    map: f => Right(f(x)),  // just like Box
    chain: f => f(x),
    fold: (f, g) => g(x),   // calls right function
    inspect: () => `Right(${x})`  // custom output (deprecated)
});

const Left = x => ({
    map: f => Left(x),  // simply doesn't do anything
    chain: f => Left(x),  // simply doesn't do anything
    fold: (f, g) => f(x),   // calls left function
    inspect: () => `Left(${x})`  // custom output (deprecated)
});

const Nullable = x =>
    x != null ? Right(x) : Left(x);


const tryCatch = f =>
{
    try {
        return Right(f());
    }
    catch(e) {
        return Left(e);
    }
};

module.exports = { Box, Left, Nullable, Right, tryCatch };
