# Definitions

## Semigroup
A type with a concat method that keeps the type.
Not a safe operation. Does not always have an element to return.

## Monoid
A semigroup with a special element that acts like a special entity.
Safe operation. Always returns something.

## Functor
A type with a map method. It must obey a few laws:
- Function composition preservation: fx.map(f).map(g) == fx.map(x => g(f(x)))
- fx.map(id) == id(fx)

## Lifting a value into a type
Using the .of() interface instead of constructor
Object is then ready for map/chain or other operations

## Monad 
Has an of (pure) and a chain (flatMap, bind, >>=) method.
Allow us to nest computation.
Laws:
- join(m.map(join)) == join(join(m))
- join(F.of(m)) == join(m.map(F.of))
A monad is a functor (an applicative and pointed functor).


