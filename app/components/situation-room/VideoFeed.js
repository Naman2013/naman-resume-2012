import React, { PropTypes } from 'react';
import SponsoredBy from '../common/sponsored-by';
import Countdown from '../../containers/Countdown';
import s from './live-social.scss';

const VideoFeed = ({
  videoInProgress,
  videoEmbedCode,
  eventTitle,
  hasSponsor,
  sponsorLogoURL,
  sponsorLinkURL,
}) => {
  return (
    <section className={s.liveView}>

      <header className={s.liveViewHeader}>
        <h2>{eventTitle}</h2>
        {
          hasSponsor ?
            <SponsoredBy
              sponsorLogoURL={sponsorLogoURL}
              sponsorLinkURL={sponsorLinkURL}
            /> : null
        }
      </header>

      <aside className={s.liveViewContent}>
        {
          videoInProgress ?
            <span dangerouslySetInnerHTML={{ __html: videoEmbedCode }} />
            :
            <Countdown size={150} className="live" lineWidth={10} />
        }

      </aside>

      <footer className={s.liveCameraTabs}>&nbsp;</footer>

    </section>

  );
};

VideoFeed.defaultProps = {
  videoInProgress: false,
  videoEmbedCode: null,
  eventTitle: '',
  hasSponsor: 0,
  sponsorLogoURL: '',
  sponsorLinkURL: '',
};

VideoFeed.propTypes = {
  videoInProgress: PropTypes.bool,
  videoEmbedCode: PropTypes.string,
  eventTitle: PropTypes.string,
  hasSponsor: PropTypes.number, // number 0 or 1 treated as boolean
  sponsorLogoURL: PropTypes.string,
  sponsorLinkURL: PropTypes.string,
};


export default VideoFeed;
