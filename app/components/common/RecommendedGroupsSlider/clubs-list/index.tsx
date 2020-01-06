import React from 'react';
import take from 'lodash/take';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import SloohSlider from 'app/components/common/Slider';
import GroupTile from 'app/components/common/tiles/GroupTile';
import { IDashboardRecomendedClub } from 'app/modules/dashboard/types';
import { getSliderProps } from '../recommendedGroupsSliderConfiguration';
import './styles.scss';

type TClubsListProps = {
  readOnly?: boolean;
  clubsList: Array<IDashboardRecomendedClub>;
  customClass: string;
};

export const ClubsList: React.FC<TClubsListProps> = props => {
  const { clubsList, readOnly, customClass } = props;
  const { t } = useTranslation();

  const sliderProps = getSliderProps(clubsList, t, readOnly);
  const shortList = take(clubsList, 2) || [];

  return (
    <div className="clubs-list-container">
      <div className={cx('clubs-slider', customClass)}>
        <SloohSlider {...sliderProps} />
      </div>
      <div className="clubs-list">
        {shortList.map((group: IDashboardRecomendedClub): any => (
          <GroupTile
            accessDescription={group.accessDescription}
            iconURL={group.iconUrl}
            key={`clubId-${group.discussionGroupId}`}
            linkUrl={group.linkUrl}
            title={group.title}
            readOnly={readOnly}
          />
        ))}
      </div>
    </div>
  );
};
