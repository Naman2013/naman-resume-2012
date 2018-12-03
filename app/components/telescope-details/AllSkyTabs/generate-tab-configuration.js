import React from 'react';
import CenterContent from '../../../design-system/CenterContent';
import AllSkyCamWidget from '../allsky-widget';
import AllSkyTimelapseWidget from '../allsky-timelapse-widget';

export default function generateAllSkyTabConfiguration({
  obsId,
  AllskyWidgetId,
  AllskyTimelapseWidgetId,
}) {
  return (
  [
    {
      tabText: 'All Sky Camera',
      tabContent: (
        <CenterContent>
          <AllSkyCamWidget obsId={obsId} AllskyWidgetId={AllskyWidgetId} />
        </CenterContent>
      ),
    },
    {
      tabText: 'Time Lapse',
      tabContent: (
          <AllSkyTimelapseWidget obsId={obsId} AllskyTimelapseWidgetId={AllskyTimelapseWidgetId}/>
      ),
    },
  ]
  );
}
