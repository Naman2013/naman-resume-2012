import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import style from './viewable-object.scss';

const BusinessLink = ({ type, url, children }) => {
  if (type === 'external') {
    return <a className={style.viewableObjectLink} href={url}>{children}</a>
  }

  return <Link className={style.viewableObjectLink} to={url}>{children}</Link>
};

class ViewableObject extends Component {
  render() {
    const viewableObjectInlineStyle = {
      /* background: `url(${this.props.iconURL}) no-repeat center center`, */
      background: `url(${this.props.iconURL}) no-repeat center center`,
      backgroundCover: 'cover',
      paddingBottom: '20px',
      display: 'block',
    };

    const inlineViewableSection1Style = {
        display: 'block',
        minHeight: '125px',
        minWidth: '125px',
    };

    const inlineViewableSection2Style = {
      paddingTop: '0px',
      display: 'block',
      maxWidth: '160px',
    }

    return (
      <div>
        <div style={inlineViewableSection1Style}>
          <BusinessLink type={this.props.type} url={this.props.linkURL}>
            <div style={viewableObjectInlineStyle} className="viewableObject"/>
          </BusinessLink>
        </div>

        <div style={inlineViewableSection2Style}>
          <BusinessLink type={this.props.type} url={this.props.linkURL}>
            <h5 className="viewableObjectTitle">{this.props.shortTitle}</h5>
          </BusinessLink>
        </div>
      </div>
    );
  }
}

ViewableObject.propTypes = {
  url: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ViewableObject;
