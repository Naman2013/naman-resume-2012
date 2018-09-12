import React from 'react';
import { primaryFont } from 'styles/variables/fonts';
import { romance, astronaut, golda } from 'styles/variables/colors_tiles_v4';
import Request from 'components/common/network/Request';
import { OBSERVATORIES_COMPACT } from 'services/observatories';
import BorderContainer from './partials/BorderedContainer';
import MenuList from './partials/MenuList';
import TELESCOPE_CONFIGURATION, { modelTelescopesFromObsList } from './telescopeConfiguration';

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
        <BorderContainer top={false}>
          <button className="action">Setup a mission</button>
        </BorderContainer>

        <h4 className="title">Visit our telescope channels</h4>

        {
          !fetchingContent &&
            <MenuList items={TELESCOPE_CONFIGURATION(TELESCOPES_ONLY)} />
        }

        <style jsx>{`
          .root {
            color: ${romance};
            font-family: ${primaryFont};
          }

          .title {
            font-size: 14px;
            text-transform: uppercase;
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
