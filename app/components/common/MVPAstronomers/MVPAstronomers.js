
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
import { OBJECT_SPECIALISTS } from 'services/objects';

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


const specialistsModel = {
  name: 'SPECIALISTS',
  model: resp => ({
    count: resp.specialistsCount,
    specialistContent: {
      id: resp.customerId,
      name: resp.displayName,
      avatarURL: resp.iconURL,
      gravityRank: resp.gravityRankLabel,
      linkFlag: resp.hasLinkFlag,
      linkURL: resp.linkURL,
    },
  }),
};


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
        model={specialistsModel}
        serviceURL={OBJECT_SPECIALISTS}
        requestBody={{ objectId }}
        render={({
          fetchingContent,
          modeledResponses: { SPECIALISTS },
        }) => !fetchingContent && (
          
          <Fragment>
              <CenterColumn>
                {SPECIALISTS.count > 0 ? (
                  <div className="card-container__mvp">
                    {(SPECIALISTS.specialistContent).map(function(key) {
                      return(
                        <div className="mvp-card" key={'card_' + key}>MVP CARD</div>
                        /*{<div className="mvp-card" key={'card_' + key}>
                          <div className="mvp-icon"><img src={objectSpecialists.specialistsList[key].iconURL}/></div>
                          <h5>{objectSpecialists.specialistsList[key].displayName}</h5>
                          {objectSpecialists.specialistsList[key].hasLinkFlag &&                 
                            <a className="mvp-btn" href={objectSpecialists.specialistsList[key].linkURL}>View Specialist</a>
                          }
                        </div>}*/
                      )
                    })}
                  </div>
                ) : (
                  <div className="card-container__specialists">
                    Sorry, there are no MVP Astronomers at this time.
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
