import React from 'react';
import { browserHistory } from 'react-router';
import { primaryFont } from 'styles/variables/fonts';
import { romance, astronaut, golda } from 'styles/variables/colors_tiles_v4';
import Request from 'components/common/network/Request';
import { OBSERVATORIES_COMPACT } from 'services/observatories';
import BorderContainer from './partials/BorderedContainer';
import Button from 'components/common/style/buttons/Button';
import MenuList from './partials/MenuList';
import MenuTitleBar from './partials/MenuTitleBar';
import TELESCOPE_CONFIGURATION, { modelTelescopesFromObsList } from './telescopeConfiguration';
import {
  telescopeAstronaut,
} from 'styles/variables/iconURLs';

const Telescopes = () => (
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
        <MenuTitleBar
          title="Telescopes"
        >
          <div className="center-buttons">
            <Button text="SET-UP" theme={{ display: 'inline-block', marginRight: '15px' }} onClickEvent={() => browserHistory.push('/')} />
            <Button text="MY PHOTOS" theme={{ display: 'inline-block' }} onClickEvent={() => browserHistory.push('/my-pictures')} />
          </div>
        </MenuTitleBar>
        {
          !fetchingContent &&
            <MenuList items={TELESCOPE_CONFIGURATION(TELESCOPES_ONLY)} />
        }

        <style jsx>{`
          .root {
            color: ${astronaut};
            font-family: ${primaryFont};
          }

          .title {
            font-size: 14px;
            text-transform: uppercase;
          }

          .center-buttons {
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

export default Telescopes;
