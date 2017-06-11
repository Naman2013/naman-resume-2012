import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { primaryFont } from '../../styles/variables/fonts';
import { lightGray } from '../../styles/variables/colors';

const {
  string,
} = PropTypes;

const Footer = props => (
  <footer
    className="slooh-global-footer"
    style={{
      backgroundColor: props.footerBackgroundRGB,
    }}
  >
    <div className="columns">
    {props.menuList.map(menuList => (<div>
      {menuList.map(menu => <div>
        <span
            dangerouslySetInnerHTML={{ __html: menu.text }}
        />
        <ul className="list">
          {menu.menuItems.map(item => (<li><a className="link" href={item.itemLink}>
            <span
                dangerouslySetInnerHTML={{ __html: item.menuItemText }}
            />
            </a></li>))}
        </ul>
      </div>)}
    </div>))}
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
        padding: 25px 0;
        padding-left: 100px;
        background: #000;
        position: relative;
        z-index: 999;
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
  copyrightNotice: string.isRequired,
  footerBackgroundRGB: string.isRequired,
  copyrightRGB: string.isRequired,
  hostname: string.isRequired,
  hostnameRGB: string.isRequired,
};

Footer.defaultProps = {
  menuList: [],
};

const mapStateToProps = ({ appConfig }) => ({
  ...appConfig,
});
const mapDispatchToProps = dispatch => (bindActionCreators({}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
