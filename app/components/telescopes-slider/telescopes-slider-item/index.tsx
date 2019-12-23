import React from 'react';
import { ConnectedAllSkyCamera } from 'app/modules/telescope/components/old/all-sky-camera';
import DomeCamWidget from 'app/modules/telescope/containers/dome-cam-widget';
import { IObservatory } from 'app/modules/telescope/types';
import './styles.scss';

type TTelescopesSliderItemProps = {
  title: string;
  body: string;
  readOnly?: boolean;
  widgetType: string;
  widgetIdFieldName: string;
  obsId: string;
  observatoryList: Array<IObservatory>;
};

const TELESCOPE_WIDGETS: { [key: string]: string } = {
  AllSkyCam: 'AllSkyCam',
  DomeCam: 'DomeCam',
};

const getWidgetId = (props: TTelescopesSliderItemProps): string => {
  const { observatoryList, obsId, widgetIdFieldName } = props;

  const currentObservatory = observatoryList.filter(
    (item: any) => item.obsId === obsId
  );

  if (currentObservatory.length > 0) {
    return currentObservatory[0][widgetIdFieldName];
  }

  return null;
};

export const TelescopesSliderItem: React.FC<
  TTelescopesSliderItemProps
> = props => {
  const { title, body, widgetType, obsId } = props;

  //const Widget = WidgetsMapping[type];
  const widgetId = getWidgetId(props);
  return (
    <div className="telescopes-slider-item-wrapper">
      <div className="telescopes-slider-item">
        <div className="telescope-info">
          <div className="telescope-info-title" dangerouslySetInnerHTML={{__html: title}}/>
          <div className="telescope-info-body" dangerouslySetInnerHTML={{__html: body}}/>
        </div>
        <div className="telescope-widget">
          {widgetType === TELESCOPE_WIDGETS.AllSkyCam && (
            <ConnectedAllSkyCamera
              obsId={obsId}
              allSkyWidgetID={widgetId}
              withoutContainer
            />
          )}

          {widgetType === TELESCOPE_WIDGETS.DomeCam && widgetId && (
            <DomeCamWidget obsId={obsId} domeCamWidgetId={widgetId}/>
          )}
        </div>
      </div>
    </div>
  );
};
