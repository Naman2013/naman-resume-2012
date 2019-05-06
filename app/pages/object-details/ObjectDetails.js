/** *********************************
 * V4 Object Details Page
 *   Markdown support on elements????
 *   UTF-8 support....
 *   Multi-National Languages.....
 ********************************** */

import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchObjectDetailsAction,
  fetchObjectDataAction,
  fetchObjectSpecialistsAction,
  fetchImageDetailsAction,
} from '../../modules/object-details/actions';
import Navigation from '../../components/object-details/Navigation';
import style from './ObjectDetails.style';

const MAX_MVP_ASTRONOMERS = 3;

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
  actions: bindActionCreators(
    {
      fetchObjectDetailsAction,
      fetchObjectDataAction,
      fetchObjectSpecialistsAction,
      fetchImageDetailsAction,
    },
    dispatch
  ),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class ObjectDetails extends Component {
  static propTypes = {
    params: PropTypes.shape({
      objectId: PropTypes.string,
    }).isRequired,
    actions: PropTypes.shape({}).isRequired,
  };

  componentDidMount() {
    const {
      actions,
      objectDetails,
      params: { objectId },
    } = this.props;

    // Fetch the object-level meta data only if the objectId changes
    if (objectDetails.objectId !== objectId) {
      actions.fetchObjectDetailsAction(objectId);
      // customerImageId is coming from fetchObjectDataAction API call
      // and fetchImageDetailsAction should wait it from response
      actions.fetchObjectDataAction(objectId).then(() => {
        actions.fetchImageDetailsAction(
          this.props.objectData.featuredObservation.customerImageId
        );
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      actions,
      params: { objectId },
    } = nextProps;

    if (
      this.props.objectDetails.objectId !== nextProps.objectDetails.objectId
    ) {
      actions.fetchObjectSpecialistsAction(
        nextProps.objectDetails.objectId,
        MAX_MVP_ASTRONOMERS
      );
    }

    // Fetch the object details, the object page has been changed
    if (this.props.params.objectId !== nextProps.params.objectId) {
      actions.fetchObjectDetailsAction(objectId);
      // customerImageId is coming from fetchObjectDataAction API call
      // and fetchImageDetailsAction should wait it from response
      actions.fetchObjectDataAction(objectId).then(() => {
        actions.fetchImageDetailsAction(
          this.props.objectData.featuredObservation.customerImageId
        );
      });
    }
  }

  render() {
    const {
      params: { objectId },
      objectDetails: {
        objectTitle,
        objectSubtitle,
        objectIconURL,
        showFollowPromptFlag,
        followPrompt,
      },
      user,
      children,
    } = this.props;

    return (
      <div>
        <header className="header">
          <div className="icon" />
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
        <style jsx>{`
          .icon {
            mask-image: url(${objectIconURL});
          }
        `}</style>
      </div>
    );
  }
}

export default ObjectDetails;
