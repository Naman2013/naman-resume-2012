import React from 'react';
import CenterContent from '../../../design-system/CenterContent';
import DomeCamWidget from '../domecam-widget';
/* import DomeCamTimelapseWidget from '../condition-snapshot/DomeCamTimelapseWidget'; */

const inlineTitleStyle = {
  color: 'white',
}

export default function generateDomecamTabConfiguration({
  obsId,
  DomecamWidgetId,
  DomecamTimeLapseWidgetWidgetId,
}) {
  return (
  [
    {
      tabText: 'Dome Cam',
      tabContent: (
        <CenterContent>
          <DomeCamWidget obsId={obsId} DomecamWidgetId={DomecamWidgetId}/>
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
