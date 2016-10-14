import React, { Component, PropTypes } from 'react';
import TelescopeCard from './telescope-card';

import style from './telescope-cards.scss';



/*
  @generateTelescopeStatus
  this function is needed to normalize the differences between the
  status object provided by the observatory call and the telescope
  status api's

  not all telescopes will be represented by the telescope status
  api, so we need to emulate that response to help reduce internal
  checks within the component

  note the different property names between both status and telescope
  we are not provided directly the obsId from this point in the data
  since the source is located elsewhere in the response from obs/list
*/
function generateTelescopeStatus(telescope) {
  return {
    index: telescope.teleIndex,
    obsId: null,
    telescopeId: telescope.teleId,
    teleUniqueId: telescope.teleUniqueId,
    onlineStatus: telescope.teleOnlineStatus,
  };
}



class TelescopeCards extends Component {

  renderTelescopeCards(obsTelescopes = []) {
    if( obsTelescopes.length === 0 ) {
      return null; //TODO: no telescope scenerio?
    }

    return obsTelescopes.map((telescope) => {
      const { statusTeleList } = this.props.observatoryTelecopeStatus.statusList;
      const { teleStatus, teleHasTelescopePage } = telescope;
      let telescopeStatus = statusTeleList
        .find(telescopeStatus => telescope.teleUniqueId === telescopeStatus.teleUniqueId);

      // if a status is provided by the status API, we use that - otherwise we generate one
      telescopeStatus = telescopeStatus ? telescopeStatus : generateTelescopeStatus(telescope);

      if(teleStatus !== 'live' && !teleHasTelescopePage) {
        return null;
      } else {
        return(
          <TelescopeCard
            key={ telescope.teleUniqueId }
            telescopeStatus={telescopeStatus}
            {...telescope} />
        );
      }
    });

  }

  render() {

    if(!this.props.observatory || !this.props.observatoryTelecopeStatus) {
      return null;
    }

    return(
      <div className="telescope-cards-container clearfix">
        <ul className="col-md-12 clearfix telescope-cards">
          { this.renderTelescopeCards( this.props.observatory.obsTelescopes ) }
        </ul>
      </div>
    );
  }
}

TelescopeCards.defaultProps = {
  observatoryTelecopeStatus: {},
};

TelescopeCards.propTypes = {
  obsTelescopes: PropTypes.array,
  observatoryTelecopeStatus: PropTypes.object,
};

export default TelescopeCards;
