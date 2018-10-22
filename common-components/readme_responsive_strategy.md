# Responsive strategy

## Mobile first

---

Mobile first strategy is known to aid in the long term maintenance of responsive CSS.

What mobile first dictates is that when starting any new component or layout, start with the smallest screen size possible first, and work up from there.

## When building responsive components

---

### All supported breakpoints are stored in:

`styles/variables/breakpoints`

### CSS in JS

This application uses Styled JSX primary means for styling.

SASS is also a large part of the CSS present in this application, where it can be refactored out and into Styled JSX, please do so.

### Example use case for applying media queries with Styled JSX

```javascript
import { screenMedium, screenLarge, screenXLarge } from 'styles/variables/breakpoints';
import { midnight_express, astronaut, lynch } from 'styles/variables/colors_tiles_v4';
const FooComponent = () => (
  <div>
    <h1 className="title">Foo</h1>
    <style jsx>{`
      @media ${screenMedium} {
        .title { color: ${midnight_express}; }
      }

      @media ${screenLarge} {
        .title { color: ${astronaut}; }
      }

      @media ${screenXLarge} {
        .title { color: ${lynch}; }
      }
    `}</style>
  </div>
);
```
