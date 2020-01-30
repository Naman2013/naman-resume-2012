import React from 'react';
import { Link } from 'react-router';
import cx from 'classnames';
import './styles.scss';
import { IGroupsNavigationSubMenu } from 'app/modules/clubs/types';

type TGroupsNavigationProps = {
  subMenus: Array<IGroupsNavigationSubMenu>;
  discussions: any;
  observations: any;
  currentTab: string;
};

export const GroupsNavigation: React.FC<TGroupsNavigationProps> = React.memo(
  props => {
    const { subMenus, discussions, observations, currentTab } = props;

    return (
      <div>
        <div className="groups-navigation">
          {subMenus.map((item, i) => (
            <Link
              to={item.link}
              activeClassName="groups-nav-active"
              className="groups-nav-link"
              key={`groups-navigation-tab-${i}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        {currentTab === 'discussions' && (
          <div className="groups-navigation__discussions">{discussions}</div>
        )}
        {currentTab === 'observations' && (
          <div className="groups-navigation__observations">{observations}</div>
        )}
      </div>
    );
  }
);
