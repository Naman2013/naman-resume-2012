import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import ReactTooltip from 'react-tooltip'

const Footer = ({ primaryLinks, copyrightText, logoLinks }) => (

  <div className="root">
    <div className="footer-menu-wrapper" >
      <div dangerouslySetInnerHTML={{ __html: copyrightText }} />        
      <ul className="footer-menu buttons">
        {primaryLinks.map(item => (
          <li key={uniqueId()}>
            <Link target="_blank" to={item.link}>
              <span className="action">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
    
    <ul className="footer-social buttons">
      {logoLinks.map((item,index) => (
        <li key={uniqueId()}>
          <div class="footer-img">            
            <ReactTooltip id={"logo"+index} place="bottom" effect="solid" />
            <img data-tip={item.name} data-for={"logo"+index} src={item.link} />
          </div>
        </li>
      ))}
    </ul>
    
  
    {/* <ul className="footer-social buttons">
      <li>
        <a className="action social" href="#">
          <span className="fa fa-facebook" />
        </a>
      </li>

      <li>
        <a className="action social" href="#">
          <span className="fa fa-twitter" />
        </a>
      </li>

      <li>
        <a className="action social" href="#">
          <span className="fa fa-instagram" />
        </a>
      </li>
    </ul> */}

  </div>
);

Footer.propTypes = {
  primaryLinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      link: PropTypes.string,
    })
  ),
  logoLinks: PropTypes.arrayOf(
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
  logoLinks: [],
};

export default Footer;
