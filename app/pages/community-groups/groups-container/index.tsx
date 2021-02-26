import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, browserHistory } from 'react-router';
import cx from 'classnames';
import './styles.scss';
import {
  IGroupsNavigationSubMenu,
  IGroupScreenContext,
} from 'app/providers/types';

type TGroupsContainerProps = {
  subMenus: Array<IGroupsNavigationSubMenu>;
  discussionsContent: any;
  membersContent: any;
  observationsContent: any;
  newMember: any;
  context: IGroupScreenContext;
  toggleNavigationTab: Function;
  params: {
    groupId: string;
    tabId: string;
    threadId: string;
  };
};

const groupsNavigationTabs: { [key: string]: string } = {
  Discussions: 'DISCUSSIONS',
  Observations: 'OBSERVATIONS',
  Leaders: 'LEADERS',
  Members: 'MEMBERS'
};

export const GroupsContainer: React.FC<TGroupsContainerProps> = React.memo(
  props => {
    const {
      subMenus,
      context: { isDesktop },
      discussionsContent,
      observationsContent,
      membersContent,
      newMember,
      params: { tabId, threadId },
    } = props;

    


    let tempMenu = [...subMenus, {
      name: "Members",
      link: "/community-groups/22/Members",
    }];


    const { t } = useTranslation();
    const [currentTab, setCurrentTab] = useState(tabId.toUpperCase());



    useEffect(() => {
      if (currentTab === groupsNavigationTabs.Leaders && isDesktop) {
        setCurrentTab(tabId.toUpperCase());
      }
    }, [isDesktop]);

    return (
      <div className="groups-container">
        <div className="groups-container__navigation">
          {tempMenu.map((item, i) => (
            <Link
              to={item.link}
              activeClassName={cx({
                active: currentTab === groupsNavigationTabs[item.name],
              })}
              className="groups-container__navigation-tab"
              key={`groups-navigation-tab-${i}`}
              onClick={() => setCurrentTab(groupsNavigationTabs[item.name])}
            >
              {item.name}
              <img
                src="https://vega.slooh.com/assets/v4/common/status_triangle_up.svg"
                alt=""
                className="arrow"
              />
            </Link>
          ))}
         {/*  {!isDesktop && (
            <div
              className={cx('groups-container__navigation-tab', {
                active: currentTab === groupsNavigationTabs.Leaders,
              })}
              onClick={() => setCurrentTab(groupsNavigationTabs.Leaders)}
            >
              {t('Clubs.NavThirdTitle')}
             
              <img
                src="https://vega.slooh.com/assets/v4/common/status_triangle_up.svg"
                alt=""
                className="arrow"
              />
            </div>
          )} */}
        </div>

        <div className="groups-container__tabs">
          <div className="groups-container__tabs-desktop">
            {currentTab === groupsNavigationTabs.Discussions && (
              <div className="groups-container__tabs-discussion">
                {discussionsContent}
              </div>
            )}
            {((isDesktop && currentTab === groupsNavigationTabs.Discussions) ||
              currentTab === groupsNavigationTabs.Leaders) && (
                <div className="groups-container__tabs-member">
                  {membersContent}
                </div>
              )}
          </div>
          {currentTab === groupsNavigationTabs.Observations && (
            <div className="groups-container__tabs-observation">
              {observationsContent}
            </div>
          )}
          {currentTab === groupsNavigationTabs.Members && (
            <div className="groups-container__tabs-observation">
              {newMember}
            </div>
          )}
        </div>
      </div>
    );
  }
);
