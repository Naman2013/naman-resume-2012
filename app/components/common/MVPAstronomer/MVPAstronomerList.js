
/***********************************
* MVP Astronomer List
***********************************/

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Request from '../network/Request';
import CenterColumn from '../CenterColumn';
import style from './MVPAstronomerList.style';
import { OBJECT_SPECIALISTS } from '../../../services/objects';

const {
  number,
  oneOfType,
  string,
} = PropTypes;

// const mapStateToProps = ({
//   user,
//   objectId
// }) => ({
//   user,
//   objectId
// });


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


//@connect(mapStateToProps, null)

class MVPAstronomerList extends Component {
  static propTypes = {
    serviceURL: string,
    objectId: oneOfType([string, number])
  };
  static defaultProps = {
    serviceURL: OBJECT_SPECIALISTS,
    objectId: null,
  };

  render() {
    const {
      serviceURL,
      user,
      objectId,
    } = this.props;

    console.log ('Hullo: ' + this.props.objectId);

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
            Hello
              {/* {(SPECIALISTS.specialistContent).map(function(key) {
                return(
                  <div className="mvp-card" key={'card_' + key}>MVP CARD</div>
                )
              })} */}

              {/*<MVPAstronomer {...SPECIALISTS.specialistContent} />*/}
            
            </CenterColumn>

            <style jsx>{style}</style>
          </Fragment>
        )}
      />
      );
    }
  }


export default MVPAstronomerList;
