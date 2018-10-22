import React from 'react';
import PropTypes from 'prop-types';
import style from './Row.style';

const Row = ({ wrap, children }) => (
  <div className="row-root">
    {children}
    <style jsx>{style}</style>
    <style jsx>
      {`
        .row-root {
          flex-wrap: ${(wrap) ? 'wrap' : 'nowrap'};
        }
      `}
    </style>
  </div>
);

Row.propTypes = {
  children: PropTypes.node.isRequired,
  wrap: PropTypes.bool,
};

Row.defaultProps = {
  wrap: false,
};

export default Row;
