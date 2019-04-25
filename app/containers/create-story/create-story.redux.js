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
import storiesActions from 'app/modules/stories/actions';
import fetchCategoryTopicList from 'app/services/content/object-category-topic-list';


class ConnectedCreateStory extends Component {
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
    categoryList,
    diyText,
    fictionId,
    fictionPrompt,
    nonfictionId,
    nonfictionPrompt,
    humanSpiritText,
    introText,
    postUUID,
    scienceLogText,
    sectionLabels,
    submitLabel,
    headingPrompt,
    imagePrompt,
    noTagsMsg,
    tagLabel,
    tagPrompt,
    titlePrompt,
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
        introText,
        objectCategoriesList: categoryList,
        sectionLabels,
        submitLabel,
        contentCategories: [{ 
          title: fictionPrompt,
          value: fictionId,
        }, {
          title: nonfictionPrompt,
          value: nonfictionId,
        }],
        headingPrompt,
        imagePrompt,
        noTagsMsg,
        tagLabel,
        tagPrompt,
        titlePrompt,
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
      headingPrompt,
      imagePrompt,
      noTagsMsg,
      tagLabel,
      tagPrompt,
      titlePrompt,
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
              device={context}
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
              headingPrompt={headingPrompt}
              imagePrompt={imagePrompt}
              noTagsMsg={noTagsMsg}
              tagLabel={tagLabel}
              tagPrompt={tagPrompt}
              titlePrompt={titlePrompt}
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
