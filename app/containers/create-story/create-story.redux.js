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
    cancelLabel,
    categories,
    categoryList,
    diyText,
    humanSpiritText,
    introText,
    postUUID,
    scienceLogText,
    sectionLabels,
    submitLabel,
  }) => {
    if (!apiError) {
      this.setState(() => ({
        uuid: postUUID,
        contentCategoriesDescText: {
          artCultureText,
          diyText,
          humanSpiritText,
          scienceLogText,
        },
        cancelLabel,
        contentCategories: categories,
        introText,
        objectCategoriesList: categoryList,
        sectionLabels,
        submitLabel,
      }));
    }
  }

  render() {
    const {
      cancelLabel,
      contentCategories,
      contentCategoriesDescText,
      introText,
      objectCategoriesList,
      sectionLabels,
      submitLabel,
      uuid,
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
              cancelLabel={cancelLabel}
              submitLabel={submitLabel}
              sectionLabels={sectionLabels}
              introText={introText}
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
