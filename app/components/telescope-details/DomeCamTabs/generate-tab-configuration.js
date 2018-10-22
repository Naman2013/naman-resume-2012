import React from 'react';
import CenterContent from '../../../design-system/CenterContent';
import DomeCamWidget from '../domecam-widget';
import DomeCamTimelapseWidget from '../domecam-timelapse-widget';

const inlineTitleStyle = {
  color: 'white',
}

const inlineTimelapseStyle = {
  minWidth: '100%',
  width: '100%',
}

export default function generateDomecamTabConfiguration({
  obsId,
  DomecamWidgetId,
  DomecamTimelapseWidgetId,
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
          <DomeCamTimelapseWidget obsId={obsId} DomecamTimelapseWidgetId={DomecamTimelapseWidgetId}/>
      ),
    },
  ]
  );
}
