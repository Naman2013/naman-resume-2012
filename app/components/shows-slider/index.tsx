import React from 'react';
import take from 'lodash/take';
import { useTranslation } from 'react-i18next';
import SloohSlider from 'app/components/common/Slider';
import ShowTile from 'app/components/common/tiles/ShowTile';
import { IShowsListItem } from 'app/modules/shows/types';
import { getSliderProps } from 'app/components/common/RecommendedShowsSlider/recommendedShowsSliderConfiguration';
import './styles.scss';

type TShowsSliderProps = {
  readOnly?: boolean;
  showsList: Array<IShowsListItem>;
};

export const ShowsSlider: React.FC<TShowsSliderProps> = props => {
  const { showsList, readOnly } = props;
  const { t } = useTranslation();

  const sliderProps = getSliderProps(showsList, t, readOnly);
  const shortList = take(showsList, 2) || [];

  return (
    <div className="shows-slider-container">
      <div className="shows-slider">
        <SloohSlider {...sliderProps} />
      </div>
      <div className="shows-list">
        {shortList.map((show: IShowsListItem): any => (
          <ShowTile
            key={`showsId-${show.eventId}`}
            header={show.heading}
            linkUrl={show.linkUrl}
            title={show.eventTitle}
            readOnly={readOnly}
          />
        ))}
      </div>
    </div>
  );
};
