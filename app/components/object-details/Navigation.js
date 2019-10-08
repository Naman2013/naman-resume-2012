/** *********************************
 * V4 [Ask Astronomer] ]Navigation
 *  Wrapper for SubPageNavigation component
 ********************************** */

import React from 'react';
import { useTranslation } from 'react-i18next';
import SubPageNavigation from '../common/sub-page-navigation';
import messages from './Navigation.messages';

const generateNavItems = (objectId, t) => [
  {
    title: t('.Overview'),
    link: `/object-details/${objectId}/overview`,
  },
  {
    title: t('.Missions'),
    link: `/object-details/${objectId}/missions`,
  },
  {
    title: t('.Quests'),
    link: `/object-details/${objectId}/quests`,
  },
  {
    title: t('.Ask'),
    link: `/object-details/${objectId}/ask`,
  },
  {
    title: t('.Observations'),
    link: `/object-details/${objectId}/observations`,
  },
  {
    title: t('.Shows'),
    link: `/object-details/${objectId}/shows`,
  },
  {
    title: t('.Stories'),
    link: `/object-details/${objectId}/stories`,
  },
];

const Navigation = ({ items, objectId }) => {
  const { t } = useTranslation();
  return (
    <div className="navigation-root">
      <SubPageNavigation items={generateNavItems(objectId, t)} />
    </div>
  );
};

Navigation.defaultProps = {};

Navigation.propTypes = {};

export default Navigation;
