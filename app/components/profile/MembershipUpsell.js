import React, { PropTypes } from 'react';

const { object } = PropTypes;

const MembershipUpsell = ({ upsellDetails }) => (
    <article className="row-page padding-top-large center-block">
      <div className="col-2third">
        <img
          src={upsellDetails.upsellIconURL}
          className="spotlight-icon pull-left"
        />
        <div className="pull-left margin-left-small" style={{ width: '490px' }}>
          <h2 className="white" dangerouslySetInnerHTML={{__html: upsellDetails.upsellTitle}} />
          <p dangerouslySetInnerHTML={{__html: upsellDetails.upsellText}} />
        </div>
      </div>

      <div className="col-third text-center white">
        <div className="pull-left">
          <div className="text-large price margin-botttom-none padding-bottom-tiny">
            <span dangerouslySetInnerHTML={{__html: upsellDetails.upsellPriceLine1}} />
          </div>
          <div dangerouslySetInnerHTML={{__html: upsellDetails.upsellPriceLine2}} >
          </div>
        </div>
        <a
          className="btn-primary pull-right margin-top-xsmall"
          href={upsellDetails.upsellLink}
          dangerouslySetInnerHTML={{__html: upsellDetails.upsellButtonCaption}}
        />

      </div>
    </article>
  );

MembershipUpsell.defaultProps = {
  upsellDetails: {},
};

MembershipUpsell.propTypes = {
  upsellDetails: object,
};

export default MembershipUpsell;
