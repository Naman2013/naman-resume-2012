/***********************************
* V4 Private Profile Observations
*
*
*
***********************************/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSharedMemberPhotos } from '../../../modules/get-shared-member-photos/actions';
import MyObservationItem from './my-observation-item';
import { black, darkBlueGray, white, turqoise } from '../../../styles/variables/colors';
import { secondaryFont } from '../../../styles/variables/fonts';

const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

const mapStateToProps = ({
  sharedMemberPhotos,
}) => ({
  sharedMemberPhotos,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getSharedMemberPhotos,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class MyObservations extends Component {
  static defaultProps = {
    sharedMemberPhotos: {},
  }

  static propTypes = {
    actions: shape({
      getSharedMemberPhotos: func.isRequired,
    }),
    sharedMemberPhotos: shape({}),
    cid: string.isRequired,
  }

  state = {
    recentObs: true,
  }

  constructor(props) {
    super(props)

    props.actions.getSharedMemberPhotos({
      customerId: props.cid,
      orderByLikes: false,
      makeDetailsCall: true,
    });
  }

  setOrder = (type) => {
    const isRecentObs = type === 'recent';
    this.setState({
      recentObs: isRecentObs,
    });

    this.props.actions.getSharedMemberPhotos({
      customerId: this.props.cid,
      orderByLikes: !isRecentObs,
      makeDetailsCall: true,
    });
  }

  render() {
    const {
      sharedMemberPhotos,
    } = this.props;

    const {
      recentObs
    } = this.state;


    return (
      <div className="my-observations">
        <nav className="nav">
          <div
            className={classnames('nav-item', { emphasis: recentObs })}
            onClick={() => this.setOrder('recent')}
          >My Recent Observations</div>
          <div
            className={classnames('nav-item', { emphasis: !recentObs })}
            onClick={() => this.setOrder('likes')}>{`Observations I've Liked`}
          </div>
        </nav>
        <div>
          {sharedMemberPhotos.fetching && <div className="fa fa-spinner" />}
          {!sharedMemberPhotos.fetching && sharedMemberPhotos.imageList.map((image) => {
            const imageDetails = sharedMemberPhotos.allImages[image.customerImageId] || {};
            return (
              <MyObservationItem {...imageDetails} key={image.customerImageId} />
            )
          })}
        </div>
        <style jsx>{`
          .emphasis {
            font-weight: bold;
          }

          .nav {
            display: flex;
            flex-direction: row;
          }

          .nav-item {
            padding: 5px;
            cursor: pointer;
          }

        `}</style>
      </div>
    )
  }
}

export default MyObservations;
