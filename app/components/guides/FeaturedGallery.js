import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { DeviceContext } from 'app/providers/DeviceProvider';
import SterlingTitle from 'app/components/common/titles/SterlingTitle';
import RecommendedObservations from 'app/components/common/RecommendedObservationsSlider';
import style from './FeaturedGallery.style';

const titleTheme = {};
const titleThemeMedium = {
  title: { color: 'white' },
  subTitle: { color: 'white' },
};

const FeaturedGallery = props => {
  const { imageList } = props;
  const { t } = useTranslation();
  return (
    <div className="root">
      <DeviceContext.Consumer>
        {context => (
          <Fragment>
            <SterlingTitle
              title={t('Guides.FeaturedTitle')}
              subTitle={t('Guides.FeaturedSubtitle')}
              theme={context.isScreenMedium ? titleThemeMedium : titleTheme}
            />
            <div className="i-wrapper">
              <RecommendedObservations imageList={imageList} />
            </div>
          </Fragment>
        )}
      </DeviceContext.Consumer>
      <style jsx>{style}</style>
    </div>
  );
};

export default FeaturedGallery;
