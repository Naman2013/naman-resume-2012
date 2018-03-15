/***********************************
* V4 Object Details Page
*   Markdown support on elements????
*   UTF-8 support....
*   Multi-National Languages.....
***********************************/

import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import has from 'lodash/has';
import {
  fetchObjectDataAction,
  fetchObjectMissionsAction,
  fetchObjectQuestsAction,
} from '../../modules/object-details/actions';
import Navigation from '../../components/object-details/Navigation';

const mapStateToProps = ({ objectDetails, appConfig, user }) => ({
  objectMissions: objectDetails.objectMissions,
  objectQuests: objectDetails.objectQuests,
  objectData: objectDetails.objectData,
  appConfig,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchObjectDataAction,
    fetchObjectMissionsAction,
    fetchObjectQuestsAction,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class ObjectDetails extends Component {

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
    const {
      params: {
        objectId,
      }
    } = nextProps;

    if (this.props.objectData.objectId != nextProps.objectData.objectId) {
      //console.log('Object has been loaded.....gather more data....');
      this.props.actions.fetchObjectMissionsAction(nextProps.objectData.objectId);
      this.props.actions.fetchObjectQuestsAction(nextProps.objectData.objectId);
    }

    //console.log(this.props.params.objectId);
    //console.log(nextProps.objectData.objectId);

    //fetch the object data, the object page has been changed.
    if (this.props.params.objectId != nextProps.params.objectId) {
      this.props.actions.fetchObjectDataAction(objectId);
    }
  }

  componentWillUpdate(nextProps) {

  }

  componentWillMount() {
    const {
      params: {
        objectId,
      }
    } = this.props;

    console.log(this.props);

    if (this.props.objectData.objectId != objectId) {
        //fetch the object-level meta data only if the objectId changes.
        this.props.actions.fetchObjectDataAction(objectId);
    }
  }

  render() {
    const {
      params: {
        objectId,
      },
      children
    } = this.props;

    return (
      <div>
        <Navigation objectId={objectId} />
        {cloneElement(children)}
      </div>
    )
  }
}

export default ObjectDetails;
