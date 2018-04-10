import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSharedMemberPhotos } from '../../modules/get-shared-member-photos/actions';
import MyObservationItem from './my-observation-item';
import { black, darkBlueGray, white, turqoise } from '../../styles/variables/colors';
import { secondaryFont } from '../../styles/variables/fonts';

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

  constructor(props) {
    super(props)

    props.actions.getSharedMemberPhotos({
      customerId: props.cid,
      orderByLikes: true,
      makeDetailsCall: true,
    });
  }

  render() {
    const {
      sharedMemberPhotos,
    } = this.props;

    return (
      <div className="my-observations">
        <div>
          <h3>My Observations</h3>
          <h4>Recent Activity on Slooh</h4>
        </div>
        <nav>
          <div>My Recent Observations</div>
          <div>{`Observations I've Liked`}</div>
        </nav>
        <div>
          {sharedMemberPhotos.imageList.map((image) => {
            const imageDetails = sharedMemberPhotos.allImages[image.customerImageId] || {};
            return (
              <MyObservationItem {...imageDetails} key={image.customerImageId} />
            )
          })}
        </div>
        <style jsx>{`


        `}</style>
      </div>
    )
  }
}

export default MyObservations;
