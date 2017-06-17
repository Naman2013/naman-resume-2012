import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchRecordedShow } from '../../modules/show-video-viewer/recorded-show-actions';

const {
  bool,
  number,
  string,
  shape,
  func,
  arrayOf,
} = PropTypes;

function mapStateToProps({ videoViewerShow }) {
  return {
    ...videoViewerShow,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchRecordedShow
    }, dispatch),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class ShowVideoViewer extends Component {
  static propTypes = {
    actions: shape({
      fetchRecordedShow: func,
    }),
  }
  static defaultProps = {
    actions: {
      fetchRecordedShow: _.noop,
    },
  }
  constructor(props) {
    super(props);

    const { actions, params: { showId } } = props;

    actions.fetchRecordedShow({
      showId,
    });
  }
  render() {
    const {
      actions,
    } = this.props;
    console.log('props', this.props)
    return (
      <div>
      </div>
    );
  }

}

export default ShowVideoViewer;
