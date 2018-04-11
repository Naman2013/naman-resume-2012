/***********************************
* V4 Object Details : Quests
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
  fetchObjectQuestsAction,
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
    fetchObjectQuestsAction,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class Quests extends Component {
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
      objectQuests,
    } = this.props;


    return (
      <div className="contain">

        <h4>Related Quests: {objectDetails.objectTitle}</h4>
        {objectQuests && objectQuests.questsCount > 0 ? (
          <div className="card-container__quests">
            {Object.keys(objectQuests.questsList).map(function(key) {
              return(
                <div className="quest-card" key={'card_' + key}>
                  {objectQuests.questsList[key].label}
                  <h4>{objectQuests.questsList[key].title}</h4>
                  <div className="quest-icon"><img src={objectQuests.questsList[key].iconURL}/></div>               
                  <div className="quest-btn">{objectQuests.questsList[key].linkLabel}</div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="card-container__quests">
            Sorry, there are no quests available for {objectDetails.objectTitle} at this time.
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
          .card-container__quests {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
          }
          .quest-card {
            font-size: 1em;
            background-color: #3E4B5C;
            padding: 25px;
            margin: 25px 0;
            min-width: 28%;
            text-align: center;
          }
          .quest-icon {
            background-color: #1E2631;
            width: 70px;
            height: 70px;
            border-radius: 50%;
            padding: 10px;
            margin: 0 auto;
          }
          .quest-btn {
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
export default Quests;

