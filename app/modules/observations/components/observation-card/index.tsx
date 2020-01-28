import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { Tooltip } from 'react-tippy';
import cx from 'classnames';
import { ModalImg } from 'app/modules/telescope/components/modal-img';
import LikeSomethingButton from 'app/components/common/LikeSomethingButton';
import { ReturnObservationIcon } from 'app/components/common/RecommendedObservationsSlider/partials/GetObservationIcon';
import { IObservationData } from 'app/modules/observations/types';

import './styles.scss';

type ObservationCardProps = {
  observationData: IObservationData;
  handleLike: Function;
  readOnly: boolean;
};

export const ObservationCard: React.FC<ObservationCardProps> = React.memo(
  props => {
    const { observationData, handleLike, readOnly } = props;

    const {
      observationTitle,
      imageTitle,
      displayName,
      observationLog,
      imageDownloadURL,
      linkUrl,
      likesCount,
      likedByMe,
      likeTooltip,
      commentsCount,
      observationTimeDisplay,
      customerImageId,
      likePrompt,
      showLikePrompt,
      iconFileData,
    } = observationData;

    const [isOpen, openModal] = useState(false);
    const { t } = useTranslation();
    const [likesNumber, changeLikesNumber] = useState<number>(likesCount);
    const title = observationTitle || imageTitle;
    const onLikeClick = (): Function => {
      if (!showLikePrompt) {
        changeLikesNumber(likesNumber + 1);
        return handleLike(customerImageId);
      }
    };

    return (
      <div className={cx('card-obs-wrapper', { 'read-only': readOnly })}>
        <div className="card-obs">
          {imageDownloadURL ? (
            <Fragment>
              <div className="top">
                <div className="info">
                  <div className="main-info">
                    <h2 className="title h-2 h-2-bold">{title}</h2>
                    {readOnly ? (
                      <h5 className="author h-5 h-5-normal">{displayName}</h5>
                    ) : (
                      <Link to={iconFileData.Member.linkUrl}>
                        <h5 className="author">{displayName}</h5>
                      </Link>
                    )}
                    {observationLog && (
                      <p
                        className="dashboardObservationText i-text-box"
                        dangerouslySetInnerHTML={{ __html: observationLog }}
                      />
                    )}
                  </div>
                  <div className="links">
                    {Object.keys(iconFileData).map(item => (
                      <Tooltip title={iconFileData[item].text}>
                        {iconFileData[item].hasLink && !readOnly ? (
                          <Link to={iconFileData[item].linkUrl}>
                            <ReturnObservationIcon item={iconFileData[item]} />
                          </Link>
                        ) : (
                          <ReturnObservationIcon item={iconFileData[item]} />
                        )}
                      </Tooltip>
                    ))}
                  </div>
                </div>
                <div className="picture">
                  <div className="image-wrapper">
                    <img
                      src={imageDownloadURL}
                      style={{ cursor: 'pointer' }}
                      onClick={(): void => openModal(!isOpen)}
                      alt="Observation"
                    />
                    <ModalImg
                      isOpen={isOpen}
                      imageURL={imageDownloadURL}
                      onHide={(): void => openModal(!isOpen)}
                      customClassName="obs-image-wrapper"
                      magnifierClassName="obs-image-magnifier"
                    />
                  </div>
                </div>
              </div>
              <div className="bottom">
                <div className="buttons">
                  {!readOnly && (
                    <>
                      <div className="button">
                        <LikeSomethingButton
                          mod="no-border"
                          likePrompt={likePrompt}
                          likesCount={likesNumber || likesCount}
                          likedByMe={likedByMe}
                          likeTooltip={likeTooltip}
                          likeHandler={onLikeClick}
                          customerId={customerImageId}
                          showLikePrompt={showLikePrompt}
                        >
                          <img
                            className="icon"
                            src="https://vega.slooh.com/assets/v4/common/heart.svg"
                            alt="heart"
                          />
                          {!likesCount ? '0' : likesCount}
                        </LikeSomethingButton>
                      </div>
                      <div className="button">
                        <img
                          className="icon"
                          src="https://vega.slooh.com/assets/v4/common/comment.svg"
                          alt="comment"
                          //onClick={(): void => openDiscussionsModal(true)}
                        />
                        {!commentsCount ? '0' : commentsCount}
                      </div>
                      {linkUrl && (
                        <Link to={linkUrl} className="button details">
                          {t('Dashboard.Details')}
                          <img
                            src="https://vega.slooh.com/assets/v4/icons/horz_arrow_right_astronaut.svg"
                            alt="arrow-right"
                          />
                        </Link>
                      )}
                    </>
                  )}
                </div>
                <div className="capture-date">
                  {observationTimeDisplay
                    ? observationTimeDisplay[0]
                    : `${t('Dashboard.Loading')}...`}
                </div>
              </div>
            </Fragment>
          ) : (
            <div className="loading">{t('Dashboard.Loading')}...</div>
          )}
        </div>
      </div>
    );
  }
);
