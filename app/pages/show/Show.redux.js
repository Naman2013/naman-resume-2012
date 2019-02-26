/***********************************
* V4 Show Page
*   Markdown support on elements????
*   UTF-8 support....
*   Multi-National Languages.....
***********************************/


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DeviceContext } from 'providers/DeviceProvider';
import Request from 'components/common/network/Request';
import { LIVE_SHOW_INFO } from 'services/events';
import BootstrappedShow from './BootstrappedShow';
import { modelWithInfoBlocks } from './showConfiguration';


const mapStateToProps = ({
  user,
}) => ({
  user,
});

@connect(mapStateToProps, null)
class Show extends Component {
  static propTypes = {
  }

  static defaultProps = {
  }

  render() {
    const {
      user,
      params: {
        showId,
      },
    } = this.props;

    return (
      <div>
        <Request
          authorizationRedirect={true}
          serviceURL={LIVE_SHOW_INFO}
          method="POST"
          model={modelWithInfoBlocks}
          serviceExpiresFieldName="expires"
          requestBody={{
            customerId: user.cid,
            showId,
          }}
          render={({
            fetchingContent,
            modeledResponses: { DATA_WITH_SHOW_INFO_BASED_ON_STATUS },
          }) => (
            <div>
              <DeviceContext.Consumer>
                {context => (<BootstrappedShow
                  user={user}
                  fetching={fetchingContent}
                  showId={showId}
                  {...context}
                  {...DATA_WITH_SHOW_INFO_BASED_ON_STATUS}
                />)}
              </DeviceContext.Consumer>
            </div>
          )}
        />
      </div>
    );
  }
}

export default Show;
