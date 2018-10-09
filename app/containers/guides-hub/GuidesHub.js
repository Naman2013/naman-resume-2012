import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import noop from 'lodash/noop';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GuideTiles from 'components/guides-hub/guide-tiles';
import Request from 'components/common/network/Request';
import HubContainer from 'components/common/HubContainer';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import ShowMoreWithNetwork from 'components/common/show-more-with-network';
import { GUIDES_PAGE_ENDPOINT_URL, GUIDES_ENDPOINT_URL } from 'services/guides/guide-data';
import { DeviceContext } from 'providers/DeviceProvider';
import { validateResponseAccess } from 'modules/authorization/actions'
import style from './guides-hub.style';

const COUNT = 9;
const DEFAULT_PAGE = 1;


const guidesHubModel = {
  name: 'GUIDE_HUB_MODEL',
  model: resp => ({
    filterOptions: resp.navigationConfig,
    sortOptions: resp.filterOptions.options,
  }),
};

class Guides extends Component {
  static propTypes = {
    validateResponseAccess: PropTypes.func,
    params: PropTypes.shape({
      filterType: PropTypes.string,
    }),
  };

  static defaultProps = {
    validateResponseAccess: noop,
    params: {
      filterType: 'all'
    },
  };

  state = {
    guides: [],
  };

  updateGuidesList = (resData) => {
    this.setState(() => ({
      guides: resData.guidesList,
    }));
  }

  updateReadingListInGuide = (id, resData) => {
    let newGuidesList = [].concat(this.state.guides);

    newGuidesList = newGuidesList.map((guide) => {
      if (guide.guideId === id) {
        return Object.assign(guide, resData);
      }
      return guide;
    });

    this.setState(() => ({
      guides: newGuidesList,
    }));
  }

  appendToGuidesList = (resData) => {
    this.setState((state) => {
      const guides = [].concat(state.guides, resData.guidesList)
      return {
        guides
      };
    });
  }

  render() {
    const {
      user,
      actions,
    } = this.props;
    const {
      guides
    } = this.state;
    return (<div>
      <Request
        serviceURL={GUIDES_PAGE_ENDPOINT_URL}
        model={guidesHubModel}
        requestBody={{}}
        render={({
          fetchingContent,
          modeledResponses: { GUIDE_HUB_MODEL },
          serviceResponse = {},
        }) => (
          <Fragment>
            {
              !fetchingContent &&
                <DeviceContext.Consumer>
                  {context => (
                    <HubContainer
                      {...this.props}
                      {...GUIDE_HUB_MODEL}
                      {...context}
                      hubName="guides"
                      paginateURL={GUIDES_ENDPOINT_URL}
                      page={DEFAULT_PAGE}
                      count={COUNT}
                      user={user}
                      validateResponseAccess={actions.validateResponseAccess}
                      responseFieldNames={{
                        currentCount: 'guidesCount',
                        totalCount: 'totalGuidesCount',
                      }}
                      updateList={this.updateGuidesList}
                      appendToList={this.appendToGuidesList}
                      iconURL={serviceResponse.pageIconURL}
                      pageTitle={serviceResponse.pageTitle}
                      filterType={this.props.params.filterType}
                      render={() => (
                        <Fragment>
                          {fetchingContent ? <div>Loading</div> : null}
                          {!fetchingContent && guides.length ?
                            <GuideTiles
                              updateReadingListInfo={this.updateReadingListInGuide}
                              guides={guides}
                              isMobile={context.isMobile}
                            /> :
                            <div>There are no guides.</div>}
                        </Fragment>
                      )}
                    />
                  )}
                </DeviceContext.Consumer>
            }
          </Fragment>
        )}
      />
      <style jsx>{style}</style>
    </div>)
  }
}



const mapStateToProps = ({
  user,
}) => ({
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    validateResponseAccess,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Guides);
