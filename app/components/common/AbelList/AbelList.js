import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import HorizontalList from './HorizontalList';
import VerticalList from './VerticalList';
import style from './AbelList.style';

const AbelList = ({ list, iconList, theme }) => (
  <Fragment>
    <DisplayAtBreakpoint screenMedium screenSmall>
      <HorizontalList theme={theme.horizontalList} list={list} />
    </DisplayAtBreakpoint>

    <DisplayAtBreakpoint screenLarge screenXLarge>
      <VerticalList theme={theme.verticalList} list={list} iconList={iconList} />
    </DisplayAtBreakpoint>
    <style jsx>{style}</style>
  </Fragment>
);

AbelList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string),
  iconList: PropTypes.arrayOf(PropTypes.string),
  theme: PropTypes.shape({
    horizontalList: PropTypes.shape({}),
    verticalList: PropTypes.shape({}),
  }),
};

AbelList.defaultProps = {
  list: [],
  iconList: [],
  theme: {
    horizontalList: {},
    verticalList: {},
  },
};

export default AbelList;
