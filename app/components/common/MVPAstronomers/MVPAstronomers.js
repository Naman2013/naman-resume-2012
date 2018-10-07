
/***********************************
* MVP Astronomers
*
*
*
***********************************/


import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Request from 'components/common/network/Request';
import CenterColumn from '../CenterColumn/';
import style from './MVPAstronomers.style';
import { OBJECT_SPECIALISTS } from 'services/objects’;

const {
  bool,
  number,
  oneOfType,
  string,
} = PropTypes;

const mapStateToProps = ({
  user,
}) => ({
  user,
});

@connect(mapStateToProps, null)

class MVPAstronomers extends Component {
  static propTypes = {
    serviceUrl: string,
    slugLookupId: oneOfType([string, number])
  };
  static defaultProps = {
    serviceUrl: OBJECT_SPECIALISTS,
    slugLookupId: null,
  };

  render() {
    const {
      serviceUrl,
      user,
      slugLookupId,
    } = this.props;

    return (
      <Request
        authorizationRedirect={true}
        serviceURL={serviceUrl}
        method="POST"
        serviceExpiresFieldName="expires"
        requestBody={{
          cid: user.cid,
          token: user.token,
          at: user.at,
          slugLookupId,
        }}
        render={({
          fetchingContent,
          serviceResponse,
        }) => (
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
        )}
        />
      );
    }
  }
export default MVPAstronomers;
