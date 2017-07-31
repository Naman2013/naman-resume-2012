import React, { Component, cloneElement } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BrowseShowsNavigation from '../../components/video-viewer/BrowseShowsNavigation';
import OtherFeaturedObjects from '../../components/common/OtherFeaturedObjects/OtherFeaturedObjects';
import { backgroundImageCover } from '../../styles/mixins/utilities';
import { white } from '../../styles/variables/colors';

const NAV_ITEMS = [
  {
    title: 'Recent shows',
    link: '/shows/video-viewer/browse/recent-shows',
  },
  {
    title: 'Highlighted',
    link: '/shows/video-viewer/browse/highlighted',
  },
  {
    title: 'Upcoming shows',
    link: '/shows/video-viewer/browse/upcoming-shows',
  },
];

function mapStateToProps() {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
    }, dispatch),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class BrowseShows extends Component {

  render() {
    const { children } = this.props;
    return (
      <div>
        <header className="header">
          <h1 className="header-title">Browse Shows</h1>
        </header>
        <BrowseShowsNavigation
          navigationItems={NAV_ITEMS}
        />
        { cloneElement(children) }
        <OtherFeaturedObjects params={{ featuredType: 'videoViewer' }} layoutDirection="row" style={{ margin: 0 }} />
        <style jsx>{`
          .header {
            ${backgroundImageCover}
            background-image: url(https://vega.slooh.com/assets/images/photos/enigma.png);
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
