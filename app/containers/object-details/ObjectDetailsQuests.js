/***********************************
 * V4 Object Details : Quests
 *   Markdown support on elements????
 *   UTF-8 support....
 *   Multi-National Languages.....
 ***********************************/

import React, { Component, Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import has from 'lodash/has';
import uniqueId from 'lodash/uniqueId';
import Request from 'app/components/common/network/Request';
import CenterColumn from 'app/components/common/CenterColumn';
import DeviceProvider, { DeviceContext } from 'providers/DeviceProvider';
import QuestHubTileBig from 'app/components/common/tiles/QuestHubTileBig';
import QuestHubTileSmall from 'app/components/common/tiles/QuestHubTileSmall';
import { OBJECT_QUESTS } from 'app/services/objects';
import ObjectDetailsSectionTitle from '../../components/object-details/ObjectDetailsSectionTitle';

import {
  fetchObjectDetailsAction,
  fetchObjectQuestsAction,
} from '../../modules/object-details/actions';
import styles from './ObjectDetailsQuests.style';

const mapStateToProps = ({ objectDetails, appConfig, user }) => ({
  objectDetails: objectDetails.objectDetails,
  appConfig,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      fetchObjectDetailsAction,
      fetchObjectQuestsAction,
    },
    dispatch
  ),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@withTranslation()
class Quests extends Component {
  render() {
    const {
      params: { objectId },
      objectDetails,
      t,
    } = this.props;

    return (
      <Fragment>
        <DeviceProvider>
          <ObjectDetailsSectionTitle
            title={`${objectDetails.objectTitle}'s`}
            subTitle={t('Objects.RelatedQuests')}
          />

          <CenterColumn widths={['645px', '965px', '965px']}>
            <Request
              authorizationRedirect
              serviceURL={OBJECT_QUESTS}
              method="POST"
              serviceExpiresFieldName="expires"
              requestBody={{
                objectId,
              }}
              render={({ fetchingContent, serviceResponse }) => (
                <DeviceContext.Consumer>
                  {context => (
                    <div className="root">
                      {serviceResponse &&
                      serviceResponse.relatedQuestsCount > 0 ? (
                        <div className="card-container__quests">
                          {!context.isMobile &&
                            serviceResponse.relatedQuestsList.map(quest => (
                              <div className="tile">
                                <QuestHubTileBig {...quest} />
                              </div>
                            ))}
                          {context.isMobile &&
                            serviceResponse.relatedQuestsList.map(quest => (
                              <div className="tile">
                                <QuestHubTileSmall {...quest} />
                              </div>
                            ))}
                        </div>
                      ) : (
                        <div>
                          <p style={{ fontSize: '1.5em' }}>
                            {serviceResponse.questsComingSoonMessage}
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

Quests.propTypes = {};

export default Quests;
