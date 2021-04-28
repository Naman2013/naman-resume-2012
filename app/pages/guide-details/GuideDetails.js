/***********************************
* V4 Guide Details Page
*   Markdown support on elements????
*   UTF-8 support....
*   Multi-National Languages.....
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchGuideDataAction } from '../../modules/guide-details/actions';

const mapStateToProps = ({ guideDetails, appConfig, user }) => ({
  guideData: guideDetails.guideData,
  appConfig,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchGuideDataAction,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class GuideDetails extends Component {
  componentWillReceiveProps(nextProps) {
    const {
      params: {
        guideId,
      }
    } = nextProps;

    if (this.props.guideData.guideId != nextProps.guideData.guideId) {
      
    }

  

    //fetch the object data, the object page has been changed.
    if (this.props.params.guideId != nextProps.params.guideId) {
      this.props.actions.fetchGuideDataAction(guideId);
    }
  }

  componentWillUpdate(nextProps) {

  }

  componentWillMount() {
    const {
      params: {
        guideId,
      }
    } = this.props;

    if (this.props.guideData.guideId != guideId) {
        //fetch the guide-level meta data only if the guideId changes.
        this.props.actions.fetchGuideDataAction(guideId);
    }
  }

  render() {
    const {
      params: {
        guideId,
      },
      guideData,
    } = this.props;

    return (

      <div style={{'marginLeft': '20px', 'marginRight': '20px', 'marginBottom': '20px'}}>
        <h1>Guide ID: {guideId}</h1>
        <h1>{guideData.guideTitle}</h1>
        <br/>
        <h2>{guideData.guideSubtitle}</h2>
        <br/>

        <hr/>

        <h2>Guide Metadata</h2>
        {guideData && <div>
          <table style={{'border': '1', 'marginLeft': '100px'}}>
            <thead>
              <th style={{'width': '30%'}}>Attribute</th>
              <th>Value</th>
            </thead>
            <tbody>
              {Object.keys(guideData).map(function (key) {
                  /* exclude things like missionsList, etc. */
                  if ( typeof guideData[key] != 'object') {
                    var val = new String(guideData[key]);
                    var idxImg = val.indexOf('.svg');

                    return( <tr key={'row_' + key}>
                        <td style={{'width': '30%'}} key={'k_' + key}style={{'paddingTop': '5px', 'paddingBottom': '5px'}}>{key}</td>
                        <td key={'v_' + key}style={{'paddingTop': '5px', 'paddingBottom': '5px'}}>
                          {idxImg > 0 &&
                            <div>
                              <img style={{'backgroundColor': 'black'}} src={guideData[key]}/><br/>
                            </div>
                          }
                          {guideData[key]}
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
export default GuideDetails;
GuideDetails.propTypes = {
  params: PropTypes.shape({
    guideId: PropTypes.string,
  }).isRequired,
  actions: PropTypes.shape({ }).isRequired,
};

GuideDetails.defaultProps = {
  actions: { },
  guideId: '',
};
