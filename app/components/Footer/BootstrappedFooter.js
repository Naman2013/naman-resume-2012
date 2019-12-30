import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import SocialMenu from 'app/components/GlobalNavigation/Menus/partials/SocialMenu';
import style from './Footer.style';

const Footer = ({ primaryLinks, copyrightText }) => (
  <div className="root">
    <div className="button-container">
      <div dangerouslySetInnerHTML={{ __html: copyrightText }} />
      <ul className="buttons">
        {primaryLinks.map(item => (
          <li key={uniqueId()}>
            <Link target="_blank" to={item.link}>
              <span className="action">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
    <style jsx>{style}</style>
  </div>
);

Footer.propTypes = {
  primaryLinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      link: PropTypes.string,
    })
  ),
  copyrightText: PropTypes.string,
};

Footer.defaultProps = {
  copyrightText: '',
  primaryLinks: [],
};

export default Footer;
