import React from 'react';
import DayNightTimeline from '../condition-snapshot/DayNightTimeline';
import DayNightMap from '../condition-snapshot/DayNightMap';
import AllSkyCamera from '../condition-snapshot/AllSkyCamera';
import DomeCam from '../condition-snapshot/DomeCam';

export default function generateTabConfiguration() {
  return (
  [
    {
      tabText: 'Day/Night Bar',
      tabContent: <h1>Day night bar...</h1>,
    },
    {
      tabText: 'All Sky Camera',
      tabContent: <h1>All sky camera</h1>,
    },
    {
      tabText: 'Dome Cam',
      tabContent: <h1>Dome cam...</h1>,
    },
    {
      tabText: 'Web Cam',
      tabContent: <h1>Web cam...</h1>,
    },
    {
      tabText: 'Weather info',
      tabContent: <h1>Weather...</h1>,
    },
  ]
  );
}
