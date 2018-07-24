/***********************************
* V4 Object Details Overview
*   Markdown support on elements????
*   UTF-8 support....
*   Multi-National Languages.....
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
  fetchObjectDataAction, 
  fetchObjectSpecialistsAction 
} from '../../modules/object-details/actions';
import CenterColumn from 'components/common/CenterColumn';
import style from './ObjectDetailsOverview.style';

const mapStateToProps = ({ objectDetails, appConfig, user }) => ({
  objectData: objectDetails.objectData,
  objectSpecialists: objectDetails.objectSpecialists,
  appConfig,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchObjectDataAction,
    fetchObjectSpecialistsAction
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
    //console.log(this.props);
  }

  render() {
    const {
      params: {
        objectId,
      },
      objectData,
      objectSpecialists,
    } = this.props;

    return (
      <div>

        <CenterColumn widths={['620px', '940px', '940px']}>
        <h1>{objectData.objectSubtitle}</h1>
          <ul>
            Details:
            <li>Object Type: ?</li>
            <li>Object Domain: {objectData.objectDomain}</li>
            <li>Object Constellation: {objectData.objectConstellation}</li>
            <li>Best Telescope: ?</li>
          </ul>          
          <p>{objectData.objectDescription}</p>
          <a href="#">Read More + </a> <a href="#">Follow {objectData.objectTitle}</a>
        </CenterColumn>

        <div className="contain">Fun fact: {objectData.objectTagline}</div>
        
        {objectData.objectAudioURL !== "" &&
          <div className="contain">
            Audio Clip:<br/>
            <audio src={objectData.objectAudioURL} controls playsInline controlsList="nodownload"/>
          </div>
        }


        <div className="contain">
          <h4>Most Active Astronomers on {objectData.objectTitle}</h4>
          {objectSpecialists && objectSpecialists.specialistsCount > 0 ? (
            <div className="card-container__specialists">
              {Object.keys(objectSpecialists.specialistsList).map(function(key) {
                return(
                  <div className="specialists-card" key={'card_' + key}>
                    <div className="specialists-icon"><img src={objectSpecialists.specialistsList[key].iconURL}/></div>
                    <h5>{objectSpecialists.specialistsList[key].displayName}</h5>
                    {objectSpecialists.specialistsList[key].hasLinkFlag &&                 
                      <a className="specialists-btn" href={objectSpecialists.specialistsList[key].linkURL}>View Specialist</a>
                    }
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="card-container__specialists">
              Sorry, there are no specialists available at this time.
            </div>
          )}
        </div>
        <style jsx>{style}</style>
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
