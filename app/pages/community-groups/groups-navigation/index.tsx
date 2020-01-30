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
    const initTab = 'discussions';

    return (
      <div>
        <div className="groups-navigation">
          {subMenus.map((item, i) => (
            <Link
              to={item.link}
              activeClassName="groups-nav-active"
              className="groups-nav-link"
              onClick={() => {}}
            >
              {item.name}
            </Link>
          ))}
        </div>
        {currentTab === ('discussions' || initTab) && <div>{discussions}</div>}
        {currentTab === 'observations' && <div>{observations}</div>}
      </div>
    );
  }
);
