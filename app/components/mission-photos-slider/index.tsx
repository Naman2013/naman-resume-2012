import React from 'react';
import take from 'lodash/take';
import { useTranslation } from 'react-i18next';
import SloohSlider from 'app/components/common/Slider';
import defaultSliderConfiguration from 'app/components/common/Slider/sliderConfig';
import MissionCard from 'app/modules/profile-photos/components/Missions/MissionCard';
import { IMissionPhotoListItem } from 'app/modules/profile-photos/types';
import { DeviceContext } from 'app/providers/DeviceProvider';
import './styles.scss';

type TMissionPhotosSliderProps = {
  readOnly?: boolean;
  imageList: Array<IMissionPhotoListItem>;
};

const getMissionPhotosSliderItems = (
  imageList: Array<IMissionPhotoListItem>,
  context: any,
  readOnly: boolean
): any =>
  imageList.map((item: IMissionPhotoListItem) => ({
    render: () => <MissionCard currentItem={item} {...context} />,
  }));

export const MissionPhotosSlider: React.FC<
  TMissionPhotosSliderProps
> = props => {
  const { imageList, readOnly } = props;
  const { t } = useTranslation();
  const shortList = take(imageList, 2) || [];

  return (
    <DeviceContext.Consumer>
      {(context: any) => (
        <div className="mission-photos-slider-container">
          <div className="mission-photos-slider">
            <SloohSlider
              slideList={getMissionPhotosSliderItems(
                imageList,
                context,
                readOnly
              )}
              sliderConfig={defaultSliderConfiguration()}
              emptyMessage={t('Dashboard.NothingToShow')}
            />
          </div>
          <div className="mission-photos-list">
            {shortList.map((item: IMissionPhotoListItem) => (
              <MissionCard currentItem={item} {...context} />
            ))}
          </div>
        </div>
      )}
    </DeviceContext.Consumer>
  );
};
