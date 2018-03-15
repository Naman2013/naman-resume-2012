/***********************************
* V4 Ask an Astronomer Wrapper
*   Markdown support on elements????
*   UTF-8 support....
*   Multi-National Languages.....
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import {
  fetchObjectDataAction,
  fetchObjectMissionsAction,
  fetchObjectQuestsAction,
} from '../../modules/object-details/actions';

const mapStateToProps = ({ objectDetails, appConfig, user }) => ({
  objectMissions: objectDetails.objectMissions,
  objectQuests: objectDetails.objectQuests,
  objectData: objectDetails.objectData,
  appConfig,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({}, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class AskAstronomer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      objectId: PropTypes.string,
    }).isRequired,
    actions: PropTypes.shape({ }).isRequired,
  }

  static defaultProps = {
    actions: { },
    objectId: '',
  }
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillUpdate(nextProps) {

  }

  componentWillMount() {
    console.log(this.props)
  }

  render() {
    const {
      params: {
        objectId,
      },
      objectData,
      objectMissions,
      objectQuests
    } = this.props;

    return (
      <div>
        
      </div>
    )
  }
}

export default AskAstronomer;
