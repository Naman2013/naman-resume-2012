import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Request from 'app/components/common/network/Request';
import SterlingTitle from 'app/components/common/titles/SterlingTitle';
import TopicList from 'app/components/guides/TopicList';
import { GUIDE_PANEL_ENDPOINT_URL } from 'app/services/guides/guide-data';

const guidePanelsModel = {
  name: 'GUIDE_PANELS',
  model: resp => ({
    topicListProps: { list: resp.panelList },
    sterlingTitleProps: {
      title: resp.panelHeading1,
      subTitle: resp.panelHeading2,
    },
  }),
};

const GuidePanels = ({ guideId }) => (
  <Request
    withoutUser
    serviceURL={GUIDE_PANEL_ENDPOINT_URL}
    model={guidePanelsModel}
    requestBody={{ guideId }}
    render={({ fetchingContent, modeledResponses: { GUIDE_PANELS } }) => (
      <div className="lightgray-background">
        {!fetchingContent && GUIDE_PANELS.topicListProps.list.length > 0 && (
          <Fragment>
            <SterlingTitle {...GUIDE_PANELS.sterlingTitleProps} />
            <TopicList {...GUIDE_PANELS.topicListProps} />
          </Fragment>
        )}
      </div>
    )}
  />
);

GuidePanels.propTypes = {
  guideId: PropTypes.string.isRequired,
};

export default GuidePanels;
