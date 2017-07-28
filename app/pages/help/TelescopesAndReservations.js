import React from 'react';
import { Link } from 'react-router';
import './Help.scss';

const TelescopesAndReservations = () => (
  <div>
    <div className="help-page-header">
      <h1 className="help-page-title">Telescopes and Reservations</h1>
      <Link to="about/contact" className="button btn-primary help-page-button">
        Contact Us
      </Link>
    </div>
    <div className="help-page-inner">
      <div className="help-page-section">
        <div className="help-page-paragraph">We know you want to see outer space for yourself, so here’s how Slooh makes that happen. We’ve installed several telescopes in the Canary Islands and Chile, each of which is specialized to feature certain types of celestial objects. Weather permitting, the telescopes are live all night, every night of the year. They are fully robotic, so they even work Christmas. Every 5 to 10 minutes, each telescope features a new object in the sky, what we call a “mission”, as determined by a Slooh Apprentice or Astronomer member via the reservation system. All members get to look on regardless of who is in control, so all members see all missions. And of course you can control the telescopes yourself by making your own reservations.</div>
        <div className="help-page-paragraph">Members can take photos during any mission. You can take photos by watching a mission live and clicking the camera icon below the telescope feed, which will result in photos from that mission being saved in “My Pics”. Making a reservation or ‘piggybacking’ on another member’s existing reservation will result in photos from that mission automatically being saved in “My Pics”, even if you are not able to watch the mission live.</div>
      </div>
    </div>
  </div>
);

export default TelescopesAndReservations;
