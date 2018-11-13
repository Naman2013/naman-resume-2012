/***********************************
* V4 Object Details : Quests
*   Markdown support on elements????
*   UTF-8 support....
*   Multi-National Languages.....
***********************************/

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import has from 'lodash/has';
import uniqueId from 'lodash/uniqueId';
import Request from 'components/common/network/Request';
import CenterColumn from 'components/common/CenterColumn';
import DeviceProvider from 'providers/DeviceProvider';
import ObjectDetailsSectionTitle from '../../components/object-details/ObjectDetailsSectionTitle';
import QuestTile from '../../components/common/tiles/QuestTile';
import { OBJECT_QUESTS } from 'services/objects';

import {
  fetchObjectDetailsAction,
  fetchObjectQuestsAction,
} from '../../modules/object-details/actions';

const mapStateToProps = ({ objectDetails, appConfig, user }) => ({
  objectDetails: objectDetails.objectDetails,
  appConfig,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchObjectDetailsAction,
    fetchObjectQuestsAction,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class Quests extends Component {

  render() {
    const {
      params: {
        objectId,
      },
      objectDetails,
    } = this.props;

    return (
      <Fragment>
        <DeviceProvider>
          <ObjectDetailsSectionTitle title={objectDetails.objectTitle + "'s"} subTitle="Related Quests" />

          <CenterColumn widths={['645px', '965px', '965px']}>
            <Request
              authorizationRedirect
              serviceURL={OBJECT_QUESTS}
              method="POST"
              serviceExpiresFieldName="expires"
              requestBody={{
                objectId,
              }}
              render={({
                fetchingContent,
                serviceResponse,
              }) => (
                <div className="root">
                  {serviceResponse && serviceResponse.questsCount > 0 ? (
                    <div className="card-container__quests">
                      {Object.keys(serviceResponse.questsList).map(quest => (
                        <QuestTile
                          key={uniqueId()}
                          title={quest.title}
                          iconURL={quest.iconURL}
                          anchorText={quest.linkLabel}
                        />
                      ))}
                    </div>
                  ) :
                    (
                      <div>
                        <p>Sorry, there are no quests available for {objectDetails.objectTitle} at this time.</p>
                      </div>
                  )}
                </div>
            )}
            />
          </CenterColumn>

        </DeviceProvider>
      </Fragment>
    )
  }
}
export default Quests;
