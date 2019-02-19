/* eslint-disable */
import React, {Fragment} from 'react';
import {FormattedMessage} from 'react-intl';
import GuideTiles from '../../guides-hub/guide-tiles';

export const ActiveObjects = (props) => {
  const {count, list} = props;
  return <Fragment>
    <div className="header">
      <FormattedMessage id="Profile.Objects"/>
      <span>({count})</span>
    </div>
    <div className="groups">

      <GuideTiles
        updateReadingListInfo={() => {} }
        guides={list}
        // isMobile={context.isMobile}
      />

    </div>
  </Fragment>;
};
