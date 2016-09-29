import React, { Component } from 'react';
import classnames from 'classnames';

// listing item building blocks
import DatesColumn from './partials/dates-column';
import ObjectInfo from './partials/object-info';
import ReserveBy from './partials/reserve-by';
import UserAvatar from './partials/user-avatar';
import UserInfo from './partials/user-info';
import SocialBar from './partials/social-bar';
import ReserveControllers from './partials/reserve-controllers';

export default class ListingsItem extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const itemState = classnames({
      'telescope-listings-item': true,
      'active': this.props.active,
      'available': this.props.available,
      'valid': this.props.valid
    });

    return (
      <div className={itemState}>
        <div className="row">
          <DatesColumn date={this.props.date}/>

          <ObjectInfo isAvailable={this.props.available}/>


          {
            getItemRightSection(this.props.available)
          }
          
        </div>
      </div>
    );
  }
}

function getItemRightSection(isAvailable) {
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

        <SocialBar />
      </div>      
    );
  }
}
