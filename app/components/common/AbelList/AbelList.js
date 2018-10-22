import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import HorizontalList from './HorizontalList';
import VerticalList from './VerticalList';
import style from './AbelList.style';

const AbelList = ({ list, theme }) => (
  <Fragment>
    <DisplayAtBreakpoint
      screenMedium
    >
      <HorizontalList theme={theme.horizontalList} list={list} />
    </DisplayAtBreakpoint>

    <DisplayAtBreakpoint
      screenSmall
      screenLarge
      screenXLarge
    >
      <VerticalList theme={theme.verticalList} list={list} />
    </DisplayAtBreakpoint>
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
