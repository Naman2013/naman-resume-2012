import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { DeviceContext } from 'providers/DeviceProvider';

import MissionCard from './MissionCard';
import ImagesContainer from './ImagesContainer';

const arr = [1, 2, 3, 4, 5];

export default () => (
  <DeviceContext.Consumer>
    {
      context => (
        <Fragment>
          
          <div className="root" style={{ justifyContent: context.isDesktop ? 'normal' : 'space-between' }}>
            {arr.map((el, i) => (
              <MissionCard
                isDesktop={context.isDesktop}
                isMobile={context.isMobile}
                index={i}
              />
            ))}
          </div>
          <style jsx>
            {`
              .root {
                margin: 0 10px;
                color: red;
                display: flex;
                flex-wrap: wrap;
              }
            `}
          </style>
        </Fragment>
      )
    }
  </DeviceContext.Consumer>
);

