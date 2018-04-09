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
  fetchObjectDetailsAction,
  /*fetchObjectDataAction,
  fetchObjectMissionsAction,
  fetchObjectQuestsAction,*/
} from '../../modules/object-details/actions';
import Navigation from '../../components/object-details/Navigation';
import {
  darkBlueGray,
  white,
} from '../../styles/variables/colors';

const mapStateToProps = ({ objectDetails, appConfig, user }) => ({
  /*objectMissions: objectDetails.objectMissions,
  objectQuests: objectDetails.objectQuests,
  objectData: objectDetails.objectData,*/
  objectDetails: objectDetails.objectDetails,
  appConfig,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchObjectDetailsAction,
    /*fetchObjectDataAction,
    fetchObjectMissionsAction,
    fetchObjectQuestsAction,*/
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

    if (this.props.objectDetails.objectId != nextProps.objectDetails.objectId) {
      //console.log('Object has been loaded.....gather more data....');
      /*this.props.actions.fetchObjectMissionsAction(nextProps.objectDetails.objectId);
      this.props.actions.fetchObjectQuestsAction(nextProps.objectDetails.objectId);*/
    }

    // console.log(this.props.params.objectId);
    // console.log(nextProps.objectDetails.objectId); // NOTE : LOGGING AS "UNDEFINED"

    // fetch the object details, the object page has been changed.
    if (this.props.params.objectId != nextProps.params.objectId) {
      this.props.actions.fetchObjectDetailsAction(objectId);
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

    //console.log(this.props);

    if (this.props.objectDetails.objectId != objectId) {
        //fetch the object-level meta data only if the objectId changes.
        this.props.actions.fetchObjectDetailsAction(objectId);
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
      children
    } = this.props;

    //console.log (showFollowPromptFlag, followPrompt);

    return (
      <div>
        <header className="header">
          <div className="icon"></div>
          {objectTitle}
          <div className="subtitle">{objectSubtitle}</div>
          {!showFollowPromptFlag && 
            <div className="follow">Follow Object</div> 
          }      
        </header>
        <Navigation objectId={objectId} />
        {cloneElement(children)}
        <style jsx>{`
          .header {
            position: relative;
            height: 300px;
            width: 100%;
            background-color: ${darkBlueGray};
            color: ${white};
            text-transform: uppercase;
            padding: 5%;
            font-size: 45px;
          }
          .subtitle {
            font-size: 14px;
          }
          .follow {
            position: absolute;
            padding: 10px 5px;
            border: 1px solid ${white};
            font-size: 14px;
            width: 160px;
            text-align: center;
            left: 5%;
            bottom: 10%;
          }
          .icon {
            width: 150px;
            height: 150px;
            background-image: url(${objectIconURL});
            background-size: cover;
            float: right;
          }
        `}</style>
      </div>
    )
  }
}

export default ObjectDetails;
