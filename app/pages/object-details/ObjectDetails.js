/***********************************
* V4 Object Details Page
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import has from 'lodash/has';
import { fetchObjectDataAction } from '../../modules/object-details/actions';

const mapStateToProps = ({ objectDetails, appConfig, user }) => ({
  objectDetails,
  appConfig,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchObjectDataAction,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class ObjectDetails extends Component {
  static propTypes = {
    params: PropTypes.shape({
      objectId: PropTypes.string.isRequired,
    }).isRequired,
    actions: PropTypes.shape({
      fetchObjectDataAction: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {

  }

  componentWillUpdate(nextProps) {

  }

  componentWillMount() {
    const {
      params: {
        objectId,
      }
    } = this.props;

    if (this.props.objectId != objectId) {
        //fetch the object-level meta data only if the objectId changes.
        this.props.actions.fetchObjectDataAction(objectId);
    }
  }

  render() {
    const {
      params: {
        objectId,
      },
      objectDetails,
    } = this.props;

    return (
      <div>
        <h1>Object ID: {objectId}</h1>
        <h1>{objectDetails.objectTitle}</h1>
        <hr/>
        {objectDetails && <div>
          <table style={{'border': '1', 'margin-left': '100px'}}>
            <thead>
              <th style={{'width': '20%'}}>Attribute</th>
              <th>Value</th>
            </thead>
            <tbody>
              {Object.keys(objectDetails).map(function (key) {
                  return( <tr>
                    <td style={{'padding-top': '5px', 'padding-bottom': '5px'}}>{key}</td>
                    <td style={{'padding-top': '5px', 'padding-bottom': '5px'}}>{objectDetails[key]}</td></tr> );
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
export default ObjectDetails;
