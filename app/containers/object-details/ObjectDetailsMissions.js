/***********************************
* V4 Object Details : Upcoming Missions
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
  /*fetchObjectQuestsAction,*/
} from '../../modules/object-details/actions';

const mapStateToProps = ({ objectDetails, appConfig, user }) => ({
  objectMissions: objectDetails.objectMissions,
  /*objectQuests: objectDetails.objectQuests,*/
  objectData: objectDetails.objectData,
  appConfig,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchObjectDataAction,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class Missions extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillUpdate(nextProps) {

  }

  componentWillMount() {
    //console.log(this.props)
  }

  render() {
    const {
      params: {
        objectId,
      },
      objectData,
      objectDetails,
      objectMissions,
      /*objectQuests*/
    } = this.props;

    return (
      <div className="contain">

        <h4>{objectMissions.missionListTitle}</h4>
        {objectMissions && objectMissions.missionsList && <div>
          <table style={{'width': '100%', 'border': '1'}}>
            <tbody>  
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

        <style jsx>{`
          .contain {
            margin: 5%;
            padding: 25px;
            background-color: #f2f2f2;
          }
          h4 {
            text-transform: uppercase;
            font-weight: 600;
          }
        `}</style>

      </div>
    )
  }
}
export default Missions;

