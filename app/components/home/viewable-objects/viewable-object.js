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
    };

    return (
      <div
        className="viewable-object"
        style={viewableObjectInlineStyle}
      >
        <BusinessLink type={this.props.type} url={this.props.linkURL}>
          <h5 className="title">{this.props.shortTitle}</h5>
        </BusinessLink>
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
