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
import GuideSection from 'components/guides/GuideSection';
import GuideBodyContent from 'components/guides/GuideBodyContent';
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

class AboutTab extends Component {
  static propTypes = {
    content: string,
    isDesktop: bool.isRequired,
    isScreenMedium: bool.isRequired,
    user: shape({
      at: oneOfType([number, string]),
      token: oneOfType([number, string]),
      cid: oneOfType([number, string]),
    }).isRequired,
  };

  static defaultProps = {
    content: '',
  };

  state = {

  }



  render() {
    const {
      content,
      isDesktop,
      isScreenMedium,
    } = this.props;

    const {

    } = this.state;

    return (
      <div>
        <LabeledTitleTiles
          theme={{ margin: '15px', backgroundColor: romance }}
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
        <GuideSection
          content={() => (<GuideBodyContent title="" content={content} theme={{ backgroundColor: romance }} />)}
        />
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default AboutTab;
