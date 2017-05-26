import React, { Component } from 'react';
import BrowseShowsNavigation from '../../components/video-viewer/BrowseShowsNavigation';
import SloohRecommends from '../../components/common/recommendations/SloohRecommends';
import { backgroundImageCover } from '../../styles/mixins/utilities';
import { white } from '../../styles/variables/colors';

const NAV_ITEMS = [
  {
    title: 'Recent shows',
    link: '/shows/video-viewer/browse/recent-shows',
  },
  {
    title: 'Slooh motion',
    link: '/shows/video-viewer/browse/slooh-motion',
  },
  {
    title: 'Upcoming shows',
    link: '/shows/video-viewer/browse/upcoming-shows',
  },
];

class BrowseShows extends Component {

  render() {
    return (
      <div>
        <header className="header">
          <h1 className="header-title">Browse Shows</h1>
        </header>
        <BrowseShowsNavigation
          navigationItems={NAV_ITEMS}
        />
        <SloohRecommends
          title="Slooh Recommends These Objects"
          subTitle="Reserve a mission by clicking below on these visible objects..."
          recommendations={[6, 94]}
        /> : null
        <style jsx>{`
          .header {
            ${backgroundImageCover}
            background-image: url(../../../assets/images/photos/enigma.png);
            color: ${white};
            width: 100%;
            height: 140px;
            margin-top: -20px;
            position: relative;
          }

          .header-title {
            position: absolute;
            bottom: 5px;
            left: 20px;
            text-transform: uppercase;
          }
        `}</style>
      </div>
    );
  }
}


export default BrowseShows;
