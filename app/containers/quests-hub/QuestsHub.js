import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { API } from 'app/api';
import noop from 'lodash/noop';
import { withTranslation } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import QuestTiles from 'app/components/quests-hub/quest-tiles';
import Request from 'app/components/common/network/Request';
import HubContainer from 'app/components/common/HubContainer';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import ShowMoreWithNetwork from 'app/components/common/show-more-with-network';
import {
  QUESTS_PAGE_ENDPOINT_URL,
  QUESTS_ENDPOINT_URL,
} from 'app/services/quests/quest-data';
import { DeviceContext } from 'providers/DeviceProvider';
import { validateResponseAccess } from 'app/modules/authorization/actions';
import { ACTION as questsActions } from '../../modules/quests/reducer';
import style from './quests-hub.style';

const COUNT = 9;
const DEFAULT_PAGE = 1;

const questsHubModel = {
  name: 'QUEST_HUB_MODEL',
  model: resp => ({
    filterOptions: [...resp.navigationConfig, ...[{
      "title": "My Quests",
      "linkURL": "/quests/myquests"
    }]],
    sortOptions: resp.filterOptions.options,
  }),
};
@withTranslation()
class Quests extends Component {
  static propTypes = {
    validateResponseAccess: PropTypes.func,
    params: PropTypes.shape({
      filterType: PropTypes.string,
    }),

    isFetching: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    validateResponseAccess: noop,
    params: {
      filterType: 'all',
    },
  };

  state = {
    quests: [],
    questsComingSoonMessage: '',
  };

  updateQuestsList = resData => {
    this.setState(() => ({
      quests: resData.questsList,
      questsComingSoonMessage: resData.questsComingSoonMessage,
    }));
  };

  updateReadingListInQuest = (id, resData) => {
    let newQuestsList = [].concat(this.state.quests);

    newQuestsList = newQuestsList.map(quest => {
      if (quest.questId === id) {
        return Object.assign(quest, resData);
      }
      return quest;
    });

    this.setState(() => ({
      quests: newQuestsList,
    }));
  };

  appendToQuestsList = resData => {
    this.setState(state => {
      const quests = [].concat(state.quests, resData.questsList);
      return {
        quests,
      };
    });
  };

  clearQuests = () => {
    this.setState({
      quests: [],
    });
  };

  render() {
    const { user, actions, t, isFetching } = this.props;
    const { quests, questsComingSoonMessage } = this.state;
    return (
      <div>
        <Request
          withoutUser
          serviceURL={QUESTS_PAGE_ENDPOINT_URL}
          model={questsHubModel}
          requestBody={{}}
          render={({
            fetchingContent,
            modeledResponses: { QUEST_HUB_MODEL },
            serviceResponse = {},
          }) => (
            <Fragment>
              {!fetchingContent && (
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
                      clearTiles={this.clearQuests}
                      hubActions={{
                        hubGetRequestStart: actions.getQuests,
                        hubGetRequestSuccess: actions.getQuestsSuccess,
                        hubGetRequestError: actions.getQuestsError,
                      }}
                      render={() => (
                        <Fragment>
                          {isFetching ? <div>{t('Hubs.loading')}</div> : null}
                          {!isFetching && (
                            <QuestTiles
                              updateReadingListInfo={
                                this.updateReadingListInQuest
                              }
                              quests={quests}
                              questsComingSoonMessage={questsComingSoonMessage}
                              isMobile={context.isMobile}
                            />
                          )}
                        </Fragment>
                      )}
                    />
                  )}
                </DeviceContext.Consumer>
              )}
            </Fragment>
          )}
        />
        <style jsx>{style}</style>
      </div>
    );
  }
}

const mapStateToProps = ({ user, quests }) => ({
  user,
  isFetching: quests.isFetching,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      validateResponseAccess,
      ...questsActions,
    },
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quests);
