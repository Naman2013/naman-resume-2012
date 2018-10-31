/***********************************
* V4 Quest Details State
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DeviceContext } from 'providers/DeviceProvider';
import questActions from 'modules/quest-details/actions';
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

  render() {
    return (
      <div className="root">
        <DeviceContext.Consumer>
          {context => (
            <Quest
              {...this.props}
              {...context}
            />
          )}
        </DeviceContext.Consumer>
      </div>
    );
  }
}

const mapStateToProps = ({
  questDetails,
}, { routeParams }) => ({
  questDetails,
  modal: questDetails.modal,
  pageMeta: questDetails.pageMeta,
  questId: routeParams.questId,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...questActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedQuestDetails);
