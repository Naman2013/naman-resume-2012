import React from 'react';

export default function Tier({ tierName, tierIconURL }) {
  return (
    <div className="clearfix">
      <div className="spotlight-icon visible-inline-block">
        <img alt="" src={tierIconURL} width="70%" />
      </div>
      <div className="text-medium visible-inline-block margin-left-med">{tierName}</div>
    </div>
  );
}
