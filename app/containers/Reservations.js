import React from 'react';
import MissionConfirmModal from '../components/missions/mission-confirm-modal';
import AnnouncementBanner from '../components/common/announcement-banner/announcement-banner';
import ReserveBanner from '../components/missions/reserve-banner';
import MissionNav from '../components/missions/mission-nav';


function Reservations({ route, location, children }) {
  return (
    <div>
      <div className="reservations clearfix">
        <MissionConfirmModal />
        <AnnouncementBanner level="general" />
        <ReserveBanner />
        <MissionNav route={route} location={location} />
        {children}
      </div>
    </div>
  );
}

export default Reservations;
