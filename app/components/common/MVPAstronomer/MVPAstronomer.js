/** *********************************
 * MVP Astronomer Card
 ********************************** */

import React, { Fragment } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import MVPAstronomerCard from './MVPAstronomerCard';
import style from './MVPAstronomer.style';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { setPublicCardStatusAction } from '../../../modules/upcoming-events/upcoming-events-actions';

const MVPAstronomer = ({
  gravityRankLabel,
  displayName,
  iconUrl,
  gravity,
  hasLinkFlag,
  linkUrl,
  cardClass,
  customerUUID,
  setPublicCardStatusAction,
}) => (
  <Fragment>
    {hasLinkFlag ? (
      <Link onClick={()=>setPublicCardStatusAction(customerUUID, true)} >
        <MVPAstronomerCard
          gravityRankLabel={gravityRankLabel}
          displayName={displayName}
          iconUrl={iconUrl}
          gravity={gravity}
          cardClass={cardClass}
        />
      </Link>
    ) : (
      <MVPAstronomerCard
        gravityRankLabel={gravityRankLabel}
        displayName={displayName}
        iconUrl={iconUrl}
        gravity={gravity}
        cardClass={cardClass}
      />
    )}
    {/* <style jsx>{style}</style> */}
  </Fragment>
);

MVPAstronomer.propTypes = {
  gravityRankLabel: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  iconUrl: PropTypes.string.isRequired,
  gravity: PropTypes.string.isRequired,
  hasLinkFlag: PropTypes.bool.isRequired,
  linkUrl: PropTypes.string.isRequired,
  cardClass: PropTypes.string.isRequired,
  customerUUID: PropTypes.string.isRequired,
};

const mapDispatchToProps = {
  setPublicCardStatusAction
}

export default compose(connect(null,mapDispatchToProps)) (MVPAstronomer);
