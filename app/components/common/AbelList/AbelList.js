import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { DeviceContext } from '../../../providers/DeviceProvider';
import style from './AbelList.style';

const AbelList = ({ list }) => (
  <Fragment>
    <DeviceContext.Consumer>
      {
        (context) => {
          console.log(context);
          return (
            <ul>
              { list.map(item => <li>{item}</li>) }
            </ul>
          );
        }
      }

    </DeviceContext.Consumer>
    <style jsx>{style}</style>
  </Fragment>
);

AbelList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string),
};

AbelList.defaultProps = {
  list: [],
};

export default AbelList;
