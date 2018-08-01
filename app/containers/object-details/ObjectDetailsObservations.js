/***********************************
* V4 Object Details : Observations
*   Markdown support on elements????
*   UTF-8 support....
*   Multi-National Languages.....
***********************************/

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchObjectDetailsAction } from '../../modules/object-details/actions';

import DeviceProvider from '../../../app/providers/DeviceProvider';
import ObjectDetailsSectionTitle from '../../components/object-details/ObjectDetailsSectionTitle';
import CenterColumn from '../../../app/components/common/CenterColumn';
import CardObservations from '../../../app/components/common/CardObservations';

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

class Observations extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const descriptionContent = 'Nam dapibus nisl vitae elit fringilla rutrum. Aenean lene lorem sollicitudin, erat a elementum toirutrum neeque sem pretium metuis, quis mollis nisl nunc it tristique de ullam ecorpere pretium…';
    const tempProps = {
      title: 'The Moon!',
      author: 'JESSICA ANDERSON',
      descContent: descriptionContent,
      imageSrcUrl: 'https://vega.slooh.com/assets/v4/placeholder/moon_sample.jpg',
      likesCount: '1000',
      commentsCount: '007',
      detailsLinkUrl: 'https://www.slooh.com/',
      capturedDate: 'Jan 22, 2018',
    };

    const {
      params: {
        objectId,
      },
      objectDetails,
    } = this.props;

    return (
      <Fragment>
        <DeviceProvider>
          <ObjectDetailsSectionTitle title={objectDetails.objectTitle + "'s"} subTitle="Observations" />
        
          <CenterColumn> 
            <CardObservations {...tempProps} />
          </CenterColumn>
        </DeviceProvider>
      </Fragment>
    )
  }
}
export default Observations;

