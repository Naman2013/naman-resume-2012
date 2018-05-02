import React from 'react';
import uniqueId from 'lodash/uniqueId';

import ROW_CONFIG from './rowConfigurationEnum';
import CenterLine from './CenterLine';
import GridLine from './GridLine';
import Polyline from '../../SVG/Polyline';
import CenterBar from "../../GlobalNavigation/CenterBar";

function warnClient() {
  console.warn('Invalid row configuration provided');
}

function isLargeTick(increment, position) {
  return (position % increment === 0);
}

export function generateRow(
  dimension = 0,
  resolution = 0,
  increment = 5,
  rowConfiguration = ROW_CONFIG.TOP,
  style = {},
) {
  if (!(rowConfiguration instanceof ROW_CONFIG)) {
    warnClient();
    return [];
  }
  if (!dimension) { return []; }

  const ROW = [];
  const COUNT = resolution;
  const TICKS_PER_SIDE = (resolution / 2);
  const SPACING = (dimension / resolution);
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
    const ELEMENT_KEY = `${rowConfiguration}-${i}`;
    let x1;
    let y1;
    let x2;
    let y2;
    let tickThickness;

    switch (rowConfiguration) {
      case ROW_CONFIG.TOP:
        if (i === 0) {
          // draw top center mark
          ROW.push(<CenterLine
            key={`polyline-center-top-${ELEMENT_KEY}`}
            points={`${MID_POINT}, 0 ${MID_POINT}, ${CENTER_TICK_LENGTH}`}
            style={style}
          />);

          // draw bottom center mark
          ROW.push(<CenterLine
            key={`polyline-center-bottom-${ELEMENT_KEY}`}
            points={`${MID_POINT}, ${dimension} ${MID_POINT}, ${(dimension - CENTER_TICK_LENGTH)}`}
            style={style}
          />);

          // draw left center tick
          ROW.push(<CenterLine
            key={`polyline-center-left-${ELEMENT_KEY}`}
            points={`${0}, ${MID_POINT}, ${CENTER_TICK_LENGTH}, ${MID_POINT}`}
            style={style}
          />);

          // draw right center tick
          ROW.push(<CenterLine
            key={`polyline-center-right-${ELEMENT_KEY}`}
            points={`${dimension}, ${MID_POINT} ${(dimension - CENTER_TICK_LENGTH)}, ${MID_POINT}`}
            style={style}
          />);

          // draw gridline
          ROW.push(<GridLine
            key={`grid-${ELEMENT_KEY}`}
            dimension={dimension}
            resolution={resolution}
            spacing={SPACING}
            currentX={MID_POINT}
            increment={increment}
            style={style}
          />);
        } else if (i <= TICKS_PER_SIDE) {
          x1 = LEFT_ACCUMULATOR;
          y1 = 0;
          x2 = LEFT_ACCUMULATOR;
          y2 = (isLargeTick(increment, LEFT_COUNTER))
            ? LARGE_TICK_LENGTH
            : SHORT_TICK_LENGTH;
          tickThickness = (isLargeTick(increment, LEFT_COUNTER))
            ? LARGE_TICK_THICKNESS
            : SHORT_TICK_THICKNESS;

          if (isLargeTick(increment, LEFT_COUNTER)) {
            ROW.push(<GridLine
              key={`grid-${ELEMENT_KEY}`}
              dimension={dimension}
              resolution={resolution}
              spacing={SPACING}
              currentX={LEFT_ACCUMULATOR}
              increment={increment}
              style={style}
            />);
          }

          ROW.push(<Polyline
            key={`polyline-${ELEMENT_KEY}`}
            points={`${x1},${y1} ${x2},${y2}`}
            strokeWidth={tickThickness}
            {...style}
          />);

          LEFT_ACCUMULATOR -= SPACING;
          LEFT_COUNTER += 1;
        } else {
          x1 = RIGHT_ACCUMULATOR;
          y1 = 0;
          x2 = RIGHT_ACCUMULATOR;
          y2 = (isLargeTick(increment, RIGHT_COUNTER)) ? LARGE_TICK_LENGTH : SHORT_TICK_LENGTH;
          tickThickness = (isLargeTick(increment, RIGHT_COUNTER))
            ? LARGE_TICK_THICKNESS
            : SHORT_TICK_THICKNESS;

          if (isLargeTick(increment, RIGHT_COUNTER)) {
            ROW.push(<GridLine
              key={`grid-${ELEMENT_KEY}`}
              dimension={dimension}
              resolution={resolution}
              spacing={SPACING}
              currentX={RIGHT_ACCUMULATOR}
              increment={increment}
              style={style}
            />);
          }

          RIGHT_ACCUMULATOR += SPACING;
          RIGHT_COUNTER += 1;
        }
        break;
      case ROW_CONFIG.BOTTOM:
        if (i <= TICKS_PER_SIDE) {
          x1 = LEFT_ACCUMULATOR;
          y1 = dimension;
          x2 = LEFT_ACCUMULATOR;
          y2 = (isLargeTick(increment, LEFT_COUNTER))
            ? (dimension - LARGE_TICK_LENGTH)
            : (dimension - SHORT_TICK_LENGTH);
          tickThickness = (isLargeTick(increment, LEFT_COUNTER))
            ? LARGE_TICK_THICKNESS
            : SHORT_TICK_THICKNESS;

          LEFT_ACCUMULATOR -= SPACING;
          LEFT_COUNTER += 1;
        } else {
          x1 = RIGHT_ACCUMULATOR;
          y1 = dimension;
          x2 = RIGHT_ACCUMULATOR;
          y2 = (isLargeTick(increment, RIGHT_COUNTER))
            ? (dimension - LARGE_TICK_LENGTH)
            : (dimension - SHORT_TICK_LENGTH);
          tickThickness = (isLargeTick(increment, RIGHT_COUNTER))
            ? LARGE_TICK_THICKNESS
            : SHORT_TICK_THICKNESS;

          RIGHT_ACCUMULATOR += SPACING;
          RIGHT_COUNTER += 1;
        }
        break;
      case ROW_CONFIG.LEFT:
        if (i <= TICKS_PER_SIDE) {
          x1 = 0;
          y1 = LEFT_ACCUMULATOR;
          x2 = (isLargeTick(increment, LEFT_COUNTER))
            ? LARGE_TICK_LENGTH
            : SHORT_TICK_LENGTH;
          y2 = LEFT_ACCUMULATOR;
          tickThickness = (isLargeTick(increment, LEFT_COUNTER))
            ? LARGE_TICK_THICKNESS
            : SHORT_TICK_THICKNESS;

          LEFT_ACCUMULATOR -= SPACING;
          LEFT_COUNTER += 1;
        } else {
          x1 = 0;
          y1 = RIGHT_ACCUMULATOR;
          x2 = (isLargeTick(increment, RIGHT_COUNTER))
            ? LARGE_TICK_LENGTH
            : SHORT_TICK_LENGTH;
          y2 = RIGHT_ACCUMULATOR;
          tickThickness = (isLargeTick(increment, RIGHT_COUNTER))
            ? LARGE_TICK_THICKNESS
            : SHORT_TICK_THICKNESS;

          RIGHT_ACCUMULATOR += SPACING;
          RIGHT_COUNTER += 1;
        }
        break;
      case ROW_CONFIG.RIGHT:
        if (i <= TICKS_PER_SIDE) {
          x1 = dimension;
          y1 = LEFT_ACCUMULATOR;
          x2 = (isLargeTick(increment, LEFT_COUNTER))
            ? (dimension - LARGE_TICK_LENGTH)
            : (dimension - SHORT_TICK_LENGTH);
          y2 = LEFT_ACCUMULATOR;
          tickThickness = (isLargeTick(increment, LEFT_COUNTER))
            ? LARGE_TICK_THICKNESS
            : SHORT_TICK_THICKNESS;

          LEFT_ACCUMULATOR -= SPACING;
          LEFT_COUNTER += 1;
        } else {
          x1 = dimension;
          y1 = RIGHT_ACCUMULATOR;
          x2 = (isLargeTick(increment, RIGHT_COUNTER))
            ? (dimension - LARGE_TICK_LENGTH)
            : (dimension - SHORT_TICK_LENGTH);
          y2 = RIGHT_ACCUMULATOR;
          tickThickness = (isLargeTick(increment, RIGHT_COUNTER))
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

    if (x1 !== undefined && y1 !== undefined && x2 !== undefined && y2 !== undefined) {
      ROW.push(<Polyline
        key={`polyline-${ELEMENT_KEY}`}
        points={`${x1},${y1} ${x2},${y2}`}
        strokeWidth={tickThickness}
        {...style}
      />);
    }
  }

  return ROW;
}
