import React, { Component, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { DeviceContext } from 'app/providers/DeviceProvider';
import HubContainer from 'app/components/common/HubContainer';
import GuideTopics from 'app/components/guides/GuideTopics';
import StoryTiles from 'app/components/stories-hub/stories-tiles';
import GuideTiles from 'app/components/guides-hub/guide-tiles';
import ShowTiles from 'app/components/shows-hub/show-tiles';
import messages from './my-lists.messages';

class Lists extends Component {
  state = { tiles: [], items: [] };

  getModeledTiles = (filterType, profileLists) => {
    const tiles = profileLists.itemList || profileLists.interestsList;
    switch (filterType) {
      case 'story':
        return tiles.map(x => ({
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
          shortDescription: x.shortDescroption || 'PLACEHOLDER DESCRIPTION',
          toggleReadingListFlag: x.toggleReadingListFlag,
          toggleFollowConfirmationFlag: x.toggleFollowConfirmationFlag,
          toggleFollowConfirmationPrompt: x.toggleFollowConfirmationPrompt,
        }));
      case 'show':
        return tiles.map(x => ({
          eventTitle: x.itemTitle,
          linkUrl: x.linkURL,
          eventId: x.itemId,
          airdateDisplay: x.displayDate || 'PLACEHOLDER DATE',
          linkLabel: x.linkLabel || 'BUTTON',
          promptIconUrl: x.promptIconUrl,
          readingListPrompt: x.readingListPrompt,
          readingListType: x.readingListType,
          shortDescription: x.shortDescroption || 'PLACEHOLDER DESCRIPTION',
          toggleReadingListFlag: x.toggleReadingListFlag,
          toggleFollowConfirmationFlag: x.toggleFollowConfirmationFlag,
          toggleFollowConfirmationPrompt: x.toggleFollowConfirmationPrompt,
        }));
      case 'guide':
        return tiles.map(x => ({
          title: x.itemTitle,
          linkUrl: x.linkURL,
          guideAuthor: x.author || 'PLACEHOLDER AUTHOR',
          guideId: x.itemId,
          guideReferenceTitle: x.itemTitle,
          linkLabel: x.linkLabel || 'BUTTON',
          promptIconUrl: x.promptIconUrl,
          readingListPrompt: x.readingListPrompt,
          readingListType: x.readingListType,
          shortDescription: x.shortDescroption || 'PLACEHOLDER DESCRIPTION',
          toggleReadingListFlag: x.toggleReadingListFlag,
          toggleFollowConfirmationFlag: x.toggleFollowConfirmationFlag,
          toggleFollowConfirmationPrompt: x.toggleFollowConfirmationPrompt,
        }));
      case 'object':
        return tiles.map(x => ({
          title: x.title,
          linkURL: x.linkUrl,
          iconURL: x.objectIconUrl,
        }));
      default:
        return tiles;
    }
  };

  updateTilesList = () => {
    const { profileLists, params } = this.props;
    this.setState(() => ({
      tiles:
        params.filterType === 'object'
          ? profileLists.interestsList
          : profileLists.itemList,
    }));
  };

  GetTiles = (filterType, props) => {
    const tiles = this.getModeledTiles(filterType, props.profileLists);
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
    const { params, profileLists } = this.props;
    this.setState(state => {
      const tiles = [].concat(
        state.tiles,
        params.filterType === 'object'
          ? profileLists.interestsList
          : profileLists.itemList
      );
      return { tiles };
    });
  };

  clearTiles = () => {
    this.setState({ tiles: [] });
  };

  render() {
    const { filterType, filterOptions, profileLists, intl } = this.props;
    if (!profileLists) return null;
    return (
      <DeviceContext.Consumer>
        {context => (
          <HubContainer
            page={1}
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
                {this.GetTiles(filterType, {
                  profileLists,
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
