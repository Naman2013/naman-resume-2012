import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { gray } from 'styles/variables/colors';

const {
  instanceOf
} = PropTypes;

const DropshadowContainer = ({
  component,
}) => (
  <div className="drop-container">
    {component}
    <style jsx>
      {`
        .drop-container {
          -moz-box-shadow: 0 2px 4px 3px ${gray};
          -webkit-box-shadow: 0 2px 4px 3px ${gray};
          box-shadow: 0 2px 4px 3px ${gray};
        }
      `}
    </style>
  </div>
);

DropshadowContainer.propTypes = {
  component: instanceOf(Component),
};
DropshadowContainer.defaultProps = {};

export default DropshadowContainer;
