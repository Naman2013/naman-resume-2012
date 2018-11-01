import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './circle-character.style';

const CircleCharacter = (props) => {
  const {
    character,
    size,
    isActive,
  } = props;

  const dimensions = {
    height: `${size}px`,
    width: `${size}px`,
  };
  return (
    <div className="root">
      <div className={classnames('circle', {
        'active': isActive,
      })} style={dimensions}>
        <span className="character" dangerouslySetInnerHTML={{ __html: character }} />
      </div>
      <style jsx>{styles}</style>
    </div>
  )
}

CircleCharacter.propTypes = {
    character: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
    size: PropTypes.number, // in pixels
}

CircleCharacter.defaultProps = {
    size: 40,
    isActive: false,
}



export default CircleCharacter;
