import * as React from 'react';
import {sloohLogoAstronaut} from 'app/styles/variables/iconURLs';
import Nav from 'app/components/common/nav';
import HubHeader from 'app/components/common/HubHeader';
import {LeaderboardResponse} from 'app/modules/leaderboard/types';
import {IRouter} from 'app/common/types';
import {Col, Container, Row} from 'react-bootstrap';
import {LeaderboardTable} from 'app/modules/leaderboard/components/leaderboard-table';

interface RouteParams {
  tab: string;
}

interface LeaderboardPageProps extends IRouter<RouteParams> {
  getLeaderboard: () => void;
  leaderboardData: LeaderboardResponse;
  userData: any;
}

export const LeaderboardPage: React.FC<LeaderboardPageProps> = React.memo(
  (props: LeaderboardPageProps) => {
    const { getLeaderboard, leaderboardData, router, routeParams, userData } = props;

    // useDidMount
    React.useEffect(() => {
      getLeaderboard();
    }, [getLeaderboard]);

    // check tab
    React.useEffect(() => {
      if (!routeParams.tab) {
        router.push('/leaderboard/my-leaderboard');
      }
    }, [routeParams.tab, router]);

    const tableByTab: any = {
      'my-leaderboard': {
        'left': leaderboardData.AllTimeLeaderboardData?.MyLeaderboard,
        'right': leaderboardData.ThirtyDayLeaderboardData?.MyLeaderboard,
      },
      'site-wide': {
        'left': leaderboardData.AllTimeLeaderboardData?.SitewideLeaderboard,
        'right': leaderboardData.ThirtyDayLeaderboardData?.SitewideLeaderboard,
      }
    };

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
        <Container>
          <Row className="mt-5">
            <Col md={6}>
              <LeaderboardTable
                header={leaderboardData.PageHeadingAllTime}
                tableData={tableByTab[routeParams.tab]?.left}
                highlightCID={userData.customerUUID}
              />
            </Col>
            <Col md={6}>
              <LeaderboardTable
                header={leaderboardData.PageHeadingThirtyDay}
                tableData={tableByTab[routeParams.tab]?.right}
                highlightCID={userData.customerUUID}
              />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
);
