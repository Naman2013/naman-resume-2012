import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DeviceContext } from 'providers/DeviceProvider';
import style from './FeaturedGallery.style';
import SterlingTitle from 'components/common/titles/SterlingTitle';
import messages from './FeaturedGallery.messages';

const titleTheme = {};
const titleThemeMedium = { title: { color: 'white' }, subTitle: { color: 'white' } };

const FeaturedGallery = () => (
  <div className="root">
    <DeviceContext.Consumer>
      {context => (
        <SterlingTitle
          title={<FormattedMessage {...messages.FeaturedTitle} />}
          subTitle={<FormattedMessage {...messages.FeaturedSubtitle} />}
          theme={context.isScreenMedium ? titleThemeMedium : titleTheme}
        />
      )}
    </DeviceContext.Consumer>
    <style jsx>{style}</style>
  </div>
);

export default FeaturedGallery;
