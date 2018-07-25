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

  componentWillReceiveProps(nextProps) {
  }

  componentWillUpdate(nextProps) {

  }

  componentWillMount() {
    //console.log(this.props)
  }

  render() {
    const {
      params: {
        objectId,
      },
      objectDetails,
      objectQuests,
    } = this.props;

    //console.log (objectQuests);

    return (
      <Fragment>
        <DeviceProvider>
          <ObjectDetailsSectionTitle title={objectDetails.objectTitle + "'s"} subTitle="Related Quests" />
        </DeviceProvider>
        <div className="contain">        
          <h4>Related Quests: {objectDetails.objectTitle}</h4>
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
            <div className="card-container__quests">
              <p>Sorry, there are no quests available for {objectDetails.objectTitle} at this time.</p>
            </div>
          )}

          <style jsx>{`
            h4 {
              font-weight: 600;
            }
            .contain {
              margin: 5%;
              padding: 25px;
              background-color: #f2f2f2;
              text-transform: uppercase;
            }
            .card-container__quests {
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
            }
            .quest-card {
              font-size: 1em;
              background-color: #3E4B5C;
              padding: 25px;
              margin: 25px 0;
              min-width: 28%;
              text-align: center;
              color: white;
            }
            .quest-icon {
              background-color: #1E2631;
              width: 90px;
              height: 90px;
              border-radius: 50%;
              padding: 10px;
              margin: 50px auto 60px;
            }
            .quest-btn {
              cursor: pointer;
              margin: 10px auto;
            }
          `}</style>

        </div>
      </Fragment>
    )
  }
}
export default Quests;

