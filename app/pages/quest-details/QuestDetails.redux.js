/***********************************
* V4 Quest Details State
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { DeviceContext } from 'providers/DeviceProvider';
import questActions from 'modules/quest-details/actions';
import { validateResponseAccess } from 'modules/authorization/actions';
import { START_QUEST } from 'services/quests'
import Quest from './QuestDetails';

const {
  shape,
  string,
  func,
} = PropTypes;

export class ConnectedQuestDetails extends Component {
  static propTypes = {
    actions: shape({
      fetchQuestPageMeta: func.isRequired,
    }),
    questId: string.isRequired,
  }

  static defaultProps = {
    actions: {},
  }

  state = {
  }

  componentDidMount() {
    const {
      actions,
      questId,
    } = this.props;
    actions.fetchQuestPageMeta({ questId });
  }

  setupQuest = () => {
    const { actions, questId } = this.props;
    const { at, token, cid } = this.props.user;
    axios.get(`${START_QUEST}?at=${at}&cid=${cid}&token=${token}&questId=${questId}`)
      .then((res) => {
        if (res.data.startedQuest) {
          this.goToStep(1);
        }
        actions.validateResponseAccess(res);
      });
  }

  goToStep = (num) => {
    const { questId } = this.props;
    browserHistory.push(`/quest-details/${questId}/${num}`);
  }

  render() {
    const userActions = {
      setupQuest: this.setupQuest,
    };

    return (
      <div className="root">
        <DeviceContext.Consumer>
          {context => (
            <Quest
              {...this.props}
              {...context}
              userActions={userActions}
            />
          )}
        </DeviceContext.Consumer>
      </div>
    );
  }
}

const mapStateToProps = ({
  questDetails,
  user,
}, { routeParams }) => ({
  questDetails,
  modal: questDetails.modal,
  pageMeta: questDetails.pageMeta,
  questId: routeParams.questId,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...questActions,
    validateResponseAccess,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedQuestDetails);
