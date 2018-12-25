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
import DeviceProvider from 'providers/DeviceProvider';
import ObjectDetailsSectionTitle from '../../components/object-details/ObjectDetailsSectionTitle';
import QuestTile from '../../components/common/tiles/QuestTile';
import { OBJECT_QUESTS } from 'services/objects';

import {
  fetchObjectDetailsAction,
  fetchObjectQuestsAction,
} from '../../modules/object-details/actions';
import { fromPromise } from 'rxjs/observable/fromPromise';
import messages from './ObjectDetails.messages';

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
            />
          </CenterColumn>
          <style jsx>{`
            .root {
              display: flex;
              flex-wrap: wrap;
            }
          `}
          </style>
        </DeviceProvider>
      </Fragment>
    );
  }
}

Quests.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Quests);
