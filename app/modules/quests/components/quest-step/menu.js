import React from 'react';
import cn from 'classnames';
import Fade from 'app/components/common/Fade';
import { CLOSE_LOCATION } from 'app/components/common/ContextMenu/ContextMenu';
import { CompleteCheckbox } from 'app/modules/quests/components/complete-checkbox';
import './menu.scss';
import { browserHistory } from 'react-router';

const CONTAINER_WIDTH = 440;
const OPEN_LOCATION = 0;
const BADGE_ITEM_TYPE = 'badge';

export const QuestStepContextMenu = ({
  stepId,
  stepMenuList,
  isOpen,
  title,
  menuTopAdjustment,
  questId,
  onClose,
  questCompletionList,
}) => {
  const goToStep = index => {
    if (stepMenuList[index].itemType === BADGE_ITEM_TYPE) {
      browserHistory.push(
        `/quest-completion/${questId}/${questCompletionList[0].questCompletionModuleId}`
      );
    } else {
      browserHistory.push(
        `/quest-details/${questId}/${stepMenuList[index].stepModuleId}`
      );
    }
    if (typeof onClose === 'function') {
      onClose();
    }
  };
  const containerLeft = isOpen ? OPEN_LOCATION : CLOSE_LOCATION;
  return (
    <div className={cn('root-step-menu', { open: isOpen })}>
      <div className={cn('eclipse', { active: isOpen })}>
        <div className="application-veil" />
      </div>

      <div
        className="menu-container"
        style={{
          right: `${containerLeft}px`,
        }}
      >
        <div className="header-container">
          <h5 className="context-header">{title}</h5>
        </div>

        <div className="step-list">
          <div className="top-gradient" />
          <div className="step-list-container">
            {stepMenuList?.length &&
              stepMenuList.map((item, index) => item.showMenuItem && (
                <div key={`step-list-item-${item.stepModuleId}`} onClick={() => goToStep(index)} className={cn('step-list-item', { disabled: !item.enableMenuItem })}>
                  <div className="step-item-title">
                    {item.stepModuleId === stepId && (
                      <div className="item-step" />
                    )}
                    <div>{item.stepMenuTitle}</div>
                  </div>
                  <CompleteCheckbox completed={item.stepCompleted} />
                </div>
              ))}
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .menu-container {
            z-index: 3001;
            top: ${menuTopAdjustment}px;
          }

          .application-veil {
            z-index: 3001;
            width: 100vw;
            height: 100%;
            position: absolute;
            top: ${menuTopAdjustment}px;
            left: 0;
            background-color: rgba(0, 0, 0, 0.5);
            pointer-events: none;
          }
        `}
      </style>
    </div>
  );
};
