import React from 'react';
import { QuestButtonsPopover } from 'app/modules/quests/components/quest-buttons-popover/index';
import './style.scss';
import { IQuestDataCollectionSlot } from 'app/modules/quests/types';

type TQuestSlotInfoPopupProps = {
  slotInfo: IQuestDataCollectionSlot['slotInfo'];
  slotInfoTitle: string;
  isInfoMenuOpen: boolean;
};

export const QuestSlotInfoPopup: React.FC<TQuestSlotInfoPopupProps> = props => {
  const { slotInfo, slotInfoTitle, isInfoMenuOpen } = props;
  const {
    showSlotContentsDesc,
    slotContentsDesc,
    objectName,
    imageDate,
    imageTime,
    telescopeName,
    instrumentName,
    showObjectDetails,
    imageWidth,
    imageHeight,
    imageFormat,
    observatoryName,
  } = slotInfo;

  return (
    isInfoMenuOpen && (
      <>
        <div className="slot-info-wrapper">
          <QuestButtonsPopover isOpen={isInfoMenuOpen}>
            {isInfoMenuOpen && showSlotContentsDesc && (
              <div className="slot-info-popover">
                <div className="slot-info-popover__title">{slotInfoTitle}</div>
                <div
                  className="slot-info-popover__text"
                  dangerouslySetInnerHTML={{ __html: slotContentsDesc }}
                />
              </div>
            )}
            {isInfoMenuOpen && showObjectDetails && (
              <div className="slot-image-info">
                <div className="slot-image-info__title">{slotInfoTitle}</div>
                <div className="slot-image-info__text">
                  <div className="slot-image-info__text__title">
                    {objectName}
                  </div>
                  <div className="slot-image-info__text__date">
                    <div>{imageDate}</div>
                    <div>{imageTime}</div>
                  </div>
                  <div className="slot-image-info__text__telescope">
                    {telescopeName}
                  </div>
                  <div className="slot-image-info__text__subtitle">
                    {instrumentName}
                  </div>
                  {imageWidth && (
                    <div className="slot-image-info__text__telescope">
                      {imageWidth}
                    </div>
                  )}
                  {imageHeight && (
                    <div className="slot-image-info__text__telescope">
                      {imageHeight}
                    </div>
                  )}
                  {imageFormat && (
                    <div className="slot-image-info__text__telescope">
                      {imageFormat}
                    </div>
                  )}
                  {observatoryName && (
                    <div className="slot-image-info__text__telescope">
                      {observatoryName}
                    </div>
                  )}
                </div>
              </div>
            )}
          </QuestButtonsPopover>
        </div>
      </>
    )
  );
};
