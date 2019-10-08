import React, { Component, Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router';
import { DeviceContext } from 'app/providers/DeviceProvider';
import HubContainer from 'app/components/common/HubContainer';
import GuideTopics from 'app/components/guides/GuideTopics';
import StoryTiles from 'app/components/stories-hub/stories-tiles';
import GuideTiles from 'app/components/guides-hub/guide-tiles';
import ShowTiles from 'app/components/shows-hub/show-tiles';
import isEmpty from 'lodash/fp/isEmpty';

@withTranslation
class Lists extends Component {
  state = { tiles: [], items: [] };

  getModeledTiles = (filterType, itemList, interestsList) => {
    const { tiles } = this.state;
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
    const { profileLists, filterType, data } = this.props;
    const { itemList } = profileLists;
    const { interestsList } = data;
    this.setState(() => ({
      tiles: filterType === 'object' ? interestsList : itemList,
    }));
  };

  GetTiles = (filterType, props) => {
    const { profileLists, data, onUpdate } = this.props;
    const { interestsList } = data;
    const { itemList } = profileLists;
    const tiles = this.getModeledTiles(filterType, itemList, interestsList);
    switch (filterType) {
      case 'object':
        return (
          <GuideTopics
            {...props}
            list={tiles}
            emptyText={data.emptySetObjectsDisplay}
          />
        );
      case 'story':
        return (
          <StoryTiles
            {...props}
            stories={tiles}
            emptyText={profileLists.emptySetDisplay}
            onUpdate={onUpdate}
          />
        );
      case 'guide':
        return (
          <GuideTiles
            {...props}
            guides={tiles}
            emptyText={profileLists.emptySetDisplay}
            onUpdate={onUpdate}
          />
        );
      case 'show':
        return (
          <ShowTiles
            {...props}
            shows={tiles}
            emptyText={profileLists.emptySetDisplay}
            onUpdate={onUpdate}
          />
        );
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
    const { filterType, profileLists, data } = this.props;
    const { itemList } = profileLists;
    const { interestsList } = data;
    this.setState(state => {
      const tiles = [].concat(
        state.tiles,
        filterType === 'object' ? interestsList : itemList
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
      profileLists,
      t,
      data,
      params,
    } = this.props;
    const { customerUUID } = params;
    if (!profileLists || !data) return null;
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
            pageTitle={customerUUID ? 'Lists' : 'My Lists'}
            filterType={filterType}
            clearTiles={this.clearTiles}
            showHeaderIcon={false}
            render={() => (
              <Fragment>
                {this.GetTiles(filterType, {
                  closeModal: this.closeModal,
                  updateReadingListInfo: this.updateItemInfo,
                  updatePrompt: this.updatePrompt,
                  isMobile: context.isMobile,
                }) || <div>{t('Photos.NoTiles')}</div>}
              </Fragment>
            )}
          />
        )}
      </DeviceContext.Consumer>
    );
  }
}

export default withRouter(Lists);
