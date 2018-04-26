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
  <div className="overview">
    <h3 dangerouslySetInnerHTML={{ __html: heading }} />
    <div>
      <div className="details emphasis">
        <div dangerouslySetInnerHTML={{ __html: detailsHeading }} />
        <div>
          {Object.keys(detailsList).map(key => (<div>
              {detailsList[key].showIcon && <img src={detailsList[key].iconURL} />} <span dangerouslySetInnerHTML={{ __html: detailsList[key].label }} />
            </div>))}
        </div>
      </div>
      <div>
        <h4 className="emphasis" dangerouslySetInnerHTML={{ __html: descriptionHeading }} />
        <div className="description" dangerouslySetInnerHTML={{ __html: description }} />
      </div>
      <div>
        {showJoinPrompt && <button className="leave-btn" dangerouslySetInnerHTML={{ __html: joinPrompt }} onClick={joinOrLeaveGroup} />}
      </div>
    </div>

    <style jsx>{`
      .overview {
        padding: 15px;
      }
      .details {
        margin: 10px 0 10px 0;
        padding: 15px 0 15px 0;
        border-top: 1px solid ${darkBlueGray};
      }
      .emphasis {
        font-weight: bold;

      }

      .description {
        padding: 15px 0 15px 0;
        border-top: 1px solid ${darkBlueGray};
        font-family: ${secondaryFont};
      }

      .leave-btn {
        width: 100%;
        background-color: ${darkBlueGray};
        color: ${white};
        font-weight: bold;
        text-align: center;
        padding: 15px 0;
      }
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
