/***********************************
* V4 Create Story - connected with redux
***********************************/

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DeviceContext } from 'providers/DeviceProvider';
import CreateStory from './create-story';
import { validateResponseAccess } from '../../modules/authorization/actions';
import storiesActions from 'modules/stories/actions';
import fetchCategoryTopicList from 'services/content/object-category-topic-list';

const {
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;


class ConnectedCreateStory extends Component {

  static propTypes = {

  }

  static defaultProps = {

  }

  state = {
    uuid: null,
    categoryDescText: {},
    categoryList: [],
  }

  componentDidMount() {
    const { actions, user } = this.props;

    fetchCategoryTopicList({
      at: user.at,
      token: user.token,
      cid: user.cid,
      callSource: 'postPage',
    }).then((res) => {
      actions.validateResponseAccess(res);
      return this.handleCategoryTopicResponse(res.data);
    });
  }

  handleCategoryTopicResponse = ({
    apiError,
    artCultureText,
    categoryList,
    diyText,
    humanSpiritText,
    introText,
    postUUID,
    scienceLogText,
  }) => {
    if (!apiError) {
      this.setState(() => ({
        uuid: postUUID,
        categoryDescText: {
          artCultureText,
          diyText,
          humanSpiritText,
          introText,
          scienceLogText,
        },
        categoryList,
      }));
    }
  }

  render() {
    const {
      } = this.props;

    const {
      uuid,
      categoryDescText,
      categoryList,
    } = this.state;


    return (
      <Fragment>
        <DeviceContext.Consumer>
          {context => (
            <CreateStory
              {...this.props}
              {...context}
              uuid={uuid}
              categoryDescText={categoryDescText}
              categoryList={categoryList}
            />
          )}
        </DeviceContext.Consumer>
      </Fragment>
    )
  }
}

const mapStateToProps = ({
  user,
  stories,
}, {
  routeParams,
}) => ({
  user,
  ...stories,
  category: routeParams.filterType,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...storiesActions,
    validateResponseAccess,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedCreateStory);
