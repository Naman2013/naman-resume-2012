/***********************************
 * V4 Quest Details State
 *
 *
 *
 ***********************************/

import { withHandleRedirect } from 'app/modules/quests/hoc/with-handle-redirect';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { API } from 'app/api';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { DeviceContext } from 'providers/DeviceProvider';
import questActions from 'app/modules/quest-details/actions';
import { validateResponseAccess } from 'app/modules/authorization/actions';
import { setQuestCompleted } from 'app/modules/quests/thunks';
import { START_QUEST } from 'app/services/quests';
import { Spinner } from 'app/components/spinner/index';
import Quest from './QuestDetails';

const { func, number, oneOfType, shape, string } = PropTypes;
const BADGE_ITEM_TYPE = 'badge';

@withHandleRedirect
export class ConnectedQuestDetails extends Component {
  static propTypes = {
    actions: shape({
      fetchQuestPageMeta: func.isRequired,
    }),
    questId: string.isRequired,
    user: shape({
      at: oneOfType([number, string]),
      token: oneOfType([number, string]),
      cid: oneOfType([number, string]),
    }),
  };

  static defaultProps = {
    actions: {},
    user: {},
  };

  state = {
    isLoading: false,
    questPdfUrl: null,
  };

  startLoading = () => this.setState({ isLoading: true });

  stopLoading = () => this.setState({ isLoading: false });

  componentDidMount() {
    const { actions, questId } = this.props;
    let accessorCustomerId = 414670;
    let requestedCustomerId = 49;
    actions.fetchQuestPageMeta({ questId }).then(this.handleResponse);
    actions.downloadQuestReport({questId,accessorCustomerId,requestedCustomerId}).then(this.QuestReportResponse);
  }


  QuestReportResponse = (questReporData) =>  {
      let questPdfUrl = questReporData.data.questPdfUrl;
      this.setState({ questPdfUrl });
  }

  handleResponse = () => {
    const { handleRedirect, pageMeta, location } = this.props;
    const { state } = location
    handleRedirect(pageMeta);
    if(pageMeta.showStartQuestButton && state && state.start){     
      this.setupQuest();
    }      
    if(!pageMeta.completed && pageMeta.allStepsAreComplete && state && state.claimBadge){
      this.goToStep( 0, "badge" );
    }
  };

  setupQuest = () => {
    const { actions, questId } = this.props;
    const { at, token, cid } = this.props.user;
    this.startLoading();
    return API.post(START_QUEST, {
        at,
        cid,
        token,
        questId,
      })
      .then(res => {
        const { actions, questId } = this.props;
        actions.fetchQuestPageMeta({ questId }).then(() => {
          this.stopLoading();
        });
      });
  };

  goToStep = (stepId, type) => {   
    const { questId, pageMeta, actions } = this.props;
    const { setQuestCompleted } = actions;
    const { questCompletionList, stepList } = pageMeta;

    if (type === BADGE_ITEM_TYPE) {
      const callSetQuestCompleted = stepList[stepList.length - 1];
      const moduleId = questCompletionList[0].questCompletionModuleId;
      setQuestCompleted({
        questId,
        callSetQuestCompleted,
        moduleId,
      });
    } else {
      browserHistory.push(`/quest-details/${questId}/${stepId}`);
    }
  };

  render() {
    const userActions = {
      setupQuest: this.setupQuest,
      goToStep: this.goToStep,
    };

    const { isLoading } = this.state;

    return (
      <div className="root">
        <Spinner loading={isLoading} />
        <DeviceContext.Consumer>
          {context => (
            <Quest {...this.props} {...context} userActions={userActions} questPdfUrl={this.state.questPdfUrl} />
          )}
        </DeviceContext.Consumer>
      </div>
    );
  }
}

const mapStateToProps = ({ questDetails, user }, { routeParams }) => ({
  questDetails,
  modal: questDetails.modal,
  pageMeta: questDetails.pageMeta,
  questId: routeParams.questId,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...questActions,
      validateResponseAccess,
      setQuestCompleted,
    },
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedQuestDetails);
