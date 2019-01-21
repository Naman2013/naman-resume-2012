import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import messages from './PhotoHubNavigation.messages';

const generateNavItems = [
  {
    // title: 'PhotoRoll',
    title: <FormattedMessage {...messages.PhotoRoll} />,
    link: '/test-profile/privat/photos/photoroll',
  },
  {
    // title: 'Observations',
    title: <FormattedMessage {...messages.Observations} />,
    link: '/test-profile/privat/photos/observations',
  },
  {
    // title: 'Missions',
    title: <FormattedMessage {...messages.Missions} />,
    link: '/test-profile/privat/photos/missions',
  },
  {
    // title: 'Galleries',
    title: <FormattedMessage {...messages.Galleries} />,
    link: '/test-profile/privat/photos/galleries',
  },
];

export default () => {
  return (
    <div>
      <div className="title">My Photos</div>
      <div className="nav-bar">
        <div className="links">
          <ul>
            {generateNavItems.map(item => (
              <li key={item.link}>
                <Link
                  to={item.link}
                  activeClassName="nav-active"
                  className="nav-link"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="tools">
          <button>options</button>
          <button>search</button>
        </div>
      </div>
    </div>
  );
};
