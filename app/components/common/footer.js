import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import style from './footer.scss';

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
  </footer>
);

Footer.propTypes = {
  copyrightNotice: string.isRequired,
  footerBackgroundRGB: string.isRequired,
  copyrightRGB: string.isRequired,
  hostname: string.isRequired,
  hostnameRGB: string.isRequired,
};

const mapStateToProps = ({ appConfig }) => ({
  ...appConfig,
});
const mapDispatchToProps = dispatch => (bindActionCreators({}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
