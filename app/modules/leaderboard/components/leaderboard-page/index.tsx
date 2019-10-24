import * as React from 'react';
import { sloohLogoAstronaut } from 'app/styles/variables/iconURLs';
import Nav from 'app/components/common/nav';
import HubHeader from 'app/components/common/HubHeader';
import { LeaderboardResponse } from 'app/modules/leaderboard/types';
import { IRouter } from 'app/common/types';

interface RouteParams {
  tab: string;
}

interface LeaderboardPageProps extends IRouter<RouteParams> {
  getLeaderboard: () => void;
  leaderboardData: LeaderboardResponse;
}

export const LeaderboardPage: React.FC<LeaderboardPageProps> = React.memo(
  (props: LeaderboardPageProps) => {
    const { getLeaderboard, leaderboardData, router, routeParams } = props;
    console.info(leaderboardData);

    // useDidMount
    React.useEffect(() => {
      console.log('useDidMount');
      getLeaderboard();
    }, [getLeaderboard]);

    // check tab
    React.useEffect(() => {
      if (!routeParams.tab) {
        router.push('/leaderboard/my-leaderboard');
      }
    }, [routeParams.tab, router]);

    return (
      <>
        <HubHeader
          showIcon
          icon={sloohLogoAstronaut}
          title={leaderboardData.PageHeading1}
          renderNav={() => (
            <div className="navigation-bar">
              <Nav
                items={Object.values(leaderboardData.PageMenuList || {})}
                style={{ padding: 0 }}
              />
            </div>
          )}
        />
      </>
    );
  }
);
