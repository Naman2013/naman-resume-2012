
/* MVP Astronomers */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {  
  fetchObjectSpecialistsAction 
} from '../../../modules/object-details/actions';
import CenterColumn from '../CenterColumn/';
import style from './MVPAstronomers.style';

const mapStateToProps = ({ objectDetails }) => ({
  objectSpecialists: objectDetails.objectSpecialists,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchObjectSpecialistsAction
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)

class MVPAstronomers extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    //console.log(this.props);
  }

  render() {
    const {
      params: {
        objectId,
      },
      objectSpecialists,
    } = this.props;

    return (
      <Fragment>
          <CenterColumn>
            {objectSpecialists && objectSpecialists.specialistsCount > 0 ? (
              <div className="card-container__mvp">
                {Object.keys(objectSpecialists.specialistsList).map(function(key) {
                  return(
                    <div className="mvp-card" key={'card_' + key}>
                      <div className="mvp-icon"><img src={objectSpecialists.specialistsList[key].iconURL}/></div>
                      <h5>{objectSpecialists.specialistsList[key].displayName}</h5>
                      {objectSpecialists.specialistsList[key].hasLinkFlag &&                 
                        <a className="mvp-btn" href={objectSpecialists.specialistsList[key].linkURL}>View Specialist</a>
                      }
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="card-container__specialists">
                Sorry, there are no MVP Astronomers available at this time.
              </div>
            )}
          </CenterColumn>
        <style jsx>{style}</style>
      </Fragment>
    )
  }
}
export default MVPAstronomers;

MVPAstronomers.propTypes = {
  params: PropTypes.shape({
    objectId: PropTypes.string,
  }).isRequired,
  actions: PropTypes.shape({ }).isRequired,
};

MVPAstronomers.defaultProps = {
  actions: { },
  objectId: '',
};
