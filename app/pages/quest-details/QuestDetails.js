/***********************************
* V4 Quest Details Page
*   Markdown support on elements????
*   UTF-8 support....
*   Multi-National Languages.....
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import has from 'lodash/has';
import {
  fetchQuestDataAction,
} from '../../modules/quest-details/actions';

const mapStateToProps = ({ questDetails, appConfig, user }) => ({
  questData: questDetails.questData,
  appConfig,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchQuestDataAction,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class QuestDetails extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    const {
      params: {
        questId,
      }
    } = nextProps;

    if (this.props.questData.questId != nextProps.questData.questId) {
      //console.log('Quest has been loaded.....gather more data....');
    }

    //console.log(this.props.params.questId);
    //console.log(nextProps.objectData.questId);

    //fetch the object data, the object page has been changed.
    if (this.props.params.questId != nextProps.params.questId) {
      this.props.actions.fetchQuestDataAction(questId);
    }
  }

  componentWillUpdate(nextProps) {

  }

  componentWillMount() {
    const {
      params: {
        questId,
      }
    } = this.props;

    if (this.props.questData.questId != questId) {
        //fetch the quest-level meta data only if the guideId changes.
        this.props.actions.fetchQuestDataAction(questId);
    }
  }

  render() {
    const {
      params: {
        questId,
      },
      questData,
    } = this.props;

    return (

      <div style={{'marginLeft': '20px', 'marginRight': '20px', 'marginBottom': '20px'}}>
        <h1>Quest ID: {questId}</h1>
        <h1>{questData.questTitle}</h1>
        <br/>
        <h2>{questData.guideSubtitle}</h2>
        <br/>

        <hr/>

        <h2>Quest Metadata</h2>
        {questData && <div>
          <table style={{'border': '1', 'marginLeft': '100px'}}>
            <thead>
              <th style={{'width': '30%'}}>Attribute</th>
              <th>Value</th>
            </thead>
            <tbody>
              {Object.keys(questData).map(function (key) {
                  /* exclude things like missionsList, etc. */
                  if ( typeof questData[key] != 'object') {
                    var val = new String(questData[key]);
                    var idxImg = val.indexOf('.svg');

                    return( <tr key={'row_' + key}>
                        <td style={{'width': '30%'}} key={'k_' + key}style={{'paddingTop': '5px', 'paddingBottom': '5px'}}>{key}</td>
                        <td key={'v_' + key}style={{'paddingTop': '5px', 'paddingBottom': '5px'}}>
                          {idxImg > 0 &&
                            <div>
                              <img style={{'backgroundColor': 'black'}} src={questData[key]}/><br/>
                            </div>
                          }
                          {questData[key]}
                        </td>
                      </tr>
                    );
                  }
                })
              }
            </tbody>
          </table>
        </div>
        }
      </div>
    )
  }
}
export default QuestDetails;
QuestDetails.propTypes = {
  params: PropTypes.shape({
    questId: PropTypes.string,
  }).isRequired,
  actions: PropTypes.shape({ }).isRequired,
};

QuestDetails.defaultProps = {
  actions: { },
  questId: '',
};
