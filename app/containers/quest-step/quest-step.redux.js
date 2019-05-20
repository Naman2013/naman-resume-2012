/***********************************
 * V4 Step [#] Pages for Quests - connected with redux
 ***********************************/

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DeviceContext } from 'providers/DeviceProvider';
import QuestStep from './quest-step';
import { validateResponseAccess } from 'app/modules/authorization/actions';
import questActions from 'app/modules/quest-details/actions';

const { bool, func, number, shape, string } = PropTypes;

class ConnectedQuestStep extends Component {
  static propTypes = {
    questId: string.isRequired,
    stepModuleId: string.isRequired,
  };

  static defaultProps = {};

  state = {};

  componentDidMount() {
    const { actions, questId, stepModuleId } = this.props;

    actions.fetchQuestStepPage({
      questId,
      stepModuleId,
    });
  }

  render() {
    const {} = this.state;

    const userActions = {};

    return (
      <Fragment>
        <DeviceContext.Consumer>
          {context => (
            <QuestStep {...this.props} {...context} userActions={userActions} />
          )}
        </DeviceContext.Consumer>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ user, questDetails }, { routeParams }) => ({
  user,
  modal: questDetails.modal,
  pageMeta: questDetails.step,
  questId: routeParams.questId,
  stepModuleId: routeParams.step,
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
)(ConnectedQuestStep);
