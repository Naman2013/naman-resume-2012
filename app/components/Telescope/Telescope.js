import React, { Component } from 'react';
import Polyline from '../SVG/Polyline';
import Group from '../SVG/Group';


function generateRow() {
  const row = [];
  const SPACING = 5;
  const LARGE_TICK_LENGTH = 12;
  const LARGE_TICK_THICKNESS = 2;
  const SHORT_TICK_LENGTH = (LARGE_TICK_LENGTH / 2);
  const SHORT_TICK_THICKNESS = (LARGE_TICK_THICKNESS / 2);

  let ACCUMULATOR = 0;

  for (let i = 0; i <= 100; i += 1) {
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


class Telescope extends Component {
  state = {};

  render() {
    return (
      <div>
        <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <Group>

            <Group>
              {generateRow()}
            </Group>

            {
              /*
              <Group>
                <Polyline points="5,0 5,12" strokeWidth={2} />
                <Polyline points="10,0 10,6" strokeWidth={1} />
                <Polyline points="15,0 15,6" strokeWidth={1} />
                <Polyline points="20,0 20,6" strokeWidth={1} />
                <Polyline points="25,0 25,6" strokeWidth={1} />
              </Group>
               */
            }

          </Group>

        </svg>
      </div>
    );
  }
};

export default Telescope;
