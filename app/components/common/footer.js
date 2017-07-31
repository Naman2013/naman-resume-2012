import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import uniqueId from 'lodash/uniqueId';
import purgeHashURL from '../../utils/purgeHashURL';
import useAbsoluteURL from '../../utils/useAbsoluteURL';

import { primaryFont } from '../../styles/variables/fonts';
import { lightGray } from '../../styles/variables/colors';

function createLink(URL, htmlContent) {
  if (useAbsoluteURL(URL)) {
    return (
      <a
        className="link"
        href={URL}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    );
  }

  return (
    <Link
      className="link"
      to={purgeHashURL(URL)}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

const Footer = props => (
  <footer
    className="slooh-global-footer"
    style={{
      backgroundColor: props.footerBackgroundRGB,
    }}
  >
    <div className="columns">
      {
        props.menuList.map(menuList => (
          <div key={uniqueId()}>
            {
              menuList.map(menu =>
                <div key={uniqueId()}>
                  <span
                    className="header"
                    dangerouslySetInnerHTML={{ __html: menu.text }}
                  />

                  <ul className="list">
                    {
                      menu.menuItems.map(item => (
                        <li key={uniqueId()}>
                          {
                            item.itemLink
                              ? createLink(item.itemLink, item.menuItemText)
                              : <span dangerouslySetInnerHTML={{ __html: item.menuItemText }} />
                          }
                        </li>
                      ))}
                  </ul>

                </div>
              )
            }
          </div>
        ))}
    </div>
    <div>
      <span
        dangerouslySetInnerHTML={{ __html: props.copyrightNotice }}
        style={{
          color: props.copyrightRGB,
        }}
      />
      <span
        dangerouslySetInnerHTML={{ __html: props.hostname }}
        className="pull-right"
        style={{
          color: props.hostnameRGB,
        }}
      />
    </div>
    <style jsx>
    {`
      .slooh-global-footer {
        font-family: ${primaryFont};
        font-size: 0.75em;
        color: #fff;
        padding: 25px 10px 25px 0px;
        padding-left: 100px;
        background: #000;
        position: relative;
        z-index: 999;
      }
      .header {
        font-weight: bold;
      }
      .list {
        list-style: none;
        padding: 0;
      }
      .columns {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .link {
        color: ${lightGray};
      }
    `}
    </style>
  </footer>
);

Footer.propTypes = {
  copyrightNotice: PropTypes.string.isRequired,
  footerBackgroundRGB: PropTypes.string.isRequired,
  copyrightRGB: PropTypes.string.isRequired,
  hostname: PropTypes.string.isRequired,
  hostnameRGB: PropTypes.string.isRequired,
};

Footer.defaultProps = {
  menuList: [],
};

const mapStateToProps = ({ appConfig }) => ({
  ...appConfig,
});
const mapDispatchToProps = dispatch => (bindActionCreators({}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
