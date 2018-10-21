import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import noop from 'lodash/noop';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import QuestTiles from 'components/quests-hub/quest-tiles';
import Request from 'components/common/network/Request';
import HubContainer from 'components/common/HubContainer';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import ShowMoreWithNetwork from 'components/common/show-more-with-network';
import { QUESTS_PAGE_ENDPOINT_URL, QUESTS_ENDPOINT_URL } from 'services/quests/quest-data';
import { DeviceContext } from 'providers/DeviceProvider';
import { validateResponseAccess } from 'modules/authorization/actions'
import style from './quests-hub.style';

const COUNT = 9;
const DEFAULT_PAGE = 1;


const questsHubModel = {
  name: 'QUEST_HUB_MODEL',
  model: resp => ({
    filterOptions: resp.navigationConfig,
    sortOptions: resp.filterOptions.options,
  }),
};

class Quests extends Component {
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
    quests: [],
  };

  updateQuestsList = (resData) => {
    this.setState(() => ({
      quests: resData.questsList,
    }));
  }

  updateReadingListInQuest = (id, resData) => {
    let newQuestsList = [].concat(this.state.quests);

    newQuestsList = newQuestsList.map((quest) => {
      if (quest.questId === id) {
        return Object.assign(quest, resData);
      }
      return quest;
    });

    this.setState(() => ({
      quests: newQuestsList,
    }));
  }

  appendToQuestsList = (resData) => {
    this.setState((state) => {
      const quests = [].concat(state.quests, resData.questsList)
      return {
        quests
      };
    });
  }

  render() {
    const {
      user,
      actions,
    } = this.props;
    const {
      quests
    } = this.state;
    return (<div>
      <Request
        serviceURL={QUESTS_PAGE_ENDPOINT_URL}
        model={questsHubModel}
        requestBody={{}}
        render={({
          fetchingContent,
          modeledResponses: { QUEST_HUB_MODEL },
          serviceResponse = {},
        }) => (
          <Fragment>
            {
              !fetchingContent &&
                <DeviceContext.Consumer>
                  {context => (
                    <HubContainer
                      {...this.props}
                      {...QUEST_HUB_MODEL}
                      {...context}
                      hubName="quests"
                      paginateURL={QUESTS_ENDPOINT_URL}
                      page={DEFAULT_PAGE}
                      count={COUNT}
                      user={user}
                      validateResponseAccess={actions.validateResponseAccess}
                      responseFieldNames={{
                        currentCount: 'questsCount',
                        totalCount: 'totalQuestsCount',
                      }}
                      updateList={this.updateQuestsList}
                      appendToList={this.appendToQuestsList}
                      iconURL={serviceResponse.pageIconURL}
                      pageTitle={serviceResponse.pageTitle}
                      filterType={this.props.params.filterType}
                      render={() => (
                        <Fragment>
                          {fetchingContent ? <div>Loading</div> : null}
                          {!fetchingContent && quests.length ?
                            <QuestTiles
                              updateReadingListInfo={this.updateReadingListInQuest}
                              quests={quests}
                              isMobile={context.isMobile}
                            /> :
                            <div>There are no quests.</div>}
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

export default connect(mapStateToProps, mapDispatchToProps)(Quests);
