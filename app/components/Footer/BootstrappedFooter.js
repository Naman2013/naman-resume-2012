import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import SocialMenu from 'components/GlobalNavigation/Menus/partials/SocialMenu';
import style from './Footer.style';

const Footer = ({
  primaryLinks,
  copyrightText,
}) => (
  <div className="root">
    <div className="button-container">
      <div dangerouslySetInnerHTML={{ __html: copyrightText }} />
      <ul className="buttons">
        {primaryLinks.map(item => (
          <li>
            <Link to={item.link}><span className="action">{item.name}</span></Link>
          </li>
        ))}
      </ul>
    </div>
    <ul className="buttons">
      <li>
        <a className="action social" href="#">
          <span className="fa fa-twitter" />
        </a>
      </li>
      <li>
        <a className="action social" href="#">
          <span className="fa fa-facebook" />
        </a>
      </li>
      <li>
        <a className="action social" href="#">
          <span className="fa fa-instagram" />
        </a>
      </li>
    </ul>
    <style jsx>{style}</style>
  </div>
);

Footer.propTypes = {
  primaryLinks: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    link: PropTypes.string,
  })),
  copyrightText: PropTypes.string,
};

Footer.defaultProps = {
  copyrightText: '',
  primaryLinks: [],
};

export default Footer;
