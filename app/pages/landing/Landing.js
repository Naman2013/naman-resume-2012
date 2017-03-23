import React from 'react';
import Hero from '../../components/landing/Hero';
import EventDescription from '../../components/landing/EventDescription';
import AboutEclipse from '../../components/landing/AboutEclipse';
import AboutRoadTripEvent from '../../components/landing/AboutRoadTripEvent';
import PartOfEvent from '../../components/landing/PartOfEvent';
import SloohSunglasses from '../../components/landing/SloohSunglasses';
import SolarEclipseGuide from '../../components/landing/SolarEclipseGuide';
import SloohRoadTrips from '../../components/landing/SloohRoadTrips';

function Landing() {
  return (
    <div>
      <Hero />
      <EventDescription />
      <AboutEclipse />
      <AboutRoadTripEvent />
      <PartOfEvent />
      <SloohSunglasses />
      <SolarEclipseGuide />
      <SloohRoadTrips />
    </div>
  );
}

export default Landing;
