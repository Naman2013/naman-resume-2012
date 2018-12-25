/** *********************************
 * V4 [Ask Astronomer] ]Navigation
 *  Wrapper for SubPageNavigation component
 ********************************** */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import SubPageNavigation from '../common/sub-page-navigation';
import messages from './Navigation.messages';

const generateNavItems = objectId => [
  {
    title: <FormattedMessage {...messages.Overview} />,
    link: `/object-details/${objectId}/overview`,
  },
  {
    title: <FormattedMessage {...messages.Missions} />,
    link: `/object-details/${objectId}/missions`,
  },
  {
    title: <FormattedMessage {...messages.Quests} />,
    link: `/object-details/${objectId}/quests`,
  },
  {
    title: <FormattedMessage {...messages.Ask} />,
    link: `/object-details/${objectId}/ask`,
  },
  {
    title: <FormattedMessage {...messages.Observations} />,
    link: `/object-details/${objectId}/observations`,
  },
  {
    title: <FormattedMessage {...messages.Shows} />,
    link: `/object-details/${objectId}/shows`,
  },
  {
    title: <FormattedMessage {...messages.Stories} />,
    link: `/object-details/${objectId}/stories`,
  },
];

const Navigation = ({ items, objectId }) => (
  <div className="navigation-root">
    <SubPageNavigation items={generateNavItems(objectId)} />
  </div>
);

Navigation.defaultProps = {};

Navigation.propTypes = {};

export default Navigation;
