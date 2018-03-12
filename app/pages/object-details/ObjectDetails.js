/***********************************
* V4 Object Details Page
*   Markdown support on elements????
*   UTF-8 support....
*   Multi-National Languages.....
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
  actions: bindActionCreators({
    fetchObjectDataAction,
    fetchObjectMissionsAction,
    fetchObjectQuestsAction,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class ObjectDetails extends Component {
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
      objectData,
      objectMissions,
      objectQuests
    } = this.props;

    return (

      <div style={{'marginLeft': '20px', 'marginRight': '20px', 'marginBottom': '20px'}}>
        <h1>Object ID: {objectId}</h1>
        <h1>{objectData.objectTitle}</h1>
        <br/>
        <h2>{objectData.objectDescription}</h2>
        <br/>
        <h3>{objectData.objectTagline}</h3>
        <br/>

        {objectData.objectAudioURL != '' &&
          <div>
            Audio Clip:<br/>
            <audio src={objectData.objectAudioURL} controls playsInline controlsList="nodownload"/>
          </div>
        }

        <hr/>

        <h2>Object Metadata</h2>
        {objectData && <div>
          <table style={{'border': '1', 'marginLeft': '100px'}}>
            <thead>
              <th style={{'width': '30%'}}>Attribute</th>
              <th>Value</th>
            </thead>
            <tbody>
              {Object.keys(objectData).map(function (key) {
                  /* exclude things like missionsList, etc. */
                  if ( typeof objectData[key] != 'object') {
                    var val = new String(objectData[key]);
                    var idxImg = val.indexOf('.svg');

                    return( <tr key={'row_' + key}>
                        <td style={{'width': '30%'}} key={'k_' + key}style={{'paddingTop': '5px', 'paddingBottom': '5px'}}>{key}</td>
                        <td key={'v_' + key}style={{'paddingTop': '5px', 'paddingBottom': '5px'}}>
                          {idxImg > 0 &&
                            <div>
                              <img style={{'backgroundColor': 'black'}} src={objectData[key]}/><br/>
                            </div>
                          }
                          {objectData[key]}
                        </td>
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
        <h2>Object Quests</h2>
        {objectQuests && objectQuests.questsList && <div>
          <table style={{'width': '100%', 'border': '1', 'marginLeft': '100px'}}>
            <thead>
              <th style={{'width': '20%'}}>Attribute</th>
              <th>Value</th>
            </thead>
            <tbody>
              {Object.keys(objectQuests).map(function (key) {
                  /* exclude things like questsList, etc. */
                  if ( typeof objectQuests[key] != 'object') {

                    var val = new String(objectData[key]);
                    var idxImg = val.indexOf('.svg');

                    return( <tr key={'row_' + key}>
                        <td style={{'width': '20%', 'paddingTop': '5px', 'paddingBottom': '5px'}}>{key}</td>
                        <td key={'v_' + key}style={{'paddingTop': '5px', 'paddingBottom': '5px'}}>
                          {idxImg > 0 &&
                            <div>
                              <img style={{'backgroundColor': 'black'}} src={objectData[key]}/><br/>
                            </div>
                          }
                          {objectData[key]}
                        </td>
                      </tr>
                    );
                  }
                })
              }

              {objectQuests && objectQuests.questsCount > 0 &&
                <tr key={'row_questsList'}>
                  <td colSpan="2">
                    <br/>
                    <h2>{objectQuests.questListTitle}</h2>
                    <table style={{'width': '100%', 'border': '1'}}>
                      <thead>
                        <th>Title</th>
                        <th>Label</th>
                        <th>Link Label</th>
                        <th>Icon URL</th>
                        <th>Quest ID</th>
                      </thead>
                      <tbody>
                        {Object.keys(objectQuests.questsList).map(function(key) {
                          return(
                            <tr>
                              <td>{objectQuests.questsList[key].title}</td>
                              <td>{objectQuests.questsList[key].label}</td>
                              <td>{objectQuests.questsList[key].linkLabel}</td>
                              <td><div>
                                    <img style={{'backgroundColor': 'black'}} src={objectQuests.questsList[key].iconUrl}/><br/>
                                    {objectQuests.questsList[key].iconUrl}
                                  </div>
                              </td>
                              <td>{objectQuests.questsList[key].questId}</td>
                            </tr>
                          )
                         })
                        }
                      </tbody>
                    </table>
                  </td>
                </tr>
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
                        <td key={'k_' + key} style={{'width': '20%', 'paddingTop': '5px', 'paddingBottom': '5px'}}>{key}</td>
                        <td key={'v_' + key} style={{'paddingTop': '5px', 'paddingBottom': '5px'}}>{objectMissions[key]}</td>
                      </tr>
                    );
                  }
                })
              }

              {objectMissions && objectMissions.missionsCount > 0 &&
                <tr key={'row_missionsList'}>
                  <td colSpan="2">
                    <br/>
                    <h2>{objectMissions.missionListTitle}</h2>
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
                              <td><div>
                                    <img style={{'backgroundColor': 'black'}} src={objectMissions.missionsList[key].iconURL}/><br/>
                                    {objectMissions.missionsList[key].iconURL}
                                  </div>
                              </td>
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
              }


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
