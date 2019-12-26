import React from 'react';
import take from 'lodash/take';
import { useTranslation } from 'react-i18next';
import InnerSlider from 'app/components/common/Slider/index';
import { getSliderProps } from 'app/components/common/RecommendedShowsSlider/recommendedShowsSliderConfiguration';
import { MissionPhotoCard } from 'app/components/mission-photo-card';
// import './styles.scss';

type TMissionPhotosSlider = {
  readOnly?: boolean;
  imageList: any; //Array<IDashboardRecomendedClub>;
};

export const MissionPhotosSlider: React.FC<TMissionPhotosSlider> = props => {
  const { imageList, readOnly } = props;
  const { t } = useTranslation();

  const sliderProps = getSliderProps(imageList, t, readOnly);
  const shortList = take(imageList, 2) || [];

  return (
    <div className="mission-slider-container">
      <div className="mission-photos-slider">
        <InnerSlider {...sliderProps} />
      </div>
      <div className="mission-photos-list">
        {shortList.map((imageCard: any): any => (
          <MissionPhotoCard imageCard={imageCard} />
        ))}
      </div>
    </div>
  );
};
