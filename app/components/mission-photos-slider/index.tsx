import React from 'react';
import take from 'lodash/take';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import SloohSlider from 'app/components/common/Slider';
import defaultSliderConfiguration from 'app/components/common/Slider/sliderConfig';
import { IMissionPhotoListItem } from 'app/modules/profile-photos/types';
import { MissionPhotosCard } from './mission-photos-card';
import './styles.scss';

type TMissionPhotosSliderProps = {
  readOnly?: boolean;
  imageList: Array<IMissionPhotoListItem>;
  customClass: string;
};

const getMissionPhotosSliderItems = (
  imageList: Array<IMissionPhotoListItem>,
  readOnly: boolean
): any =>
  imageList.map((item: IMissionPhotoListItem) => ({
    render: () => <MissionPhotosCard mission={item} />,
  }));

export const MissionPhotosSlider: React.FC<
  TMissionPhotosSliderProps
> = props => {
  const { imageList, readOnly, customClass } = props;
  const { t } = useTranslation();
  const shortList = take(imageList, 2) || [];

  return (
    <div className="mission-photos-slider-container">
      <div className={cx('mission-photos-slider', customClass)}>
        <SloohSlider
          slideList={getMissionPhotosSliderItems(imageList, readOnly)}
          sliderConfig={defaultSliderConfiguration()}
          emptyMessage={t('Dashboard.NothingToShow')}
        />
      </div>
      <div className="mission-photos-list">
        {shortList.map((item: IMissionPhotoListItem) => (
          <MissionPhotosCard mission={item} />
        ))}
      </div>
    </div>
  );
};
