import React, { useState } from 'react';
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

  return (
    show && (
      <>
        <QuestButtonsPopover isOpen>
          <div className="quest-dot-menu">
            <div className="quest-dot-menu-popover">
              <div className="title">{menuTitle}:</div>
              <div className="content">
                {items.map(
                  (item: IQuestDotMenuItem) =>
                    item.show && (
                      <div
                        key={item.title}
                        role="presentation"
                        onClick={(): void => {
                          if (item.action) {
                            toggle(false);
                            item.action();
                          }
                        }}
                      >
                        {item.title}
                      </div>
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
