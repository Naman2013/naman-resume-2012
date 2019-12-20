import React from 'react';
import take from 'lodash/take';
import { useTranslation } from 'react-i18next';
import SloohSlider from 'app/components/common/Slider';
import { IDashboardTelescopePromo } from 'app/modules/dashboard/types';
import defaultSliderConfiguration from 'app/components/common/Slider/sliderConfig';
import { TelescopesSliderItem } from './telescopes-slider-item';
import './styles.scss';

type TTelescopesSliderProps = {
  readOnly?: boolean;
  telescopesList: Array<IDashboardTelescopePromo>;
  observatoryList: any;
};

const getSliderConfiguration = () => {
  return {
    ...defaultSliderConfiguration(),
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    centerPadding: '25px',
    responsive: [],
  };
};

const getTelescopesSliderItems = (
  telescopesList: Array<IDashboardTelescopePromo>,
  readOnly: boolean,
  observatoryList: any
) =>
  telescopesList.map((item: IDashboardTelescopePromo) => ({
    render: () => (
      <TelescopesSliderItem
        key={`telescope-item-${item.Index}`}
        title={item.Title}
        body={item.Body}
        widgetType={item.WidgetType}
        widgetIdFieldName={item.WidgetIdFieldName}
        obsId={item.ObsId}
        readOnly={readOnly}
        observatoryList={observatoryList}
      />
    ),
  }));

export const TelescopesSlider: React.FC<TTelescopesSliderProps> = props => {
  const { telescopesList, readOnly, observatoryList } = props;
  const { t } = useTranslation();

  const shortList = take(telescopesList, 2) || [];

  return (
    <div className="telescopes-slider-container">
      <div className="telescopes-slider">
        <SloohSlider
          slideList={getTelescopesSliderItems(
            telescopesList,
            readOnly,
            observatoryList
          )}
          sliderConfig={getSliderConfiguration()}
          emptyMessage={t('Dashboard.NothingToShow')}
        />
      </div>
      <div className="telescopes-mobile-list">
        {shortList.map((item: IDashboardTelescopePromo): any => {
          return (
            <TelescopesSliderItem
              key={`telescope-item-${item.Index}`}
              title={item.Title}
              body={item.Body}
              widgetType={item.WidgetType}
              widgetIdFieldName={item.WidgetIdFieldName}
              obsId={item.ObsId}
              readOnly={readOnly}
              observatoryList={observatoryList}
            />
          );
        })}
      </div>
    </div>
  );
};
