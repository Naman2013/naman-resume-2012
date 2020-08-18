import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import style from './DisplayAtBreakpoint.style';

const getCurrentDisplay = (screenSmall, screenMedium, screenLarge, screenXLarge)=>{
  
  const displayWidth=window.innerWidth;
  switch(true){
    case displayWidth >= 1366 && screenXLarge:
      return true;
    case displayWidth >= 1024 && screenLarge:     
      return true;
    case displayWidth >= 768 && screenMedium:
      return true; 
    case displayWidth < 768 && screenSmall:
      return true;    
    default:
      return false;
  }
}

const DisplayAtBreakpoint = ({
  children,
  screenSmall,
  screenMedium,
  screenLarge,
  screenXLarge,
}) => (
   <div
    className={classnames('root', {
    screenSmall,
    screenMedium,
    screenLarge,
    screenXLarge,
  })}
  >
    {children}
    <style jsx>{style}</style>
  </div>
);

DisplayAtBreakpoint.propTypes = {
  children: PropTypes.node.isRequired,
  screenSmall: PropTypes.bool,
  screenMedium: PropTypes.bool,
  screenLarge: PropTypes.bool,
  screenXLarge: PropTypes.bool,
};

DisplayAtBreakpoint.defaultProps = {
  screenSmall: false,
  screenMedium: false,
  screenLarge: false,
  screenXLarge: false,
};

export default DisplayAtBreakpoint;
