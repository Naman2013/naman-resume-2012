import React, { Component, PropTypes } from 'react';
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
      background: `url(${this.props.imageUrl}) no-repeat center center`,
      backgroundCover: 'cover',
      minHeight: '180px',
    };
    return (
      <div
        className="viewable-object"
        style={viewableObjectInlineStyle}
      >
        <BusinessLink type={this.props.type} url={this.props.url}>
          <h5 className="title">{this.props.title}</h5>
        </BusinessLink>
      </div>
    );
  }
}

ViewableObject.propTypes = {
  url: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ViewableObject;
