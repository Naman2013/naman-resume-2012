import React from 'react';

import ROW_CONFIG from './rowConfigurationEnum';
import Tick from './Tick';
import GridLine from './GridLine';
import Polyline from '../../SVG/Polyline';
import FadeSVG from 'components/common/Fade/FadeSVG';
import UnitText from './UnitText';

function warnClient() {
  console.warn('Invalid row configuration provided');
}

function isLargeTick(increment, position) {
  return (position % increment === 0);
}

export default function generateRow(
  dimension = 0,
  resolution = 0,
  increment = 5,
  rowConfiguration = ROW_CONFIG.TOP,
  style = {},
  isGridVisible = false,
  isScaleVisible = false,
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
  const LARGE_TICK_LENGTH = 12;
  const LARGE_TICK_THICKNESS = 2;
  const SHORT_TICK_LENGTH = (LARGE_TICK_LENGTH / 2);
  const SHORT_TICK_THICKNESS = (LARGE_TICK_THICKNESS / 2);
  const CENTER_MARKER_TEXT = 0;
  const MARKER_TEXT_INCREMENT = 5;

  let LEFT_ACCUMULATOR = MID_POINT;
  let LEFT_COUNTER = 0;
  let RIGHT_ACCUMULATOR = MID_POINT;
  let RIGHT_COUNTER = 0;
  let incrementedMarkerTextTopLeft = CENTER_MARKER_TEXT;
  let incrementedMarkerTextTopRight = CENTER_MARKER_TEXT;

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
          ROW.push(
            <Tick
              key={`polyline-center-top-${ELEMENT_KEY}`}
              points={`${MID_POINT}, 0 ${MID_POINT}, ${CENTER_TICK_LENGTH}`}
              style={style}
            />,
            <UnitText
              unit={CENTER_MARKER_TEXT}
              x={MID_POINT}
              y={(CENTER_TICK_LENGTH + 15)}
            />,
            <Tick
              key={`polyline-center-bottom-${ELEMENT_KEY}`}
              points={`${MID_POINT}, ${dimension} ${MID_POINT}, ${(dimension - CENTER_TICK_LENGTH)}`}
              style={style}
            />,
            <Tick
              key={`polyline-center-left-${ELEMENT_KEY}`}
              points={`${0}, ${MID_POINT}, ${CENTER_TICK_LENGTH}, ${MID_POINT}`}
              style={style}
            />,
            <Tick
              key={`polyline-center-right-${ELEMENT_KEY}`}
              points={`${dimension}, ${MID_POINT} ${(dimension - CENTER_TICK_LENGTH)}, ${MID_POINT}`}
              style={style}
            />,
            <UnitText
              unit={CENTER_MARKER_TEXT}
              x={(dimension - 40)}
              y={MID_POINT}
            />,
            <FadeSVG isHidden={!isGridVisible}>
              <GridLine
                key={`grid-${ELEMENT_KEY}-0`}
                dimension={dimension}
                resolution={resolution}
                spacing={SPACING}
                currentX={MID_POINT}
                increment={increment}
                style={style}
              />
            </FadeSVG>
            ,
          );
        }

        if (i <= TICKS_PER_SIDE) {
          x1 = LEFT_ACCUMULATOR;
          y1 = 0;
          x2 = LEFT_ACCUMULATOR;
          y2 = (isLargeTick(increment, LEFT_COUNTER))
            ? LARGE_TICK_LENGTH
            : SHORT_TICK_LENGTH;
          tickThickness = (isLargeTick(increment, LEFT_COUNTER))
            ? LARGE_TICK_THICKNESS
            : SHORT_TICK_THICKNESS;

          // draw the right side partial
          ROW.push(<Polyline
            key={`polyline-right-ticks-${ELEMENT_KEY}`}
            points={`
              ${dimension},${LEFT_ACCUMULATOR}
              ${(isLargeTick(increment, LEFT_COUNTER)) ? (dimension - LARGE_TICK_LENGTH) : (dimension - SHORT_TICK_LENGTH)},${LEFT_ACCUMULATOR}
            `}
            strokeWidth={
              (isLargeTick(increment, LEFT_COUNTER)) ? LARGE_TICK_THICKNESS : SHORT_TICK_THICKNESS
            }
            {...style}
          />);

          if (isLargeTick(increment, LEFT_COUNTER)) {
            ROW.push(
              <FadeSVG isHidden={!isGridVisible}>
                <GridLine
                  key={`grid-${ELEMENT_KEY}-1`}
                  dimension={dimension}
                  resolution={resolution}
                  spacing={SPACING}
                  currentX={LEFT_ACCUMULATOR}
                  increment={increment}
                  style={style}
                />
              </FadeSVG>
              ,
              (incrementedMarkerTextTopLeft > 0
                ? (
                  <React.Fragment>
                    <UnitText
                      unit={`-${incrementedMarkerTextTopLeft}`}
                      x={LEFT_ACCUMULATOR}
                      y={(y2 + 15)}
                    />
                    <UnitText
                      unit={`${incrementedMarkerTextTopLeft}`}
                      x={dimension - (LARGE_TICK_LENGTH + 15)}
                      y={LEFT_ACCUMULATOR}
                    />
                  </React.Fragment>
                )
                : null),
            );

            incrementedMarkerTextTopLeft += MARKER_TEXT_INCREMENT;
          }

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

          // draw the right side partial
          ROW.push(<Polyline
            key={`polyline-right-ticks-${ELEMENT_KEY}`}
            points={`
              ${dimension},${RIGHT_ACCUMULATOR}
              ${(isLargeTick(increment, RIGHT_COUNTER)) ? (dimension - LARGE_TICK_LENGTH) : (dimension - SHORT_TICK_LENGTH)},${RIGHT_ACCUMULATOR}
            `}
            strokeWidth={
              (isLargeTick(increment, RIGHT_COUNTER)) ? LARGE_TICK_THICKNESS : SHORT_TICK_THICKNESS
            }
            {...style}
          />);

          // TODO: add another UnitText for the right bar...
          if (isLargeTick(increment, RIGHT_COUNTER)) {
            ROW.push(
              <FadeSVG isHidden={!isGridVisible}>
                <GridLine
                  key={`grid-${ELEMENT_KEY}`}
                  dimension={dimension}
                  resolution={resolution}
                  spacing={SPACING}
                  currentX={RIGHT_ACCUMULATOR}
                  increment={increment}
                  style={style}
                />
              </FadeSVG>
              ,
              (incrementedMarkerTextTopRight > 0
                ? (
                  <React.Fragment>
                    <UnitText
                      unit={incrementedMarkerTextTopRight}
                      x={RIGHT_ACCUMULATOR}
                      y={(y2 + 15)}
                    />
                    <UnitText
                      unit={`-${incrementedMarkerTextTopRight}`}
                      x={dimension - (LARGE_TICK_LENGTH + 15)}
                      y={RIGHT_ACCUMULATOR}
                    />
                  </React.Fragment>
                )
                : null),
            );

            incrementedMarkerTextTopRight += MARKER_TEXT_INCREMENT;
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
