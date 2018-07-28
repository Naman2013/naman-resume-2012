/***********************************
* V4 Shows Main Container
* This will show the video on desktop
* on tablet and mobile, it will hold the content
* associated with the three tabbed nav.
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BigBoxInfoContainer from './BigBoxInfoContainer';
import LabeledTitleTiles from 'components/common/style/LabeledTitleTiles';
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
    aboutIsActive: bool.isRequired,
    commentsIsActive: bool.isRequired,
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
  };

  state = {

  }



  render() {
    const {
      aboutIsActive,
      commentsIsActive,
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
            <BigBoxInfoContainer {...this.props} />
          </div>
        ) : (
          <div>
            {aboutIsActive ?
              (<div>
                <LabeledTitleTiles
                  theme={{ margin: '15px' }}
                  tiles={{
                    Host: {
                      text: 'Paul Cox',
                      label: 'Host:',
                    },
                    'Watch Time': {
                      text: '45 Minutes',
                      label: 'Watch Time:',
                    },
                    Subject: {
                      text: 'Constellations',
                      label: 'Subject:',
                    },
                  }}
                  direction="column"
                />
              </div>) :
            null}

          </div>
        )}
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default LiveShowMainContent;
