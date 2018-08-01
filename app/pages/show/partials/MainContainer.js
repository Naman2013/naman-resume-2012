/***********************************
* V4 Shows Main Container
* This will show the video on desktop
* on tablet and mobile, it will hold the content
* associated with the three tabbed nav.
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BigBoxInfoContainer from './BigBoxInfoContainer';
import { romance } from 'styles/variables/colors_tiles_v4';
import AboutTab from './AboutTab';
import CommentsTab from './CommentsTab';
import DetailsTab from './DetailsTab';
import styles from './MainContent.style';

const {
  any,
  arrayOf,
  bool,
  func,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

class LiveShowMainContent extends Component {
  static propTypes = {
    headerLabel: string,
    aboutIsActive: bool.isRequired,
    commentsIsActive: bool.isRequired,
    content: string,
    detailsIsActive: bool.isRequired,
    isDesktop: bool.isRequired,
    isScreenMedium: bool.isRequired,
    user: shape({
      at: oneOfType([number, string]),
      token: oneOfType([number, string]),
      cid: oneOfType([number, string]),
    }).isRequired,
  };

  static defaultProps = {
    headerLabel: '',
    content: '',
  };

  state = {

  }



  render() {
    const {
      aboutIsActive,
      commentsIsActive,
      content,
      detailsIsActive,
      isDesktop,
      isScreenMedium,
    } = this.props;

    const {

    } = this.state;

    return (
      <div className="root">
        {isDesktop ? (
          <div>
            <BigBoxInfoContainer {...this.props} headerLabel={this.props.headerLabel} />
          </div>
        ) : (
          <div>
            {aboutIsActive ?
              <AboutTab {...this.props} /> :
            null}
            {commentsIsActive ?
              <CommentsTab {...this.props} /> :
            null}
            {detailsIsActive ?
              <DetailsTab {...this.props} /> :
            null}
          </div>
        )}
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default LiveShowMainContent;
