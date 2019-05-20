// flow-typed signature: 8c8bde0ed0506c1b57a3404e62304ddd
// flow-typed version: 9ef93f687a/use-onclickoutside_v0.3.x/flow_>=v0.90.x

declare module 'use-onclickoutside' {
  declare export default function useOnClickOutside<T: HTMLElement>(
    ref: { current: T | null },
    handler: MouseEventHandler | TouchEventHandler | null
  ): void;
}
