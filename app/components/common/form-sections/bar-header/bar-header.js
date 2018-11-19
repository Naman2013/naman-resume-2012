import React from 'react';
import PropTypes from 'prop-types';
import styles from './bar-header.style';

const BarHeader = (props) => {
  const {
    title,
    renderRight
  } = props;

  return (
    <div className="root">
      <div className="title-text" dangerouslySetInnerHTML={{ __html: title }} />
      {renderRight ? renderRight() : null}
      <style jsx>{styles}</style>
    </div>
  )
}

BarHeader.propTypes = {
    character: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
    size: PropTypes.number, // in pixels
}

BarHeader.defaultProps = {
    size: 40,
    isActive: false,
}



export default BarHeader;
