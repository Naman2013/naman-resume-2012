import React, { Component, PropTypes } from 'react';
import TelescopeCard from './telescope-card';

import style from './telescope-cards.scss';

class TelescopeCards extends Component {

  renderTelescopeCards(obsTelescopes = []) {
    if( obsTelescopes.length === 0 ) {
      return null; //TODO: no telescope scenerio?
    }

    return obsTelescopes.map((telescope) => {
      const { statusTeleList } = this.props.observatoryTelecopeStatus.statusList;
      const telescopeStatus = statusTeleList
        .find(telescopeStatus => telescope.teleUniqueId === telescopeStatus.teleUniqueId);

      if(!telescopeStatus) {
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
