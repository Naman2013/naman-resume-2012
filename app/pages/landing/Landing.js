import React from 'react';
import Hero from '../../components/landing/Hero';
import EventDescription from '../../components/landing/EventDescription';
import AboutEclipse from '../../components/landing/AboutEclipse';
import AboutRoadTripEvent from '../../components/landing/AboutRoadTripEvent';
import PartOfEvent from '../../components/landing/PartOfEvent';
import SloohSunglasses from '../../components/landing/SloohSunglasses';
import SolarEclipseGuide from '../../components/landing/SolarEclipseGuide';
import SloohRoadTrips from '../../components/landing/SloohRoadTrips';
import { black } from '../../styles/variables/colors';

function Landing() {
  return (
    <div className="landing-container">
      <Hero />
      <EventDescription />
      <AboutEclipse />
      <AboutRoadTripEvent />
      <PartOfEvent />
      <SloohSunglasses />
      <SolarEclipseGuide />
      <SloohRoadTrips />
      <style jsx>{`
        .landing-container {
          background-color: ${black};
        }
        `}</style>
    </div>
  );
}

export default Landing;
