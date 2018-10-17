import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import noop from 'lodash/noop';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GroupTiles from 'components/groups-hub/group-tiles';
import Request from 'components/common/network/Request';
import HubContainer from 'components/common/HubContainer';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import ShowMoreWithNetwork from 'components/common/show-more-with-network';
import { GROUPS_PAGE_ENDPOINT_URL, GET_GROUPS } from 'services/community-groups';
import { DeviceContext } from 'providers/DeviceProvider';
import { validateResponseAccess } from 'modules/authorization/actions'
import style from './groups-hub.style';

const COUNT = 9;
const DEFAULT_PAGE = 1;


const groupsHubModel = {
  name: 'GROUP_HUB_MODEL',
  model: resp => ({
    filterOptions: resp.navigationConfig,
    sortOptions: resp.filterOptions.options,
  }),
};

class Groups extends Component {
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
    groups: [],
  };

  updateGroupsList = (resData) => {
    this.setState(() => ({
      groups: resData.groups,
    }));
  }

  updateReadingListInGroup = (id, resData) => {
    let newGroupsList = [].concat(this.state.groups);

    newGroupsList = newGroupsList.map((group) => {
      if (group.groupId === id) {
        return Object.assign(group, resData);
      }
      return group;
    });

    this.setState(() => ({
      groups: newGroupsList,
    }));
  }

  appendToGroupsList = (resData) => {
    this.setState((state) => {
      const groups = [].concat(state.groups, resData.groups)
      return {
        groups
      };
    });
  }

  render() {
    const {
      user,
      actions,
    } = this.props;
    const {
      groups
    } = this.state;
    return (<div>
      <Request
        serviceURL={GROUPS_PAGE_ENDPOINT_URL}
        model={groupsHubModel}
        requestBody={{}}
        render={({
          fetchingContent,
          modeledResponses: { GROUP_HUB_MODEL },
          serviceResponse = {},
        }) => (
          <Fragment>
            {
              !fetchingContent &&
                <DeviceContext.Consumer>
                  {context => (
                    <HubContainer
                      {...this.props}
                      {...GROUP_HUB_MODEL}
                      {...context}
                      hubName="groups"
                      paginateURL={GET_GROUPS}
                      page={DEFAULT_PAGE}
                      count={COUNT}
                      user={user}
                      validateResponseAccess={actions.validateResponseAccess}
                      responseFieldNames={{
                        currentCount: 'groupsCount',
                        totalCount: 'totalGroupsCount',
                      }}
                      updateList={this.updateGroupsList}
                      appendToList={this.appendToGroupsList}
                      iconURL={serviceResponse.pageIconURL}
                      pageTitle={serviceResponse.pageTitle}
                      filterType={this.props.params.filterType}
                      render={() => (
                        <Fragment>
                          {fetchingContent ? <div>Loading</div> : null}
                          {!fetchingContent && groups.length ?
                            <GroupTiles
                              updateReadingListInfo={this.updateReadingListInGroup}
                              groups={groups}
                              isMobile={context.isMobile}
                            /> :
                            <div>There are no groups.</div>}
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

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
