import React from 'react';
import PropTypes from 'prop-types';
import style from './MiraDot.style';

const MiraDot = ({ theme }) => (
  <div
    style={{
        width: `${theme.dimension}px`,
        height: `${theme.dimension}px`,
    }}
    className="root"
  >
    <style jsx>{style}</style>
  </div>
);

MiraDot.propTypes = {
  theme: PropTypes.shape({
    dimension: PropTypes.number,
  }),
};

MiraDot.defaultProps = {
  theme: {
    dimension: 10,
  },
};

export default MiraDot;
