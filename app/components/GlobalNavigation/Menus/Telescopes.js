import React from 'react';
import { browserHistory } from 'react-router';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { primaryFont } from 'styles/variables/fonts';
import { romance, astronaut, golda } from 'styles/variables/colors_tiles_v4';
import Request from 'components/common/network/Request';
import { OBSERVATORIES_COMPACT } from 'services/observatories';
import BorderContainer from './partials/BorderedContainer';
import Button from 'components/common/style/buttons/Button';
import MenuList from './partials/MenuList';
import MenuTitleBar from './partials/MenuTitleBar';
import TELESCOPE_CONFIGURATION, { modelTelescopesFromObsList } from './telescopeConfiguration';
import { telescopeAstronaut } from 'styles/variables/iconURLs';
import messages from './Telescopes.messages';

const Telescopes = ({ intl }) => (
  <Request
    serviceURL={OBSERVATORIES_COMPACT}
    method="GET"
    model={modelTelescopesFromObsList}
    render={({
      fetchingContent,
      modeledResponses: { TELESCOPES_ONLY },
      serviceResponse: { observatoryList },
    }) => (
      <div className="root">
        <MenuTitleBar title={<FormattedMessage {...messages.title} />}>
          <div className="center-buttons">
            <Button
              text={intl.formatMessage(messages.setUp)}
              theme={{ display: 'inline-block', marginRight: '15px' }}
              onClickEvent={() => browserHistory.push('/')}
            />
            <Button
              text={intl.formatMessage(messages.myPhotos)}
              theme={{ display: 'inline-block' }}
              onClickEvent={() => browserHistory.push('/my-pictures')}
            />
          </div>
        </MenuTitleBar>
        {!fetchingContent && <MenuList items={TELESCOPE_CONFIGURATION(TELESCOPES_ONLY)} />}

        <style jsx>
          {`
            .root {
              color: ${astronaut};
              font-family: ${primaryFont};
            }

            .title {
              font-size: 14px;
              text-transform: uppercase;
            }

            .center-buttons {
              padding: 5px 0 15px 0;
              text-align: center;
            }

            .action {
              border-radius: 5%;
              background: none;
              padding: 20px 40px;
              border: none;
              color: ${romance};
              background: ${astronaut};
            }

            .action:hover {
              background: ${golda};
            }
          `}
        </style>
      </div>
    )}
  />
);

Telescopes.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Telescopes);
