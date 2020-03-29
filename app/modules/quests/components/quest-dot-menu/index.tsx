import React, { useEffect } from 'react';
import { Tooltip } from 'react-tippy';
import { QuestButtonsPopover } from 'app/modules/quests/components/quest-buttons-popover';
import { IQuestDotMenuItem } from 'app/modules/quests/types.ts';
import './styles.scss';


type QuestDotMenuProps = {
  show?: boolean;
  menuTitle?: string;
  items?: Array<IQuestDotMenuItem>;
  toggle?: (state: boolean) => void;
};

export const QuestDotMenu: React.FC<QuestDotMenuProps> = React.memo(props => {
  const { show, menuTitle, items, toggle } = props;

  useEffect((): void => {
    if (show) {
      toggle(false);
    }
  }, []);

  return (
    show && (
      <>
        <QuestButtonsPopover isOpen>
          <div className="quest-dot-menu">
            <div className="quest-dot-menu-popover">
              {menuTitle && <div className="title">{menuTitle}:</div>}
              <div className="content">
                {items.map(
                  (item: IQuestDotMenuItem) =>
                    item.show && (
                      <Tooltip
                        title={item.tooltipText}
                        theme="light"
                        distance={10}
                        position="top"
                        disabled={!item.showTooltip}
                      >
                        <div
                          key={item.title}
                          role="presentation"
                          onClick={(): void => {
                            if (!item.notCloseOnClick) {
                              toggle(false);
                            }
                            if (item.action) {   
                              item.action();
                            }
                          }}
                        >
                          {item.title}
                        </div>
                      </Tooltip>
                    )
                )}
              </div>
            </div>
          </div>
        </QuestButtonsPopover>
      </>
    )
  );
});
