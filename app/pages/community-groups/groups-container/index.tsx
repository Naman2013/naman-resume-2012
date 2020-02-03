import React, { useState, useEffect } from 'react';
import { browserHistory } from 'react-router';
import cx from 'classnames';
import './styles.scss';
import {
  IGroupsNavigationSubMenu,
  IGroupScreenContext,
} from 'app/modules/clubs/types';

type TGroupsContainerProps = {
  subMenus: Array<IGroupsNavigationSubMenu>;
  discussionsContent: any;
  membersContent: any;
  observationsContent: any;
  context: IGroupScreenContext;
  toggleNavigationTab: Function;
  t: any;
};

const groupsNavigationTabs = {
  discussion: {
    name: 'Discussions',
    isShow: true,
  },
  observation: {
    name: 'Observations',
    isShow: true,
  },
  member: {
    name: 'Members',
    isShow: true,
  },
};

const toggleNavigationTab = (
  tab: any,
  subMenus: Array<IGroupsNavigationSubMenu>,
  isDesktop: boolean,
  groupsNavigationTabs: any,
  setCurrentTab: Function
) => {
  setCurrentTab(tab.name);
  subMenus.forEach(function(item) {
    if (item.name === tab.name) {
      return browserHistory.push(item.link);
    }
  });

  if (!isDesktop) {
    Object.keys(groupsNavigationTabs).map(key => {
      if (tab.name !== groupsNavigationTabs[key].name) {
        tab.isShow = false;
      }
    });
    tab.isShow = true;
  }
};

export const GroupsContainer: React.FC<TGroupsContainerProps> = React.memo(
  props => {
    const {
      subMenus,
      context,
      context: { isDesktop },
      discussionsContent,
      observationsContent,
      membersContent,
      t,
    } = props;
    const { discussion, observation, member } = groupsNavigationTabs;
    const [currentTab, setCurrentTab] = useState('Discussions');

    useEffect(() => {
      if (currentTab === 'Members') {
        toggleNavigationTab(
          discussion,
          subMenus,
          isDesktop,
          groupsNavigationTabs,
          setCurrentTab
        );
      }
    }, [isDesktop]);

    return (
      <div className="groups-container">
        <div className="groups-container__navigation">
          {discussion.isShow && (
            <div
              className={cx('groups-container__navigation-tab', {
                active: currentTab === discussion.name,
              })}
              onClick={() =>
                toggleNavigationTab(
                  discussion,
                  subMenus,
                  isDesktop,
                  groupsNavigationTabs,
                  setCurrentTab
                )
              }
            >
              {t('Clubs.NavFirstTitle')}
              <img
                src="https://vega.slooh.com/assets/v4/common/status_triangle_up.svg"
                alt=""
                className={cx('arrow', {
                  'is-hidden': currentTab !== discussion.name,
                })}
              />
            </div>
          )}
          {observation.isShow && (
            <div
              className={cx('groups-container__navigation-tab', {
                active: currentTab === observation.name,
              })}
              onClick={() =>
                toggleNavigationTab(
                  observation,
                  subMenus,
                  isDesktop,
                  groupsNavigationTabs,
                  setCurrentTab
                )
              }
            >
              {t('Clubs.NavSecondTitle')}
              <img
                src="https://vega.slooh.com/assets/v4/common/status_triangle_up.svg"
                alt=""
                className={cx('arrow', {
                  'is-hidden': currentTab !== observation.name,
                })}
              />
            </div>
          )}
          {member.isShow && !isDesktop && (
            <div
              className={cx('groups-container__navigation-tab', {
                active: currentTab === member.name,
              })}
              onClick={() =>
                toggleNavigationTab(
                  member,
                  subMenus,
                  isDesktop,
                  groupsNavigationTabs,
                  setCurrentTab
                )
              }
            >
              {t('Clubs.NavThirdTitle')}
              <img
                src="https://vega.slooh.com/assets/v4/common/status_triangle_up.svg"
                alt=""
                className={cx('arrow', {
                  'is-hidden': currentTab !== member.name,
                })}
              />
            </div>
          )}
        </div>

        <div className="groups-container__tabs">
          <div className="groups-container__tabs-desktop">
            {currentTab === discussion.name && (
              <div className="groups-container__tabs-discussion">
                {discussionsContent}
              </div>
            )}
            {((isDesktop && currentTab === discussion.name) ||
              (!isDesktop && currentTab === member.name)) && (
              <div className="groups-container__tabs-member">
                {membersContent}
              </div>
            )}
          </div>
          {currentTab === observation.name && (
            <div className="groups-container__tabs-observation">
              {observationsContent}
            </div>
          )}
        </div>
      </div>
    );
  }
);
