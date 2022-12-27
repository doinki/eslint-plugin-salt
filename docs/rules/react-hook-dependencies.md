# salt/react-hook-dependencies

## Rule Details

Examples of **incorrect** code for this rule:

```jsx
useCallback(() => {
  // ...
}, [b, a]);

useEffect(() => {
  // ...
}, [b, a]);

useLayoutEffect(() => {
  // ...
}, [b, a]);

useMemo(() => {
  // ...
}, [b, a]);
```

Examples of **correct** code for this rule:

```jsx
useCallback(() => {
  // ...
}, [a, b]);

useEffect(() => {
  // ...
}, [a, b]);

useLayoutEffect(() => {
  // ...
}, [a, b]);

useMemo(() => {
  // ...
}, [a, b]);
```

## Rule Options

```js
"salt/react-hook-dependencies": [<enabled>, { "callbacksLast": <boolean> }]
```

### `callbacksLast` (default: `true`)

Examples of **incorrect** code for `{ callbacksLast: true }` option:

```jsx
useCallback(() => {
  // ...
}, [handleClick, value]);

useEffect(() => {
  // ...
}, [handleClick, value]);

useLayoutEffect(() => {
  // ...
}, [handleClick, value]);

useMemo(() => {
  // ...
}, [handleClick, value]);
```

Examples of **correct** code for `{ callbacksLast: true }` option:

```jsx
useCallback(() => {
  // ...
}, [value, handleClick]);

useEffect(() => {
  // ...
}, [value, handleClick]);

useLayoutEffect(() => {
  // ...
}, [value, handleClick]);

useMemo(() => {
  // ...
}, [value, handleClick]);
```
