import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { DeviceContext } from '../../../providers/DeviceProvider';
import HorizontalList from './HorizontalList';
import VerticalList from './VerticalList';
import style from './AbelList.style';

const AbelList = ({ list }) => (
  <Fragment>
    <DeviceContext.Consumer>
      {
        (context) => {
          if (context.isScreenMedium && !context.isScreenLarge) {
            return (<HorizontalList list={list} />);
          }

          return (<VerticalList list={list} />);
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
