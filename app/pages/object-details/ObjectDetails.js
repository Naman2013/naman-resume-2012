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
import {
  fetchObjectDetailsAction,
  fetchObjectDataAction,
  fetchObjectMissionsAction,
  fetchObjectQuestsAction,
  fetchObjectSpecialistsAction
} from '../../modules/object-details/actions';
import Navigation from '../../components/object-details/Navigation';
import FollowObject from '../../components/object-details/FollowObject';
import style from './ObjectDetails.style';



const mapStateToProps = ({ objectDetails, appConfig, user }) => ({
  objectMissions: objectDetails.objectMissions,
  objectQuests: objectDetails.objectQuests,
  objectData: objectDetails.objectData,
  objectDetails: objectDetails.objectDetails,
  objectSpecialists: objectDetails.objectSpecialists,
  appConfig,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchObjectDetailsAction,
    fetchObjectDataAction,
    fetchObjectMissionsAction,
    fetchObjectQuestsAction,
    fetchObjectSpecialistsAction,
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

  constructor(props) {
    super(props);

    const { params: { objectId } } = this.props;

    if (this.props.objectDetails.objectId != objectId) {
      // fetch the object-level meta data only if the objectId changes.
      this.props.actions.fetchObjectDetailsAction(objectId);
      this.props.actions.fetchObjectDataAction(objectId);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { params: { objectId } } = nextProps;

    if (this.props.objectDetails.objectId != nextProps.objectDetails.objectId) {
      this.props.actions.fetchObjectMissionsAction(nextProps.objectDetails.objectId);
      this.props.actions.fetchObjectQuestsAction(nextProps.objectDetails.objectId);
      this.props.actions.fetchObjectSpecialistsAction(nextProps.objectDetails.objectId);
    }

    // fetch the object details, the object page has been changed.
    if (this.props.params.objectId != nextProps.params.objectId) {
      this.props.actions.fetchObjectDetailsAction(objectId);
      this.props.actions.fetchObjectDataAction(objectId);
    }
  }

  render() {
    const {
      params: {
        objectId,
      },
      objectDetails: {
        objectTitle,
        objectSubtitle,
        objectIconURL,
        showFollowPromptFlag,
        followPrompt,
      },
      user,
      children
    } = this.props;

    return (
      <div>
        <header className="header">
          <div className="icon"></div>
          {objectTitle}
          {/*
          <div className="subtitle">{objectSubtitle}</div>
          {showFollowPromptFlag &&
            <FollowObject
              objectId={objectId}
              user={user}
              prompt={followPrompt}
            />
          }
          */}
        </header>
        <Navigation objectId={objectId} />
        {cloneElement(children)}
        <style jsx>{style}</style>
        <style jsx>{`.icon { mask-image: url(${objectIconURL}); } `}</style>
      </div>
    )
  }
}

export default ObjectDetails;
