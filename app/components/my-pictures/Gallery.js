import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
  }, dispatch),
});

@connect(null, mapDispatchToProps)
class Gallery extends Component {
  static propTypes = {
    imageURL: PropTypes.string.isRequired,
    imageTitle: PropTypes.string.isRequired,
  }

  render() {
    const {
      imageURL,
      imageTitle,
    } = this.props;

    return (
      <Link
        className=""
        to={`my-pictures/missions/`}
        style={{ backgroundImage: `url(${imageURL})` }}
      >
        <div className="content">
          <div className="row"></div>
          <div className="row"></div>
        </div>
      </Link>
    );
  }
}

export default Gallery;
