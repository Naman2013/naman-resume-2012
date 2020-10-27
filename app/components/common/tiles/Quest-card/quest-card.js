import React from 'react';
import { browserHistory, Link } from 'react-router';
import PropTypes from 'prop-types';
import Button from 'app/components/common/style/buttons/Button';
import './quest-card.scss';
import { findLastIndex } from 'lodash';



const QuestCard = ({
  linkUrl,
  questType,
  questDifficulty,
  iconURL,
  title,
  linkLabel,
  onDownloadPdf,
  questAuthor,
  questId
}) => (
  <div>
    <div className="card-container">
      <div className="avers">
        <Link to={linkUrl}>
          <div className="card-container__content">
            <div className="card-container__content-logo">
              <div className="blue-shield">
                <img
                  className="icon-content"
                  alt=""
                  width="112"
                  height="112"
                  src={iconURL}
                />
              </div>
            </div>
            <div className="card-container__content-title">{title}</div>
          </div>
          <div className="card-container__footer">
            <div className="card-container__footer-element">
              <span dangerouslySetInnerHTML={{ __html: questType }} />
            </div>
            <div className="card-container__footer-element">
              <span dangerouslySetInnerHTML={{ __html: questDifficulty }} />
            </div>
          </div>
        </Link>
      </div>
      <div className="reverse">
        <div className="card-container__content">
          <div className="card-container__content-title">{title}</div>
          <div className="card-container__content-subtitle">
            {questAuthor ? `${questAuthor}` : 'Added by: The Slooh team'}
          </div>
          <div  className="card-container__content-btn">
            <Button
              text={linkLabel}
              onClickEvent={() => browserHistory.push(linkUrl)}
            />
            <p>&nbsp;</p>
            <Button
              text="Download Quest Report"
              onClickEvent={() => onDownloadPdf(questId)}>
               <img src="https://img.icons8.com/metro/15/000000/downloading-updates.png"/>
              </Button>
            
          </div>
        </div>
      </div>
    </div>
  </div>
);



QuestCard.propTypes = {
  questType: PropTypes.string.isRequired,
  questDifficulty: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
  iconURL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default QuestCard;
