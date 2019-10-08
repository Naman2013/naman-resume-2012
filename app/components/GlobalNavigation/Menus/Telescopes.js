import React from 'react';
import { useTranslation } from 'react-i18next';
import { browserHistory } from 'react-router';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { primaryFont } from 'app/styles/variables/fonts';
import {
  romance,
  astronaut,
  golda,
} from 'app/styles/variables/colors_tiles_v4';
import Request from 'app/components/common/network/Request';
import { OBSERVATORIES_COMPACT } from 'app/services/observatories';
import Button from 'app/components/common/style/buttons/Button';
import { telescopeAstronaut } from 'app/styles/variables/iconURLs';
import BorderContainer from './partials/BorderedContainer';
import MenuList from './partials/MenuList';
import MenuTitleBar from './partials/MenuTitleBar';
import TELESCOPE_CONFIGURATION, {
  modelTelescopesFromObsList,
} from './telescopeConfiguration';
import messages from './Telescopes.messages';

const Telescopes = ({ intl }) => {
  const { t } = useTranslation();
  return (
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
          <MenuTitleBar title={t('.title')}>
            <div className="center-buttons">
              <Button
                text={t('.setUp')}
                theme={{
                  display: 'inline-block',
                  textAlign: 'center',
                  marginRight: '15px',
                  width: '47%',
                }}
                onClickEvent={() => browserHistory.push('/missions')}
              />
              <Button
                text={t('.myPhotos')}
                theme={{
                  display: 'inline-block',
                  textAlign: 'center',
                  width: '47%',
                }}
                onClickEvent={() =>
                  browserHistory.push('/profile/private/photos/photoroll')
                }
              />
            </div>
          </MenuTitleBar>
          {!fetchingContent && (
            <MenuList items={TELESCOPE_CONFIGURATION(TELESCOPES_ONLY)} />
          )}

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
                padding-top: 10px;
                display: flex;
                justify-content: space-between;
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
};

Telescopes.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Telescopes);
