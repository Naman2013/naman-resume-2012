import React, { Fragment } from 'react';
import Request from '../../common/network/Request';
import HubContainer from 'components/common/HubContainer';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import ShowMoreWithNetwork from 'components/common/show-more-with-network';
import { GROUPS_PAGE_ENDPOINT_URL, GET_GROUPS } from 'services/community-groups';
import Button from 'components/common/style/buttons/Button';
import { DeviceContext } from 'providers/DeviceProvider';
import { intlShape, injectIntl } from 'react-intl';
import { GET_READING_LIST } from '../../../services/profile';
import LailaTile from '../../common/tiles/LailaTile';
import StoryTiles from '../../stories-hub/stories-tiles';
import GuideTiles from '../../guides-hub/guide-tiles';
import ShowTiles from '../../shows-hub/show-tiles';

const readingListModel = {
  name: 'READING_LIST_MODEL',
  model: resp => ({
    filterOptions: resp.navigationConfig,
    // sortOptions: resp.filterOptions.options,
  }),
};

const filterOptions = [
  {
    title: 'Objects',
    linkURL: '/lists/my-lists/object',
  },
  {
    title: 'Stories',
    linkURL: '/lists/my-lists/story',
  },
  {
    title: 'Shows',
    linkURL: '/lists/my-lists/show',
  },
  {
    title: 'Guides',
    linkURL: '/lists/my-lists/guide',
  },
];

const GetTiles = (filterType, props) => {
  switch (filterType) {
    case 'object':
      return <LailaTile {...props} />;
    case 'story':
      return <StoryTiles {...props} />;
    case 'guide':
      return <GuideTiles {...props} />;
    case 'show':
      return <ShowTiles {...props} />;
    default:
      return null;
  }
};

export default injectIntl(class MyListsHub extends React.Component {
    state = {
      tiles: [],
    };

    updateGroupsList = (resData) => {
      this.setState(() => ({
        tiles: resData.itemList,
      }));
    };

    updateGroupItemInfo = (id, resData) => {
      let newItemsList = [].concat(this.state.tiles);
      newItemsList = newItemsList.map((item) => {
        if (item.itemId === id) {
          return Object.assign(item, resData);
        }
        return item;
      });

      this.setState(() => ({
        items: newItemsList,
      }));
    };

    appendToGroupsList = (resData) => {
      this.setState((state) => {
        const tiles = [].concat(state.groups, resData.itemList);
        return {
          tiles,
        };
      });
    };

    // submitRequestForm = ({
    //   requestFormTitle,
    //   requestFormText,
    //   requestFormPrivacy,
    // }) => {
    //   const { actions, user, intl } = this.props;
    //   requestGroup({
    //     at: user.at,
    //     token: user.token,
    //     cid: user.cid,
    //     title: requestFormTitle,
    //     access: requestFormPrivacy,
    //     definition: requestFormText,
    //   })
    //     .then((res) => {
    //       if (!res.data.apiError) {
    //         this.setState({
    //           showPrompt: res.data.showResponse,
    //           promptText: (<RequestGroupFormFeedback
    //             promptText={res.data.response}
    //             closeForm={this.closeModal}
    //             requestNew={this.requestGroup}
    //           />),
    //         });
    //       } else {
    //         this.setState({
    //           showPrompt: true,
    //           promptText: (<RequestGroupFormFeedback
    //             promptText={intl.formatMessage(messages.errorSubmitting)}
    //             closeForm={this.closeModal}
    //             requestNew={this.requestGroup}
    //           />),
    //         });
    //       }
    //       actions.validateResponseAccess(res);
    //     });
    // }

    // requestGroup = () => {
    //   this.setState({
    //     showPrompt: true,
    //     promptText: <RequestGroupForm
    //       submitForm={this.submitRequestForm}
    //       closeForm={this.closeModal}
    //     />
    //   });
    // }

    // updatePrompt = (data) => {
    //   this.setState({
    //     showPrompt: data.showPrompt,
    //     promptText: <PromptWithClose
    //       promptText={data.promptText}
    //       closeForm={this.closeModal}
    //     />,
    //   })
    // }

    // closeModal = () => {
    //   this.setState({
    //     showPrompt: false,
    //     promptText: '',
    //   });
    // }

    clearGroups = () => {
      this.setState({
        tiles: [],
      });
    };

    render() {
      const tiles = this.state.tiles.map(x => ({
        title: x.itemTitle,
        eventTitle: x.itemTitle,
        eventId:x.itemId,
        postId: x.itemId,
        itemId: x.itemId,
        author: x.author,
        guideAuthor: x.author,
        shortDescription: x.description,
        linkUrl: x.linkURL,
        linkLabel:x.linkLabel,
        guideReferenceTitle: x.itemTitle,
        imageUrl: x.imageURL,
        promptIconUrl: x.promptIconUrl,
        readingListType: x.readingListType,
        toggleReadingListFlag: true,
        readingListPrompt: x.readingListPrompt,
        actionIconUrl: x.actionIconUrl,
        toggleFollowConfirmationFlag: true,

      }));
      const { intl } = this.props;
      return (
        <div>
          <Request
            serviceURL={GET_READING_LIST}
            model={readingListModel}
            requestBody={{ readingListType: this.props.params.filterType }}
            render={({
              fetchingContent,
              modeledResponses: { GROUP_HUB_MODEL },
              serviceResponse = {},
            }) => (
              <Fragment>
                {!fetchingContent && (
                  <DeviceContext.Consumer>
                    {context => (
                      <HubContainer
                        {...this.props}
                        filterOptions={filterOptions}
                        {...context}
                        hubName="reading_list"
                        paginateURL={GET_READING_LIST}
                        page={1}
                        count={9}
                        // user={user}
                        filterTypeFieldName="readingListType"
                        // validateResponseAccess={actions.validateResponseAccess}
                        responseFieldNames={{
                          currentCount: 'groupsCount',
                          totalCount: 'resultsCount',
                        }}
                        updateList={this.updateGroupsList}
                        appendToList={this.appendToGroupsList}
                        iconURL={serviceResponse.pageIconURL}
                        pageTitle={serviceResponse.pageTitle}
                        filterType={this.props.params.filterType}
                        clearTiles={this.clearGroups}
                        render={() => (
                          <Fragment>
                            {/* {fetchingContent ? (
                            <div>{intl.formatMessage(messages.loading)}</div>
                          ) : null} */}

                            {!fetchingContent && tiles.length
                              ? GetTiles(this.props.params.filterType, {
                                  closeModal: this.closeModal,
                                  updateReadingListInfo: this.updateGroupItemInfo,
                                  updatePrompt: this.updatePrompt,
                                  stories: tiles,
                                  guides: tiles,
                                  shows: tiles,
                                  isMobile: context.isMobile,
                                })
                              : ''
                                // <div>{intl.formatMessage(messages.noGroups)}</div>
                            }
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
});
