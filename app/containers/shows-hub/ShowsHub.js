import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import noop from 'lodash/noop';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ShowTiles from 'components/shows-hub/show-tiles';
import Request from 'components/common/network/Request';
import HubContainer from 'components/common/HubContainer';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import {
  SHOWS_PAGE_ENDPOINT_URL,
  SHOWS_PREVIOUS_ENDPOINT_URL,
  SHOWS_UPCOMING_ENDPOINT_URL,
} from 'services/shows';
import { DeviceContext } from 'providers/DeviceProvider';
import { validateResponseAccess } from 'modules/authorization/actions'
import style from './shows-hub.style';

const COUNT = 9;
const DEFAULT_PAGE = 1;


const showsHubModel = {
  name: 'SHOW_HUB_MODEL',
  model: resp => ({
    filterOptions: resp.navigationConfig,
    sortOptions: resp.filterOptions.options,
  }),
};

class Shows extends Component {
  static propTypes = {
    validateResponseAccess: PropTypes.func,
    params: PropTypes.shape({
      filterType: PropTypes.string,
    }),
  };

  static defaultProps = {
    validateResponseAccess: noop,
    params: {
      filterType: 'all',
    },
  };

  state = {
    shows: [],
  };

  updateShowsList = (resData) => {
    this.setState(() => ({
      shows: resData.eventList,
    }));
  }

  updateReadingListInShow = (id, resData) => {
    let newShowsList = [].concat(this.state.shows);

    newShowsList = newShowsList.map((show) => {
      if (show.showId === id) {
        return Object.assign(show, resData);
      }
      return show;
    });

    this.setState(() => ({
      shows: newShowsList,
    }));
  }

  appendToShowsList = (resData) => {
    this.setState((state) => {
      const shows = [].concat(state.shows, resData.eventList)
      return {
        shows
      };
    });
  }

  render() {
    const {
      user,
      actions,
    } = this.props;
    const {
      shows
    } = this.state;
    return (<div>
      <Request
        serviceURL={SHOWS_PAGE_ENDPOINT_URL}
        model={showsHubModel}
        requestBody={{}}
        render={({
          fetchingContent,
          modeledResponses: { SHOW_HUB_MODEL },
          serviceResponse = {},
        }) => (
          <Fragment>
            {
              !fetchingContent &&
                <DeviceContext.Consumer>
                  {context => (
                    <HubContainer
                      {...this.props}
                      {...SHOW_HUB_MODEL}
                      {...context}
                      hubName="shows"
                      paginateURL={SHOWS_PREVIOUS_ENDPOINT_URL}
                      page={DEFAULT_PAGE}
                      count={COUNT}
                      user={user}
                      validateResponseAccess={actions.validateResponseAccess}
                      responseFieldNames={{
                        currentCount: 'showsCount',
                        totalCount: 'totalShowsCount',
                      }}
                      updateList={this.updateShowsList}
                      appendToList={this.appendToShowsList}
                      iconURL={serviceResponse.pageIconURL}
                      pageTitle={serviceResponse.pageTitle}
                      filterTypeFieldName="theme"
                      filterType={this.props.params.filterType}
                      render={() => (
                        <Fragment>
                          {fetchingContent ? <div>Loading</div> : null}
                          {!fetchingContent && shows.length ?
                            <ShowTiles
                              updateReadingListInfo={this.updateReadingListInShow}
                              shows={shows}
                              isMobile={context.isMobile}
                            /> :
                            <div>There are no shows.</div>}
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

export default connect(mapStateToProps, mapDispatchToProps)(Shows);
