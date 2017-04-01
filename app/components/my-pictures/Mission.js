import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { loadFITImages } from '../../modules/my-pictures/actions';
import styles from './Mission.scss';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    loadFITImages,
  }, dispatch),
});

@connect(null, mapDispatchToProps)
class Mission extends Component {
  static propTypes = {
    scheduledMissionId: PropTypes.number,
    imageURL: PropTypes.string.isRequired,
    imageTitle: PropTypes.string.isRequired,
    missionDate: PropTypes.string.isRequired,
    objectIconURL: PropTypes.string.isRequired,
    fitsIsAvailable: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    scheduledMissionId: -1, // set to -1 since real ID's should never be negative
  }

  handleFITSCLick = (event) => {
    event.preventDefault();
    const { scheduledMissionId } = this.props;
    this.props.actions.loadFITImages({ scheduledMissionId });
  }

  render() {
    const {
      scheduledMissionId,
      imageURL,
      imageTitle,
      missionDate,
      objectIconURL,
      fitsIsAvailable,
    } = this.props;

    return (
      <Link
        className={styles.missionContainer}
        to={`my-pictures/missions/${scheduledMissionId}`}
        style={{ backgroundImage: `url(${imageURL})` }}
      >
        <div className="content">
          <div className="row"> <b>{imageTitle} </b> <br /> {missionDate} </div>
          <div className="row"><img height="80" src={objectIconURL} alt={imageTitle} /></div>
          <div className="row">{fitsIsAvailable ? <button onClick={this.handleFITSCLick} className="fits">FITS</button> : ''}</div>
        </div>
      </Link>
    );
  }
}

export default Mission;
