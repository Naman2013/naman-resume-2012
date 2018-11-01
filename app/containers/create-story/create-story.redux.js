/***********************************
* V4 Create Story - connected with redux
***********************************/

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
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
    contentCategoriesDescText: {},
    objectCategoriesList: [],
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

  goToHubs = () => {
    const { category } = this.props;
    browserHistory.push(`/stories/${category}`);
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
    categories,
  }) => {
    if (!apiError) {
      this.setState(() => ({
        uuid: postUUID,
        contentCategoriesDescText: {
          artCultureText,
          diyText,
          humanSpiritText,
          introText,
          scienceLogText,
        },
        objectCategoriesList: categoryList,
        contentCategories: categories,
      }));
    }
  }

  handleSubmit = (fields) => {

  }

  render() {
    const {
      } = this.props;

    const {
      uuid,
      contentCategoriesDescText,
      objectCategoriesList,
      contentCategories
    } = this.state;

    const userActions = {
      goToHubs: this.goToHubs,
    };


    return (
      <Fragment>
        <DeviceContext.Consumer>
          {context => (
            <CreateStory
              {...this.props}
              {...context}
              uuid={uuid}
              userActions={userActions}
              contentCategoriesDescText={contentCategoriesDescText}
              objectCategoriesList={objectCategoriesList}
              contentCategories={contentCategories}
              submitStory={this.handleSubmit}
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
