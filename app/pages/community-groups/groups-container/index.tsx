import React, { useState, useEffect } from 'react';
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
  context: IGroupScreenContext;
  toggleNavigationTab: Function;
  t: any;
  location: any;
};

const groupsNavigationTabs = {
  DISCUSSIONS: 'DISCUSSIONS',
  OBSERVATION: 'OBSERVATIONS',
  MEMBERS: 'MEMBERS',
};

const toggleNavigationTab = (
  tabName: string,
  subMenus: Array<IGroupsNavigationSubMenu>,
  setCurrentTab: Function
) => {
  let newTab = tabName.toUpperCase();
  setCurrentTab(newTab);
};

export const GroupsContainer: React.FC<TGroupsContainerProps> = React.memo(
  props => {
    const {
      subMenus,
      context: { isDesktop },
      discussionsContent,
      observationsContent,
      membersContent,
      t,
      location
    } = props;
    const { DISCUSSIONS, OBSERVATION, MEMBERS } = groupsNavigationTabs;
    const initTab = location.pathname.split('/').pop().toUpperCase();
    const [currentTab, setCurrentTab] = useState(initTab);


    useEffect(() => {

      if (currentTab === MEMBERS) {
        toggleNavigationTab(DISCUSSIONS, subMenus, setCurrentTab);
      }
    }, [isDesktop]);

    return (
      <div className="groups-container">
        <div className="groups-container__navigation">
          {subMenus.map((item, i) => (
            <Link
              to={item.link}
              activeClassName={cx({
                'active': currentTab === item.name.toUpperCase(),
              })}
              className="groups-container__navigation-tab"
              key={`groups-navigation-tab-${i}`}
              onClick={() =>
                toggleNavigationTab(item.name, subMenus, setCurrentTab)
              }
            >
              {item.name}
              <img
                src="https://vega.slooh.com/assets/v4/common/status_triangle_up.svg"
                alt=""
                className={cx('arrow', {
                  'is-hidden': currentTab !== item.name.toUpperCase(),
                })}
              />
            </Link>
          ))}
          {!isDesktop && (
            <div
              className={cx('groups-container__navigation-tab', {
                active: currentTab === MEMBERS,
              })}
              onClick={() =>
                toggleNavigationTab(MEMBERS, subMenus, setCurrentTab)
              }
            >
              {t('Clubs.NavThirdTitle')}
              <img
                src="https://vega.slooh.com/assets/v4/common/status_triangle_up.svg"
                alt=""
                className={cx('arrow', {
                  'is-hidden': currentTab !== MEMBERS,
                })}
              />
            </div>
          )}
        </div>

        <div className="groups-container__tabs">
          <div className="groups-container__tabs-desktop">
            {currentTab === DISCUSSIONS && (
              <div className="groups-container__tabs-discussion">
                {discussionsContent}
              </div>
            )}
            {((isDesktop && currentTab === DISCUSSIONS) ||
              currentTab === MEMBERS) && (
              <div className="groups-container__tabs-member">
                {membersContent}
              </div>
            )}
          </div>
          {currentTab === OBSERVATION && (
            <div className="groups-container__tabs-observation">
              {observationsContent}
            </div>
          )}
        </div>
      </div>
    );
  }
);
