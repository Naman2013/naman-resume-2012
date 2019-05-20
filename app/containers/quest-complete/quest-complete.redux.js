/***********************************
 * V4 Completed Pages for Quests - connected with redux
 ***********************************/

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DeviceContext } from 'providers/DeviceProvider';
import QuestCompleted from './quest-complete';
import { validateResponseAccess } from 'app/modules/authorization/actions';
import questActions from 'app/modules/quest-details/actions';

const { bool, func, number, shape, string } = PropTypes;

class ConnectedQuestComplete extends Component {
  static propTypes = {
    questId: string.isRequired,
    moduleId: string.isRequired,
  };

  static defaultProps = {};

  state = {};

  componentDidMount() {
    const { actions, questId, moduleId } = this.props;

    actions.fetchQuestPageMeta({ questId });

    actions.fetchQuestCompleteOverview({
      questId,
      moduleId,
    });
  }

  render() {
    const {} = this.state;

    const userActions = {};

    console.log(this.props);
    return (
      <Fragment>
        <DeviceContext.Consumer>
          {context => (
            <QuestCompleted
              {...this.props}
              {...context}
              userActions={userActions}
            />
          )}
        </DeviceContext.Consumer>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ user, questDetails }, { routeParams }) => ({
  user,
  modal: questDetails.modal,
  pageMeta: questDetails.pageMeta,
  complete: questDetails.complete,
  questId: routeParams.questId,
  moduleId: questDetails.pageMeta.moduleId,
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
)(ConnectedQuestComplete);
