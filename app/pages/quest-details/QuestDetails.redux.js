/***********************************
 * V4 Quest Details State
 *
 *
 *
 ***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { API } from 'app/api';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { DeviceContext } from 'providers/DeviceProvider';
import questActions from 'app/modules/quest-details/actions';
import { validateResponseAccess } from 'app/modules/authorization/actions';
import { START_QUEST } from 'app/services/quests';
import Quest from './QuestDetails';

const { func, number, oneOfType, shape, string } = PropTypes;

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

  state = {};

  componentDidMount() {
    const { actions, questId } = this.props;
    actions.fetchQuestPageMeta({ questId });
  }

  setupQuest = () => {
    const { actions, questId } = this.props;
    const { at, token, cid } = this.props.user;
    API
      .post(START_QUEST, {
        at,
        cid,
        token,
        questId,
      })
      .then(res => {
        if (res.data.startedQuest) {
          this.goToStep(1);
        }
        actions.validateResponseAccess(res);
      });
  };

  goToStep = stepId => {
    const { questId } = this.props;
    browserHistory.push(`/quest-details/${questId}/${stepId}`);
  };

  render() {
    const userActions = {
      setupQuest: this.setupQuest,
      goToStep: this.goToStep,
    };

    return (
      <div className="root">
        <DeviceContext.Consumer>
          {context => (
            <Quest {...this.props} {...context} userActions={userActions} />
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
    },
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedQuestDetails);
