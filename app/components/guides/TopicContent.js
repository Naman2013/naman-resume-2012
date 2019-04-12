import React from 'react';
import PropTypes from 'prop-types';
import CenterColumn from 'components/common/CenterColumn';
import TopicHeading from './TopicHeading';
import TopicBodyContent from './TopicBodyContent';
import TopicContentList from './TopicContentList';
import { DeviceContext } from '../../providers/DeviceProvider';
import style from './TopicContent.style';

const TopicContent = ({ title, topicContentList, ...restProps }) => (
  <DeviceContext.Consumer>
    {context => (
      <div className="root">
        <CenterColumn>
          <div className="title-container">
            <TopicHeading text={title} />
          </div>
        </CenterColumn>
        <CenterColumn>
          <div className="guide-container">
            <TopicContentList list={topicContentList} {...restProps} />
            <TopicBodyContent {...restProps} />
          </div>
        </CenterColumn>
        <style jsx>
          {`
            .guide-container {
              flex-direction: ${restProps.showContentList &&
              (context.isDesktop || context.isTablet)
                ? 'row'
                : 'column'};
            }
          `}
        </style>
        <style jsx>{style}</style>
      </div>
    )}
  </DeviceContext.Consumer>
);

TopicContent.propTypes = {
  title: PropTypes.string.isRequired,
  topicContentList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TopicContent;
