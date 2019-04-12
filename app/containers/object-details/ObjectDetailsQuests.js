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
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import Request from 'components/common/network/Request';
import CenterColumn from 'components/common/CenterColumn';
import DeviceProvider, { DeviceContext } from 'providers/DeviceProvider';
import ObjectDetailsSectionTitle from '../../components/object-details/ObjectDetailsSectionTitle';
import QuestHubTileBig from 'components/common/tiles/QuestHubTileBig';
import QuestHubTileSmall from 'components/common/tiles/QuestHubTileSmall';
import { OBJECT_QUESTS } from 'services/objects';

import {
  fetchObjectDetailsAction,
  fetchObjectQuestsAction,
} from '../../modules/object-details/actions';
import messages from './ObjectDetails.messages';
import styles from './ObjectDetailsQuests.style';

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
      intl,
      
    } = this.props;

    return (
      <Fragment>
        <DeviceProvider>
          <ObjectDetailsSectionTitle title={objectDetails.objectTitle + "'s"} subTitle={intl.formatMessage(messages.RelatedQuests)} />

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
                <DeviceContext.Consumer>
                  {context => (
                    <div className="root">
                      {serviceResponse && serviceResponse.relatedQuestsCount > 0 ? (
                        <div className="card-container__quests">
                          {!context.isMobile && serviceResponse.relatedQuestsList.map(quest => (
                            <div className="tile">
                              <QuestHubTileBig
                                {...quest}
                              />
                            </div>
                          ))}
                          {context.isMobile && serviceResponse.relatedQuestsList.map(quest => (
                            <div className="tile">
                              <QuestHubTileSmall {...quest} />
                            </div>
                          ))}
                        </div>
                      ) :
                        (
                          <div>
                            <p>
                              <FormattedMessage
                                {...messages.NoQuests}
                                values={{ objectTitle: objectDetails.objectTitle }}
                              />
                            </p>
                          </div>
                      )}
                    </div>
                  )}
                </DeviceContext.Consumer>
              )}
            />
          </CenterColumn>
          <style jsx>{styles}</style>
        </DeviceProvider>
      </Fragment>
    );
  }
}

Quests.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Quests);
