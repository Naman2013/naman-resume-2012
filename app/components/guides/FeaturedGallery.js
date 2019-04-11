import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { DeviceContext } from 'app/providers/DeviceProvider';
import SterlingTitle from 'app/components/common/titles/SterlingTitle';
import CenterColumn from 'app/components/common/CenterColumn';
import RecommendedObservations from 'app/components/common/RecommendedObservationsSlider';
import style from './FeaturedGallery.style';
import messages from './FeaturedGallery.messages';

const titleTheme = {};
const titleThemeMedium = {
  title: { color: 'white' },
  subTitle: { color: 'white' },
};

const FeaturedGallery = () => (
  <div className="root">
    <DeviceContext.Consumer>
      {context => (
        <Fragment>
          <SterlingTitle
            title={<FormattedMessage {...messages.FeaturedTitle} />}
            subTitle={<FormattedMessage {...messages.FeaturedSubtitle} />}
            theme={context.isScreenMedium ? titleThemeMedium : titleTheme}
          />
          <CenterColumn>
            <RecommendedObservations />
          </CenterColumn>
        </Fragment>
      )}
    </DeviceContext.Consumer>
    <style jsx>{style}</style>
  </div>
);

export default FeaturedGallery;
