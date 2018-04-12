/***********************************
* V4 Object Details : Stories
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
  fetchObjectDetailsAction,
} from '../../modules/object-details/actions';

const mapStateToProps = ({ objectDetails, appConfig, user }) => ({
  objectDetails: objectDetails.objectDetails,
  appConfig,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchObjectDetailsAction,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class Stories extends Component {
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


    return (
      <div className="contain">

        <h4>Stories about {objectDetails.objectTitle}</h4>
        

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
          .card-container__stories {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
          }
          .story-card {
            font-size: 1em;
            background-color: #3E4B5C;
            padding: 25px;
            margin: 25px 0;
            min-width: 28%;
            text-align: center;
          }
          .story-icon {
            background-color: #1E2631;
            width: 70px;
            height: 70px;
            border-radius: 50%;
            padding: 10px;
            margin: 0 auto;
          }
          .story-btn {
            padding: 7px 10px;
            background-color: #3C4A55;
            width: 50%;
            border-radius: 19px;
            color: white;
            text-align: center;
            cursor: pointer;
          }
        `}</style>

      </div>
    )
  }
}
export default Stories;

