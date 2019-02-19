import { HeaderWithCounter } from 'app/components/header-with-counter';
import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import GuideTiles from '../../guides-hub/guide-tiles';

export const ActiveObjects = (props) => {
  const { count, list } = props;  //eslint-disable-line
  return (
    <Fragment>
      <HeaderWithCounter
        txt={<FormattedMessage id="Profile.Objects" />}
        count={count}
      />
      <div className="groups">

        <GuideTiles
          updateReadingListInfo={() => {
          }}
          guides={list}
          // isMobile={context.isMobile}
        />

      </div>
    </Fragment>
  );
};
