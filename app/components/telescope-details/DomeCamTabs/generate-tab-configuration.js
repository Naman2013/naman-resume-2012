import React from 'react';
import CenterContent from '../../../design-system/CenterContent';
import DomeCamWidget from '../domecam-widget';
/* import DomeCamTimelapseWidget from '../condition-snapshot/DomeCamTimelapseWidget'; */

const inlineTitleStyle = {
  color: 'white',
}

export default function generateDomecamTabConfiguration({
  obsId,
  domeCamWidgetId,
  domeCamTimeLapseWidgetWidgetId,
}) {
  return (
  [
    {
      tabText: 'Dome Cam',
      tabContent: (
        <CenterContent>
        <h1 style={inlineTitleStyle}>{domeCamTitle}</h1>
          <DomeCamWidget obsId={obsId} domeCamWidgetId={domeCamWidgetId}/>
        </CenterContent>
      ),
    },
    {
      tabText: 'Time Lapse',
      tabContent: (
        <CenterContent>
          video
        </CenterContent>
      ),
    },
  ]
  );
}
