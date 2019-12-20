import React from 'react';
import { ConnectedAllSkyCamera } from 'app/modules/telescope/components/old/all-sky-camera';
import './styles.scss';

type TTelescopesSliderItemProps = {
  title: string;
  body: string;
  readOnly?: boolean;
  widgetType: string;
  widgetIdFieldName: string;
  obsId: string;
  observatoryList: any;
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
        <ConnectedAllSkyCamera
          obsId={obsId}
          allSkyWidgetID={widgetId}
          withoutContainer
        />
      );
    }
    case TELESCOPE_WIDGETS.DomeCam: {
      return <div />;
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

  return (
    <div className="telescopes-slider-item-wrapper">
      <div className="telescopes-slider-item">
        <div className="telescope-info">
          <div className="telescope-info-title">{title}</div>
          <div className="telescope-info-body">{body}</div>
        </div>
        <div className="telescope-widget">
          {getTelescopeWidget(widgetType, obsId, getWidgetId(props))}
        </div>
      </div>
    </div>
  );
};
