import React from 'react';
import AllSkyCamWidget from 'app/modules/telescope/containers/all-sky-cam-widget';
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

const getTelescopeWidget = (
  widgetType: string,
  obsId: string,
  widgetId: string
) => {
  switch (widgetType) {
    case TELESCOPE_WIDGETS.AllSkyCam: {
      return (
        <AllSkyCamWidget
          key={widgetId}
          obsId={obsId}
          allSkyWidgetID={widgetId}
        />
      );
    }
    case TELESCOPE_WIDGETS.DomeCam: {
      return (
        <DomeCamWidget
          key={widgetId}
          obsId={obsId}
          domeCamWidgetId={widgetId}
        />
      );
    }
    default: {
      return <div />;
    }
  }
};

export const TelescopesSliderItem: React.FC<
  TTelescopesSliderItemProps
> = props => {
  const { title, body, widgetType, obsId } = props;

  const widgetId = getWidgetId(props);

  return (
    <div className="telescopes-slider-item-wrapper">
      <div className="telescopes-slider-item">
        <div className="telescope-info">
          <div className="telescope-info-title">{title}</div>
          <div className="telescope-info-body">{body}</div>
        </div>
        <div className="telescope-widget">
          {widgetId && getTelescopeWidget(widgetType, obsId, widgetId)}
        </div>
      </div>
    </div>
  );
};
