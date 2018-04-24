/***********************************
* V4 Community Group Overview Short Information Component
*
*
*
***********************************/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { black, darkBlueGray, white, turqoise } from '../../../styles/variables/colors';
import { secondaryFont } from '../../../styles/variables/fonts';

const {
  arrayOf,
  func,
  bool,
  shape,
  string,
} = PropTypes;

const ShortInformation = ({
  description,
  descriptionHeading,
  detailsHeading,
  detailsList,
  heading,
  joinPrompt,
  showJoinPrompt,
  joinOrLeaveGroup,
}) => (
  <div className="">
    <h2 dangerouslySetInnerHTML={{ __html: heading }} />
    <div>
      <div className="details">
        <div dangerouslySetInnerHTML={{ __html: detailsHeading }} />
        <div>
          {Object.keys(detailsList).map(key => (<div>
              {detailsList[key].showIcon && <img src={detailsList[key].iconURL} />} <span dangerouslySetInnerHTML={{ __html: detailsList[key].label }} />
            </div>))}
        </div>
      </div>
      <div>
        <h4 dangerouslySetInnerHTML={{ __html: descriptionHeading }} />
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
      <div>
        {showJoinPrompt && <button dangerouslySetInnerHTML={{ __html: joinPrompt }} onClick={joinOrLeaveGroup} />}
      </div>
    </div>

    <style jsx>{`
    `}</style>
  </div>
);

ShortInformation.propTypes = {
  detailsList: shape({}),
  description: string,
  descriptionHeading: string,
  detailsHeading: string,
  heading: string,
  joinPrompt: string,
  showJoinPrompt: bool,
  joinOrLeaveGroup: func.isRequired,
};

ShortInformation.defaultProps = {
  detailsList: {},
  description: '',
  descriptionHeading: '',
  detailsHeading: '',
  heading: '',
  joinPrompt: '',
  showJoinPrompt: false,
};


export default ShortInformation;
