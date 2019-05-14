import React, { Component, Fragment } from 'react';
import { WriteObservationStep1 } from '../write-observation-step1';
import { WriteObservationStep2 } from '../write-observation-step2';

const WRITE_OBSERVATIONS_STEPS = {
  STEP_1: 'STEP_1',
  STEP_2: 'STEP_2',
  STEP_3: 'STEP_3',
};

export class WriteObservationModal extends Component {
  state = {
    currentStep: WRITE_OBSERVATIONS_STEPS.STEP_1,
    imageData: null,
  };

  selectImage = data => {
    this.setState({
      imageData: data,
      currentStep: WRITE_OBSERVATIONS_STEPS.STEP_2,
    });
  };

  goBack = () => {
    this.setState({
      currentStep: WRITE_OBSERVATIONS_STEPS.STEP_1,
    });
  }

  render() {
    const { getMyPictures, myPictures, objectDetails } = this.props;
    const { currentStep, imageData } = this.state;
    const { STEP_1, STEP_2, STEP_3 } = WRITE_OBSERVATIONS_STEPS;
    return (
      <Fragment>
        {currentStep === STEP_1 && (
          <WriteObservationStep1
            getMyPictures={getMyPictures}
            myPictures={myPictures}
            objectDetails={objectDetails}
            selectImage={this.selectImage}
          />
        )}

        {currentStep === STEP_2 && (
          <WriteObservationStep2 imageData={imageData} goBack={this.goBack} />
        )}
      </Fragment>
    );
  }
}
