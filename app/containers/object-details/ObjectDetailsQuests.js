/***********************************
* V4 Object Details : Quests
*   Markdown support on elements????
*   UTF-8 support....
*   Multi-National Languages.....
***********************************/

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DeviceProvider from '../../../app/providers/DeviceProvider';
import ObjectDetailsSectionTitle from '../../components/object-details/ObjectDetailsSectionTitle';
import QuestTile from '../../components/common/tiles/QuestTile';
import CenterColumn from '../../../app/components/common/CenterColumn';

import {
  fetchObjectDetailsAction,
  fetchObjectQuestsAction,
} from '../../modules/object-details/actions';

const mapStateToProps = ({ objectDetails, appConfig, user }) => ({
  objectQuests: objectDetails.objectQuests,
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
  constructor(props) {
    super(props);
  }



  render() {
    const {
      params: {
        objectId,
      },
      objectDetails,
      objectQuests,
    } = this.props;

    return (
      <Fragment>
        <DeviceProvider>
          <ObjectDetailsSectionTitle title={objectDetails.objectTitle + "'s"} subTitle="Related Quests" />

          <CenterColumn> 

            {/* THIS IS FOR INITIAL LAYOUT ONLY */}
            <QuestTile
              title="Capture The Solar System"
              iconURL="https://vega.slooh.com/icons/home/observatory.png"
              anchorText="Beginner"
            />

            {/* THIS IS HOW THE ACTUAL DISPLAY SHOULD WORK ONCE QUEST DATA IS AVAILABLE
            
              {objectQuests && objectQuests.questsCount > 0 ? (
              <div className="card-container__quests">
                {Object.keys(objectQuests.questsList).map(function(key) {
                  return(
                    <Fragment>
                      <QuestTile
                        key={'card_' + key}
                        title={objectQuests.questsList[key].title}
                        iconURL={objectQuests.questsList[key].iconURL}
                        anchorText={objectQuests.questsList[key].linkLabel}
                      />
                    </Fragment>
                  )
                })}
              </div>
            ) : (
              <div>
                <p>Sorry, there are no quests available for {objectDetails.objectTitle} at this time.</p>
              </div>
            )} */}
          </CenterColumn>

        </DeviceProvider>        
      </Fragment>
    )
  }
}
export default Quests;

