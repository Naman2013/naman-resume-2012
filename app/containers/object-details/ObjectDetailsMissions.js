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
  fetchObjectDetailsAction,
  fetchObjectMissionsAction,
} from '../../modules/object-details/actions';

const mapStateToProps = ({ objectDetails, appConfig, user }) => ({
  objectMissions: objectDetails.objectMissions,
  objectDetails: objectDetails.objectDetails,
  appConfig,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchObjectDetailsAction,
    fetchObjectMissionsAction,
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
      objectDetails,
      objectMissions,
    } = this.props;


    return (
      <div className="contain">

        <h4>{objectMissions.missionListTitle}</h4>
        {objectMissions && objectMissions.missionsCount > 0 ? (
          <div className="card-container__missions">
            {Object.keys(objectMissions.missionsList).map(function(key) {
              return(
                <div className="mission-card" key={'card_' + key}>                
                  <div className="mission-icon"><img src={objectMissions.missionsList[key].iconURL}/></div>
                  <h4>{objectMissions.missionsList[key].title}</h4>
                  {objectDetails.objectSubtitle}
                  <ul>
                    <li><img src={objectMissions.missionsList[key].missionDetails.date.itemiconURL}/>{objectMissions.missionsList[key].missionDetails.date.itemText}</li>
                    <li><img src={objectMissions.missionsList[key].missionDetails.time.itemiconURL}/>{objectMissions.missionsList[key].missionDetails.time.itemText}</li>
                    <li><img src={objectMissions.missionsList[key].missionDetails.telescope.itemiconURL}/>{objectMissions.missionsList[key].missionDetails.telescope.itemText}</li>
                  </ul>
                  {objectMissions.missionsList[key].canJoinFlag &&                 
                    <div className="mission-btn">{objectMissions.missionsList[key].joinPrompt}</div>
                  }
                </div>
              )
            })}
          </div>
        ) : (
          <div className="card-container__missions">
            Sorry, there are no mission available for {objectDetails.objectTitle} at this time.
          </div>
        )}

        <style jsx>{`
          h4 {
            font-weight: 600;
          }
          .contain {
            margin: 5%;
            padding: 25px;
            background-color: #f2f2f2;
            text-transform: uppercase;
          }
          .card-container__missions {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
          }
          .mission-card {
            font-size: 1em;
            background-color: white;
            padding: 25px;
            margin: 25px 0;
            min-width: 28%;
          }
          .mission-icon {
            background-color: #3C4A55;
            width: 70px;
            height: 70px;
            border-radius: 50%;
            padding: 10px;
          }
          .mission-card ul {
            list-style: none;
            padding: 0;
            margin: 15px 0;
          }
          .mission-card li {
            border-top: 1px solid;
            padding: 10px 0;
          }
          .mission-card li img {
            height: 1em;
            width: 1em;
            margin: -0.2em 1em 0 0;
          }
          .mission-btn {
            padding: 7px 10px;
            background-color: #3C4A55;
            width: 50%;
            border-radius: 19px;
            color: white;
            text-align: center;
            cursor: pointer;
          }
        `}</style>

      </div>
    )
  }
}
export default Missions;

