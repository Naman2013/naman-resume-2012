import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Request from 'components/common/network/Request';
import SterlingTitle from 'components/common/titles/SterlingTitle';
import TopicList from 'components/guides/TopicList';
import { GUIDE_PANEL_ENDPOINT_URL } from 'services/guides/guide-data';

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
    serviceURL={GUIDE_PANEL_ENDPOINT_URL}
    model={guidePanelsModel}
    requestBody={{ guideId }}
    render={guidePanelResults => (
      <Fragment>
        {
          !guidePanelResults.fetchingContent &&
            <Fragment>
              <SterlingTitle
                {...guidePanelResults
                  .modeledResponses.GUIDE_PANELS.sterlingTitleProps}
              />
              <TopicList
                {...guidePanelResults.modeledResponses.GUIDE_PANELS.topicListProps}
              />
            </Fragment>
        }
      </Fragment>
    )}
  />
);

GuidePanels.propTypes = {
  guideId: PropTypes.string.isRequired,
};

export default GuidePanels;
