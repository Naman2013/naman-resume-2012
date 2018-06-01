/***********************************
* V4 Community Group Overview Full Information Component
*
*
*
***********************************/
import React from 'react';
import PropTypes from 'prop-types';
import { darkBlueGray } from '../../../styles/variables/colors';
import { secondaryFont } from '../../../styles/variables/fonts';
import { fullWidthBtn, dropShadowedContainer } from '../styles';

const {
  func,
  bool,
  shape,
  string,
} = PropTypes;

const FullInformation = ({
  description,
  descriptionHeading,
  detailsHeading,
  detailsList,
  heading,
  joinPrompt,
  showJoinPrompt,
  joinOrLeaveGroup,
}) => {
  const iconStyle = { height: '15px', width: '15px', color: darkBlueGray, padding: '15px 25px 0 0' };
    return (<div className="overview">
      <div className="overview-container">
        <div className="left-container">
          <h3 className="emphasis" dangerouslySetInnerHTML={{ __html: heading }} />
          <div className="description" dangerouslySetInnerHTML={{ __html: description }} />
          {showJoinPrompt && <button className="leave-btn" dangerouslySetInnerHTML={{ __html: joinPrompt }} onClick={joinOrLeaveGroup} />}
        </div>
        <div className="right-container">
          <div className="emphasis" dangerouslySetInnerHTML={{ __html: detailsHeading }} />
          {Object.keys(detailsList).map(key => (<div>
              {detailsList[key].showIcon && <img style={iconStyle}src={detailsList[key].iconURL} />} <span dangerouslySetInnerHTML={{ __html: detailsList[key].label }} />
            </div>))}
        </div>
      </div>
      <style jsx>{`
        .overview {
          
        }

        .overview-container {
          display: flex;
          flex-direction: row;
          ${dropShadowedContainer}
          padding: 25px;
        }

        .emphasis {
          font-weight: bold;

        }

        .description {
          padding: 15px 0;
          font-family: ${secondaryFont};
        }

        .leave-btn {
          ${fullWidthBtn}
        }

        .left-container {
          flex: 3;
          padding-right: 150px;
        }

        .right-container {
          flex: 1;
          padding: 15px;
        }
      `}</style>
    </div>
  )
};

FullInformation.propTypes = {
  detailsList: shape({}),
  description: string,
  descriptionHeading: string,
  detailsHeading: string,
  heading: string,
  joinPrompt: string,
  showJoinPrompt: bool,
  joinOrLeaveGroup: func.isRequired,
};

FullInformation.defaultProps = {
  detailsList: {},
  description: '',
  descriptionHeading: '',
  detailsHeading: '',
  heading: '',
  joinPrompt: '',
  showJoinPrompt: false,
};


export default FullInformation;
