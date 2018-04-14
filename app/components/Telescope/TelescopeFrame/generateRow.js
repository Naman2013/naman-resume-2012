import React from 'react';
import ROW_CONFIG from './rowConfigurationEnum';
import Polyline from '../../SVG/Polyline';

function warnClient() {
  console.warn('Invalid row configuration provided');
}

function isLargeTick(position) {
  return (position % 5 === 0);
}

export function generateRow(
  dimension = 0,
  count = 0,
  rowConfiguration = ROW_CONFIG.TOP,
  style = {},
) {
  if (!(rowConfiguration instanceof ROW_CONFIG)) {
    warnClient();
    return [];
  }
  if (!dimension) { return []; }

  const row = [];
  const COUNT = count;
  const TICKS_PER_SIDE = (count / 2);
  const SPACING = (dimension / count);
  const MID_POINT = (dimension / 2);
  const CENTER_TICK_LENGTH = 16;
  const CENTER_TICK_THICKNESS = 3;
  const LARGE_TICK_LENGTH = 12;
  const LARGE_TICK_THICKNESS = 2;
  const SHORT_TICK_LENGTH = (LARGE_TICK_LENGTH / 2);
  const SHORT_TICK_THICKNESS = (LARGE_TICK_THICKNESS / 2);

  let LEFT_ACCUMULATOR = MID_POINT;
  let LEFT_COUNTER = 0;
  let RIGHT_ACCUMULATOR = MID_POINT;
  let RIGHT_COUNTER = 0;

  for (let i = 0; i <= COUNT; i += 1) {
    let x1;
    let y1;
    let x2;
    let y2;
    let tickThickness;

    switch (rowConfiguration) {
      case ROW_CONFIG.TOP:
        if (i === 0) {
          x1 = MID_POINT;
          y1 = 0;
          x2 = MID_POINT;
          y2 = CENTER_TICK_LENGTH;
          tickThickness = CENTER_TICK_THICKNESS;
        } else if (i <= TICKS_PER_SIDE) {
          x1 = LEFT_ACCUMULATOR;
          y1 = 0;
          x2 = LEFT_ACCUMULATOR;
          y2 = (isLargeTick(LEFT_COUNTER)) ? LARGE_TICK_LENGTH : SHORT_TICK_LENGTH;
          tickThickness = (isLargeTick(LEFT_COUNTER)) ? LARGE_TICK_THICKNESS : SHORT_TICK_THICKNESS;

          LEFT_ACCUMULATOR -= SPACING;
          LEFT_COUNTER += 1;
        } else {
          x1 = RIGHT_ACCUMULATOR;
          y1 = 0;
          x2 = RIGHT_ACCUMULATOR;
          y2 = (isLargeTick(RIGHT_COUNTER)) ? LARGE_TICK_LENGTH : SHORT_TICK_LENGTH;
          tickThickness = (isLargeTick(RIGHT_COUNTER))
            ? LARGE_TICK_THICKNESS
            : SHORT_TICK_THICKNESS;

          RIGHT_ACCUMULATOR += SPACING;
          RIGHT_COUNTER += 1;
        }
        break;
      case ROW_CONFIG.BOTTOM:
        if (i === 0) {
          x1 = MID_POINT;
          y1 = dimension;
          x2 = MID_POINT;
          y2 = (dimension - CENTER_TICK_LENGTH);
          tickThickness = CENTER_TICK_THICKNESS;
        } else if (i <= TICKS_PER_SIDE) {
          x1 = LEFT_ACCUMULATOR;
          y1 = dimension;
          x2 = LEFT_ACCUMULATOR;
          y2 = (isLargeTick(LEFT_COUNTER))
            ? (dimension - LARGE_TICK_LENGTH)
            : (dimension - SHORT_TICK_LENGTH);
          tickThickness = (isLargeTick(LEFT_COUNTER))
            ? LARGE_TICK_THICKNESS
            : SHORT_TICK_THICKNESS;

          LEFT_ACCUMULATOR -= SPACING;
          LEFT_COUNTER += 1;
        } else {
          x1 = RIGHT_ACCUMULATOR;
          y1 = dimension;
          x2 = RIGHT_ACCUMULATOR;
          y2 = (isLargeTick(RIGHT_COUNTER))
            ? (dimension - LARGE_TICK_LENGTH)
            : (dimension - SHORT_TICK_LENGTH);
          tickThickness = (isLargeTick(RIGHT_COUNTER))
            ? LARGE_TICK_THICKNESS
            : SHORT_TICK_THICKNESS;

          RIGHT_ACCUMULATOR += SPACING;
          RIGHT_COUNTER += 1;
        }
        break;
      case ROW_CONFIG.LEFT:
        if (i === 0) {
          x1 = 0;
          y1 = MID_POINT;
          x2 = CENTER_TICK_LENGTH;
          y2 = MID_POINT;
          tickThickness = CENTER_TICK_THICKNESS;
        } else if (i <= TICKS_PER_SIDE) {
          x1 = 0;
          y1 = LEFT_ACCUMULATOR;
          x2 = (isLargeTick(LEFT_COUNTER)) ? LARGE_TICK_LENGTH : SHORT_TICK_LENGTH;
          y2 = LEFT_ACCUMULATOR;
          tickThickness = (isLargeTick(LEFT_COUNTER)) ? LARGE_TICK_THICKNESS : SHORT_TICK_THICKNESS;

          LEFT_ACCUMULATOR -= SPACING;
          LEFT_COUNTER += 1;
        } else {
          x1 = 0;
          y1 = RIGHT_ACCUMULATOR;
          x2 = (isLargeTick(RIGHT_COUNTER))
            ? LARGE_TICK_LENGTH
            : SHORT_TICK_LENGTH;
          y2 = RIGHT_ACCUMULATOR;
          tickThickness = (isLargeTick(RIGHT_COUNTER))
            ? LARGE_TICK_THICKNESS
            : SHORT_TICK_THICKNESS;

          RIGHT_ACCUMULATOR += SPACING;
          RIGHT_COUNTER += 1;
        }
        break;
      case ROW_CONFIG.RIGHT:
        if (i === 0) {
          x1 = dimension;
          y1 = MID_POINT;
          x2 = (dimension - CENTER_TICK_LENGTH);
          y2 = MID_POINT;
          tickThickness = CENTER_TICK_THICKNESS;
        } else if (i <= TICKS_PER_SIDE) {
          x1 = dimension;
          y1 = LEFT_ACCUMULATOR;
          x2 = (isLargeTick(LEFT_COUNTER))
            ? (dimension - LARGE_TICK_LENGTH)
            : (dimension - SHORT_TICK_LENGTH);
          y2 = LEFT_ACCUMULATOR;
          tickThickness = (isLargeTick(LEFT_COUNTER))
            ? LARGE_TICK_THICKNESS
            : SHORT_TICK_THICKNESS;

          LEFT_ACCUMULATOR -= SPACING;
          LEFT_COUNTER += 1;
        } else {
          x1 = dimension;
          y1 = RIGHT_ACCUMULATOR;
          x2 = (isLargeTick(RIGHT_COUNTER))
            ? (dimension - LARGE_TICK_LENGTH)
            : (dimension - SHORT_TICK_LENGTH);
          y2 = RIGHT_ACCUMULATOR;
          tickThickness = (isLargeTick(RIGHT_COUNTER))
            ? LARGE_TICK_THICKNESS
            : SHORT_TICK_THICKNESS;

          RIGHT_ACCUMULATOR += SPACING;
          RIGHT_COUNTER += 1;
        }
        break;
      default:
        warnClient();
        break;
    }

    const polylineAttributes = {
      points: `${x1},${y1} ${x2},${y2}`,
      strokeWidth: tickThickness,
    };

    row.push(<Polyline {...polylineAttributes} {...style} />);
  }

  return row;
}
