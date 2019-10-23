import * as React from 'react';
import { sloohLogoAstronaut } from 'app/styles/variables/iconURLs';
import Nav from 'app/components/common/nav';
import HubHeader from 'app/components/common/HubHeader';

// name types like <component-name>Props
type LeaderboardPageProps = {};

export const LeaderboardPage: React.FC<LeaderboardPageProps> = props => {
  // use destruction
  // const { title } = props;

  React.useEffect(() => console.log('mounted'), []);

  return (
    <>
      <HubHeader
        showIcon
        icon={sloohLogoAstronaut}
        title="Leaderboard"
        renderNav={() => (
          <div className="navigation-bar">
            test
            {/*<Nav items={items} location={location} style={{ padding: 0 }} />*/}
          </div>
        )}
      />
    </>
  );
};
