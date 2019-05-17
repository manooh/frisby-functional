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
