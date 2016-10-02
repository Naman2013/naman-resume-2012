import React, { Component } from 'react';
import classnames from 'classnames';

// listing item building blocks
import DatesColumn from './partials/dates-column';
import ObjectInfo from './partials/object-info';
import ReserveBy from './partials/reserve-by';
import UserAvatar from './partials/user-avatar';
import UserInfo from './partials/user-info';
import SocialBar from './partials/social-bar';
import Piggyback from './partials/piggyback';
import HoldTime from './partials/hold-time';
import ReserveControllers from './partials/reserve-controllers';

import ConfigurationPanel from './configuration-panel';


export default class ListingsItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    };
  }

  onListingClickHandler = () => {
    const { props: { available } } = this;

    if (available) {
      this.setState({
        expanded: true
      });
    }
  };

  getConfigurationPanel = () => {
    if (!this.state.expanded) return;

    return (
      <ConfigurationPanel />
    );
  };

  render() {
    const itemState = classnames({
      'telescope-listings-item': true,
      'active': this.props.active,
      'available': this.props.available,
      'valid': this.props.valid,
      'on-hold': this.props.onHold,
      'expanded': this.state.expanded
    });

    const {
      date,
      available,      
      onHold
    } = this.props;

    return (
      <div className={itemState} onClick={this.onListingClickHandler}>
        <div className="row">
          <DatesColumn date={date}/>

          <ObjectInfo isAvailable={available} onHold={onHold}/>

          {
            getItemRightSection(available, shareOrPiggyBack(this.props))
          }          
        </div>

        {
          this.getConfigurationPanel()
        }
      </div>
    );
  }
}

function shareOrPiggyBack ({ piggyback, share, onHold }) {
  return () => {
    if (piggyback) {
      return (<Piggyback />);
    } else if (share) {
      return (<SocialBar />);
    } else {
      return (<HoldTime />);
    }
  }
}

function getItemRightSection(isAvailable, getLastSection) {
  if (isAvailable) {
    return (
      <ReserveControllers />
    );
  } else  {
    return (
      <div>
        <ReserveBy />

        <UserAvatar />

        <UserInfo />

        {
          getLastSection()
        }
      </div>      
    );
  }
}
