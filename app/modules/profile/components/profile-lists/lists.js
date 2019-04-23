import React, { Component, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { DeviceContext } from 'app/providers/DeviceProvider';
import HubContainer from 'app/components/common/HubContainer';
import GuideTopics from 'app/components/guides/GuideTopics';
import StoryTiles from 'app/components/stories-hub/stories-tiles';
import GuideTiles from 'app/components/guides-hub/guide-tiles';
import ShowTiles from 'app/components/shows-hub/show-tiles';
import isEmpty from 'lodash/fp/isEmpty';
import messages from './my-lists.messages';

class Lists extends Component {
  state = { tiles: [], items: [] };

  getModeledTiles = (filterType, profileLists, interestsList) => {
    const { tiles } = this.state;
    const { itemList } = profileLists;
    let mergedTiles = [].concat(
      tiles,
      filterType === 'object' ? interestsList : itemList
    );
    switch (filterType) {
      case 'story':
        return mergedTiles.map(x => ({
          iconURL: x.imageURL,
          imageUrl: x.imageURL,
          title: x.itemTitle,
          postId: x.itemId,
          author: x.author || 'PLACEHOLDER AUTHOR',
          linkLabel: x.linkLabel || 'BUTTON',
          linkUrl: x.linkURL,
          promptIconUrl: x.promptIconUrl,
          readingListPrompt: x.readingListPrompt,
          readingListType: x.readingListType,
          shortDescription: x.shortDescription || 'PLACEHOLDER DESCRIPTION',
          toggleReadingListFlag: x.toggleReadingListFlag,
          toggleFollowConfirmationFlag: x.toggleFollowConfirmationFlag,
          toggleFollowConfirmationPrompt: x.toggleFollowConfirmationPrompt,
        }));
      case 'show':
        return mergedTiles.map(x => ({
          eventTitle: x.itemTitle,
          linkUrl: x.linkURL,
          eventId: x.itemId,
          airdateDisplay: x.displayDate || 'PLACEHOLDER DATE',
          linkLabel: x.linkLabel || 'BUTTON',
          promptIconUrl: x.promptIconUrl,
          readingListPrompt: x.readingListPrompt,
          readingListType: x.readingListType,
          shortDescription: x.shortDescription || 'PLACEHOLDER DESCRIPTION',
          toggleReadingListFlag: x.toggleReadingListFlag,
          toggleFollowConfirmationFlag: x.toggleFollowConfirmationFlag,
          toggleFollowConfirmationPrompt: x.toggleFollowConfirmationPrompt,
        }));
      case 'guide':
        return mergedTiles.map(x => ({
          title: x.itemTitle,
          linkUrl: x.linkURL,
          guideAuthor: x.author || 'PLACEHOLDER AUTHOR',
          guideId: x.itemId,
          guideReferenceTitle: x.itemTitle,
          linkLabel: x.linkLabel || 'BUTTON',
          promptIconUrl: x.promptIconUrl,
          readingListPrompt: x.readingListPrompt,
          readingListType: x.readingListType,
          shortDescription: x.shortDescription || 'PLACEHOLDER DESCRIPTION',
          toggleReadingListFlag: x.toggleReadingListFlag,
          toggleFollowConfirmationFlag: x.toggleFollowConfirmationFlag,
          toggleFollowConfirmationPrompt: x.toggleFollowConfirmationPrompt,
        }));
      case 'object':
        return mergedTiles.map(x => ({
          title: x.title,
          linkURL: x.linkUrl,
          iconURL: x.objectIconUrl,
        }));
      default:
        return tiles;
    }
  };

  updateTilesList = () => {
    const { profileLists, params, data } = this.props;
    const { itemList } = profileLists;
    this.setState(() => ({
      tiles:
        params.filterType === 'object'
          ? data.interestsList
          : itemList,
    }));
  };

  GetTiles = (filterType, profileLists, interestsList, props) => {
    const tiles = this.getModeledTiles(filterType, profileLists, interestsList);
    switch (filterType) {
      case 'object':
        return <GuideTopics {...props} list={tiles} />;
      case 'story':
        return <StoryTiles {...props} stories={tiles} />;
      case 'guide':
        return <GuideTiles {...props} guides={tiles} />;
      case 'show':
        return <ShowTiles {...props} shows={tiles} />;
      default:
        return null;
    }
  };

  updateItemInfo = (id, resData) => {
    const { tiles } = this.state;
    let newItemsList = [].concat(tiles);
    newItemsList = newItemsList.map(item => {
      if (item.itemId === id) {
        return Object.assign(item, resData);
      }
      return item;
    });

    this.setState(() => ({
      items: newItemsList,
    }));
  };

  appendToTilesList = () => {
    const { params, profileLists, data } = this.props;
    const { itemList } = profileLists;
    this.setState(state => {
      const tiles = [].concat(
        state.tiles,
        params.filterType === 'object'
          ? data.interestsList
          : itemList
      );
      return { tiles };
    });
  };

  clearTiles = () => {
    this.setState({ tiles: [] });
  };

  render() {
    const {
      filterType,
      filterOptions,
      intl,
      profileLists,
      data: { interestsList },
    } = this.props;
    return (
      <DeviceContext.Consumer>
        {context => (
          <HubContainer
            page={1}
            profile
            {...context}
            {...this.props}
            hubName="reading_list"
            filterOptions={filterOptions}
            responseFieldNames={{
              currentCount: 'groupsCount',
              totalCount: 'resultsCount',
            }}
            useSort={false}
            filterTypeFieldName="readingListType"
            updateList={this.updateTilesList}
            appendToList={this.appendToTilesList}
            pageTitle="My Lists"
            filterType={filterType}
            clearTiles={this.clearTiles}
            showHeaderIcon={false}
            render={() => (
              <Fragment>
                {this.GetTiles(filterType, profileLists, interestsList, {
                  closeModal: this.closeModal,
                  updateReadingListInfo: this.updateItemInfo,
                  updatePrompt: this.updatePrompt,
                  isMobile: context.isMobile,
                }) || <div>{intl.formatMessage(messages.NoTiles)}</div>}
              </Fragment>
            )}
          />
        )}
      </DeviceContext.Consumer>
    );
  }
}

export default injectIntl(Lists);
