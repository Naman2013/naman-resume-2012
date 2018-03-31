import React, { Component } from 'react';
import Measure from 'react-measure';
import generateRow from './generateRow';
import Group from '../SVG/Group';


class Telescope extends Component {
  state = {
    portalDimensions: {
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
      x: 0,
      y: 0,
    },
  };

  handlePortalResize = (contentBox) => {
    this.setState({ portalDimensions: { ...contentBox.bounds } });
  }

  render() {
    const { portalDimensions: { width, height } } = this.state;
    console.log(width, height);

    return (
      <Measure
        bounds
        onResize={this.handlePortalResize}
      >
        {
          ({ measureRef }) => (
            <div
              ref={measureRef}
              className="portal"
            >
              <svg
                width="100%"
                height="100%"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Group style={{ border: '1px solid red' }}>
                  <Group>
                    {generateRow()}
                  </Group>
                </Group>

              </svg>


              <style jsx>{`
                .portal {
                  width: 100%;
                  overflow: hidden;
                  background: yellow;
                }

                .portal:before {
                  content: '';
                  padding-top: 100%;
                  float: left;
                }
              `}
              </style>
            </div>
          )
        }
      </Measure>
    );
  }
}

export default Telescope;
