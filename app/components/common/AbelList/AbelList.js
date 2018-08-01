import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { DeviceContext } from '../../../providers/DeviceProvider';
import HorizontalList from './HorizontalList';
import VerticalList from './VerticalList';
import style from './AbelList.style';

const AbelList = ({ list, theme }) => (
  <Fragment>
    <DeviceContext.Consumer>
      {
        (context) => {
          if (context.isScreenMedium && !context.isScreenLarge) {
            return (<HorizontalList theme={theme.horizontalList} list={list} />);
          }

          return (<VerticalList theme={theme.verticalList} list={list} />);
        }
      }

    </DeviceContext.Consumer>
    <style jsx>{style}</style>
  </Fragment>
);

AbelList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string),
  theme: PropTypes.shape({
    horizontalList: PropTypes.shape({}),
    verticalList: PropTypes.shape({}),
  }),
};

AbelList.defaultProps = {
  list: [],
  theme: {
    horizontalList: {},
    verticalList: {},
  },
};

export default AbelList;
