/***********************************
* V4 Object Details Page
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import has from 'lodash/has';
import {
  fetchObjectDataAction,
  fetchObjectMissionsAction,
} from '../../modules/object-details/actions';

const mapStateToProps = ({ objectMissions, objectDetails, appConfig, user }) => ({
  objectMissions: objectDetails.objectMissions,
  objectDetails,
  appConfig,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchObjectDataAction,
    fetchObjectMissionsAction,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class ObjectDetails extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.objectDetails.objectId != nextProps.objectDetails.objectId) {
      console.log('Object has been loaded.....gather more data....');
      this.props.actions.fetchObjectMissionsAction(nextProps.objectDetails.objectId);
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

    if (this.props.objectDetails.objectId != objectId) {
        //fetch the object-level meta data only if the objectId changes.
        this.props.actions.fetchObjectDataAction(objectId);
    }
  }

  render() {
    const {
      params: {
        objectId,
      },
      objectDetails,
      objectMissions,
    } = this.props;

    if (objectMissions) {
      console.log(objectMissions.missionsList);
    }
    return (

      <div style={{'marginLeft': '20px', 'marginRight': '20px', 'marginBottom': '20px'}}>
        <h1>Object ID: {objectId}</h1>
        <h1>{objectDetails.objectTitle}</h1>
        <br/>
        <h2>{objectDetails.objectDescription}</h2>
        <br/>
        <h3>{objectDetails.objectTagline}</h3>
        <br/>

        {objectDetails.objectAudioURL != '' &&
          <div>
            Audio Clip:<br/>
            <audio src={objectDetails.objectAudioURL} controls playsInline controlsList="nodownload"/>
          </div>
        }

        <hr/>

        <h2>Object Metadata</h2>
        {objectDetails && <div>
          <table style={{'border': '1', 'marginLeft': '100px'}}>
            <thead>
              <th style={{'width': '30%'}}>Attribute</th>
              <th>Value</th>
            </thead>
            <tbody>
              {Object.keys(objectDetails).map(function (key) {
                  /* exclude things like missionsList, etc. */
                  if ( typeof objectDetails[key] != 'object') {
                    return( <tr key={'row_' + key}>
                        <td style={{'width': '30%'}} key={'k_' + key}style={{'paddingTop': '5px', 'paddingBottom': '5px'}}>{key}</td>
                        <td key={'v_' + key}style={{'paddingTop': '5px', 'paddingBottom': '5px'}}>{objectDetails[key]}</td>
                      </tr>
                    );
                  }
                })
              }
            </tbody>
          </table>
        </div>
        }

        <br/>
        <br/>
        <h2>Object Missions</h2>
        {objectMissions && objectMissions.missionsList && <div>
          <table style={{'width': '100%', 'border': '1', 'marginLeft': '100px'}}>
            <thead>
              <th style={{'width': '20%'}}>Attribute</th>
              <th>Value</th>
            </thead>
            <tbody>
              {Object.keys(objectMissions).map(function (key) {
                  /* exclude things like missionsList, etc. */
                  if ( typeof objectMissions[key] != 'object') {
                    return( <tr key={'row_' + key}>
                        <td style={{'width': '20%', 'paddingTop': '5px', 'paddingBottom': '5px'}}>{key}</td>
                        <td key={'v_' + key}style={{'paddingTop': '5px', 'paddingBottom': '5px'}}>{objectMissions[key]}</td>
                      </tr>
                    );
                  }
                })
              }
              <tr key={'row_missionsList'}>
                <td colSpan="2">
                  <br/>
                  <h2>Missions List:</h2>
                  <table style={{'width': '100%', 'border': '1'}}>
                    <thead>
                      <th>Title</th>
                      <th>Can Join?</th>
                      <th>Icon</th>
                      <th>Date / Time</th>
                      <th>Telescope Details</th>
                      <th>Scheduled Mission ID</th>
                    </thead>
                    <tbody>
                      {Object.keys(objectMissions.missionsList).map(function(key) {
                        return(
                          <tr>
                            <td>{objectMissions.missionsList[key].title}</td>
                            <td>{objectMissions.missionsList[key].canJoinFlag} - {objectMissions.missionsList[key].joinPrompt}</td>
                            <td>{objectMissions.missionsList[key].iconURL}</td>
                            <td>
                              {objectMissions.missionsList[key].missionDetails.date.itemText} - {objectMissions.missionsList[key].missionDetails.time.itemText}<br/>
                              {objectMissions.missionsList[key].missionDetails.date.itemIconURL} - {objectMissions.missionsList[key].missionDetails.time.itemIconURL}<br/>
                            </td>
                            <td>
                              {objectMissions.missionsList[key].missionDetails.telescope.itemText}<br/>
                              {objectMissions.missionsList[key].missionDetails.telescope.itemIconURL}<br/>
                            </td>
                            <td>{objectMissions.missionsList[key].scheduledMissionId}</td>
                          </tr>
                        )
                       })
                      }
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        }
      </div>
    )
  }
}
export default ObjectDetails;
ObjectDetails.propTypes = {
  params: PropTypes.shape({
    objectId: PropTypes.string,
  }).isRequired,
  actions: PropTypes.shape({ }).isRequired,
};

ObjectDetails.defaultProps = {
  actions: { },
  objectId: '',
};
