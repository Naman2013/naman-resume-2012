/***********************************
* V4 Object Details Overview Wrapper
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
  /*fetchObjectMissionsAction,
  fetchObjectQuestsAction,*/
} from '../../modules/object-details/actions';

const mapStateToProps = ({ objectDetails, appConfig, user }) => ({
  /*objectMissions: objectDetails.objectMissions,
  objectQuests: objectDetails.objectQuests,*/
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
class Overview extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillUpdate(nextProps) {

  }

  componentWillMount() {
    console.log(this.props)
    //console.log(objectData);
  }

  render() {
    const {
      params: {
        objectId,
      },
      objectData,
      objectDetails,
      /*objectMissions,
      objectQuests*/
    } = this.props;

    return (
      <div>
        <div className="contain">
          <ul>
            Details:
            <li>Object Type: ?</li>
            <li>Object Domain: {objectData.objectDomain}</li>
            <li>Object Constellation: {objectData.objectConstellation}</li>
            <li>Best Telescope: ?</li>
          </ul>
          <h2>{objectData.objectSubtitle}</h2>
          <p>{objectData.objectDescription}</p>
          <a href="#">Read More</a> <a href="#">Follow {objectData.objectTitle}</a>
        </div>

        <div className="contain">{objectData.objectTagline}</div>
        
        {objectData.objectAudioURL != '' &&
          <div className="contain">
            Audio Clip:<br/>
            <audio src={objectData.objectAudioURL} controls playsInline controlsList="nodownload"/>
          </div>
        }

        <div className="contain">
          Most Active Astromomers on {objectData.objectTitle}
        </div>

        <style jsx>{`
          .contain {
            margin: 5%;
            padding: 25px;
            background-color: #f2f2f2;
          }
          .contain ul {
            float: right;
            list-style: none;
          }
        `}</style>

      </div>
    )
  }
}
export default Overview;
Overview.propTypes = {
  params: PropTypes.shape({
    objectId: PropTypes.string,
  }).isRequired,
  actions: PropTypes.shape({ }).isRequired,
};

Overview.defaultProps = {
  actions: { },
  objectId: '',
};
