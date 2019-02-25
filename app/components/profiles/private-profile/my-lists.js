import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';
import HubContainer from '../../common/HubContainer';
import Request from '../../common/network/Request';
import { DeviceContext } from '../../../providers/DeviceProvider';
import { GET_READING_LIST, GET_PAGE_PRIVATE_PROFILE } from '../../../services/profile';
import GuideTopics from '../../guides/GuideTopics';
import StoryTiles from '../../stories-hub/stories-tiles';
import GuideTiles from '../../guides-hub/guide-tiles';
import ShowTiles from '../../shows-hub/show-tiles';
import messages from './my-lists.messages';

const readingListModel = {
  name: 'READING_LIST_MODEL',
  model: resp => ({
    filterOptions: resp.navigationConfig,
  }),
};

export default injectIntl(class MyListsHub extends React.Component {
  state = {
    tiles: [],
  };

  getModeledTiles = (filterType) => {
    const { tiles } = this.state;
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

  updateTilesList = (resData) => {
    this.setState(() => ({
      tiles:
        this.props.params.filterType === 'object'
          ? resData.interestsList
          : resData.itemList,
    }));
  };

  GetTiles = (filterType, props) => {
    const tiles = this.getModeledTiles(filterType);
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
    let newItemsList = [].concat(this.state.tiles);
    newItemsList = newItemsList.map((item) => {
      if (item.itemId == id) {
        return Object.assign(item, resData);
      }
      return item;
    });

    this.setState(() => ({
      items: newItemsList,
    }));
  };

  appendToTilesList = (resData) => {
    this.setState((state) => {
      const tiles = [].concat(
        state.tiles,
        this.props.params.filterType === 'object'
          ? resData.interestsList
          : resData.itemList,
      );
      return {
        tiles,
      };
    });
  };

  clearTiles = () => {
    this.setState({ tiles: [] });
  };

  render() {
    const { intl, profileMenuList } = this.props;

    const hubFilters = profileMenuList.find(mItem => mItem.name === 'Lists').subMenus;
    const formatedHubFilter = hubFilters.map(filter => ({
      title: filter.name,
      linkURL: filter.linkUrl,
    }));

    const api =
      this.props.params.filterType === 'object'
        ? GET_PAGE_PRIVATE_PROFILE
        : GET_READING_LIST;
    const count = this.props.params.filterType === 'object' ? 0 : 9;

    const filterOptions = [
      {
        title: intl.formatMessage(messages.Objects),
        linkURL: '/profile/private/lists/object',
      },
      {
        title: intl.formatMessage(messages.Stories),
        linkURL: '/profile/private/lists/story',
      },
      {
        title: intl.formatMessage(messages.Shows),
        linkURL: '/profile/private/lists/show',
      },
      {
        title: intl.formatMessage(messages.Guides),
        linkURL: '/profile/private/lists/guide',
      }
    ];

    return (
      <div>
        <Request
          serviceURL={api}
          model={readingListModel}
          requestBody={{ readingListType: this.props.params.filterType }}
          render={({
            fetchingContent,
            modeledResponses: { GROUP_HUB_MODEL },
            serviceResponse = {}
          }) => (
              <Fragment>
                {!fetchingContent && (
                  <DeviceContext.Consumer>
                    {context => (
                      <HubContainer
                        {...this.props}
                        filterOptions={filterOptions}
                        {...context}
                        hubName='reading_list'
                        paginateURL={api}
                        page={1}
                        count={count}
                        // user={user}
                        filterTypeFieldName='readingListType'
                        // validateResponseAccess={actions.validateResponseAccess}
                        responseFieldNames={{
                          currentCount: 'groupsCount',
                          totalCount: 'resultsCount',
                        }}
                        updateList={this.updateTilesList}
                        appendToList={this.appendToTilesList}
                        pageTitle={serviceResponse.listTitle}
                        filterType={this.props.params.filterType}
                        clearTiles={this.clearTiles}
                        useSort={false}
                        showHeaderIcon={false}
                        render={() => (
                          <Fragment>
                            {fetchingContent ? (
                              <div>{intl.formatMessage(messages.Loading)}</div>
                            ) : null}

                            {!fetchingContent &&
                              this.state.tiles &&
                              this.state.tiles.length ? (
                                this.GetTiles(this.props.params.filterType, {
                                  closeModal: this.closeModal,
                                  updateReadingListInfo: this.updateItemInfo,
                                  updatePrompt: this.updatePrompt,
                                  isMobile: context.isMobile,
                                })
                              ) : (
                                <div>{intl.formatMessage(messages.NoTiles)}</div>
                              )}
                          </Fragment>
                        )}
                      />
                    )}
                  </DeviceContext.Consumer>
                )}
              </Fragment>
            )}
        />
      </div>
    );
  }
}
);
