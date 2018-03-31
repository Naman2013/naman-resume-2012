import Polyline from '../SVG/Polyline';

export default function generateRow(targetWidth = 0) {
  if (!targetWidth) { return []; }

  const row = [];
  const COUNT = 0;
  const SPACING = 5;
  const LARGE_TICK_LENGTH = 12;
  const LARGE_TICK_THICKNESS = 2;
  const SHORT_TICK_LENGTH = (LARGE_TICK_LENGTH / 2);
  const SHORT_TICK_THICKNESS = (LARGE_TICK_THICKNESS / 2);

  let ACCUMULATOR = 0;

  for (let i = 0; i <= COUNT; i += 1) {
    const isLongTick = (i % 5) === 0;
    ACCUMULATOR += SPACING;
    const polylineAttributes = {
      points: `${ACCUMULATOR},${0} ${ACCUMULATOR},${(isLongTick) ? LARGE_TICK_LENGTH : SHORT_TICK_LENGTH}`,
      strokeWidth: (isLongTick) ? LARGE_TICK_THICKNESS : SHORT_TICK_THICKNESS,
    };

    row.push(<Polyline {...polylineAttributes} />);
  }

  return row;
}
