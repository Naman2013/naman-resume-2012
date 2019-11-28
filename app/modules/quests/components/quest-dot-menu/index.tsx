import React, { useState } from 'react';
import Dots from 'app/atoms/icons/Dots';
import { Button } from 'react-bootstrap';
import { QuestButtonsPopover } from 'app/modules/quests/components/quest-buttons-popover';
import cn from 'classnames';
import { IQuestDotMenuItem } from 'app/modules/quests/types.ts';
import './styles.scss';

type QuestDotMenuProps = {
  theme?: object;
  show?: boolean;
  enabled?: boolean;
  menuTitle?: string;
  items?: Array<IQuestDotMenuItem>;
};

export const QuestDotMenu: React.FC<QuestDotMenuProps> = props => {
  const [isDotsMenuOpen, toggleDotsMenu] = useState(false);

  const { theme, show, enabled, menuTitle, items } = props;

  return (
    show && (
      <>
        <Button
          className={cn('quest-dot-menu-btn', { open: isDotsMenuOpen })}
          onClick={(): void => toggleDotsMenu(!isDotsMenuOpen)}
          disabled={!enabled}
        >
          {!isDotsMenuOpen ? (
            <Dots theme={theme} />
          ) : (
            <i className="menu-icon-close icon-close" />
          )}
        </Button>

        <QuestButtonsPopover isOpen={isDotsMenuOpen}>
          {isDotsMenuOpen && (
            <div className="quest-dot-menu">
              <div className="quest-dot-menu-popover">
                <div className="title">{menuTitle}:</div>
                <div className="content">
                  {items.map(
                    item =>
                      item.show && (
                        <div
                          key={item.title}
                          role="presentation"
                          onClick={(): void => {
                            if (item.action) {
                              toggleDotsMenu(false);
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
          )}
        </QuestButtonsPopover>
      </>
    )
  );
};
