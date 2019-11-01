import { useState, useEffect } from 'react';

export function useLongPress(
  callbackBegin = () => {},
  ms = 300,
  callbackEnd = () => {}
) {
  const [startLongPress, setStartLongPress] = useState(false);

  useEffect(() => {
    let timerId: any;
    if (startLongPress) {
      timerId = setTimeout(callbackBegin, ms);
    } else {
      clearTimeout(timerId);
      callbackEnd();
    }

    return () => {
      clearTimeout(timerId);
      callbackEnd();
    };
  }, [callbackBegin, callbackEnd, ms, startLongPress]);

  return {
    onMouseDown: () => setStartLongPress(true),
    onMouseUp: () => setStartLongPress(false),
    onTouchStart: () => setStartLongPress(true),
    onTouchEnd: () => setStartLongPress(false),
  };
}
