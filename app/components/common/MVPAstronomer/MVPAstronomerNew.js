/** *********************************
 * MVP Astronomer Card
 ********************************** */

import React, { Fragment } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { setPublicCardStatusAction } from '../../../modules/upcoming-events/upcoming-events-actions';
import MVPAstronomerCardNew from './MVPAstronomerCardNew';

const MVPAstronomerNew = ({
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
    <div style={{marginRight: '10px'}}>
    {/* {hasLinkFlag ? (
      <Link onClick={()=>setPublicCardStatusAction(customerUUID, true)} > */}
        <MVPAstronomerCardNew
          gravityRankLabel={gravityRankLabel}
          displayName={displayName}
          iconUrl={iconUrl}
          gravity={gravity}
          cardClass={cardClass}
          hasLinkFlag={hasLinkFlag}
          onClick={setPublicCardStatusAction}
        />
      {/* </Link>
    ) : (
      <MVPAstronomerCardNew
        gravityRankLabel={gravityRankLabel}
        displayName={displayName}
        iconUrl={iconUrl}
        gravity={gravity}
        cardClass={cardClass}
      />
    )} */}
    {/* <style jsx>{style}</style> */}
    </div>
  </Fragment>
);

MVPAstronomerNew.propTypes = {
  gravityRankLabel: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  iconUrl: PropTypes.string.isRequired,
  gravity: PropTypes.string.isRequired,
  hasLinkFlag: PropTypes.bool.isRequired,
  linkUrl: PropTypes.string.isRequired,
  cardClass: PropTypes.string.isRequired,
  customerUUID: PropTypes.string.isRequired,
  setPublicCardStatusAction: PropTypes.func.isRequired,
};

// const mapDispatchToProps = {
//   setPublicCardStatusAction
// }

// export default compose(connect(null,mapDispatchToProps)) (MVPAstronomerNew);
export default MVPAstronomerNew;
