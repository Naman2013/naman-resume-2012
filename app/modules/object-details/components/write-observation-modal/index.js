import React, { Component, Fragment } from 'react';
import { WriteObservationStep1 } from '../write-observation-step1';
import { WriteObservationStep2 } from '../write-observation-step2';
import { WriteObservationStep3 } from '../write-observation-step3';

const WRITE_OBSERVATIONS_STEPS = {
  STEP_1: 'STEP_1',
  STEP_2: 'STEP_2',
  STEP_3: 'STEP_3',
};

export class WriteObservationModal extends Component {
  state = {
    currentStep: WRITE_OBSERVATIONS_STEPS.STEP_1,
    imageData: null,
    title: '',
    text: '',
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
  };

  setTitle = title => {
    this.setState({ title });
  };

  setText = text => {
    this.setState({ text });
  };

  onSubmit = () => {
    const { setObservationTags, shareMemberPicture } = this.props;
    const { title, text, imageData } = this.state;
    const { customerImageId, scheduledMissionId } = imageData;
    setObservationTags(customerImageId, scheduledMissionId, title, text).then(
      data => {
        if (!data.payload.apiError) {
          shareMemberPicture({ customerImageId });
          this.setState({
            currentStep: WRITE_OBSERVATIONS_STEPS.STEP_3,
          });
        }
      }
    );
  };

  render() {
    const {
      getMyPictures,
      myPictures,
      objectDetails,
      onHide,
      imageDetails,
    } = this.props;
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
            imageDetails={imageDetails}
          />
        )}

        {currentStep === STEP_2 && (
          <WriteObservationStep2
            imageData={imageData}
            goBack={this.goBack}
            onHide={onHide}
            setTitle={this.setTitle}
            setText={this.setText}
            onSubmit={this.onSubmit}
            objectDetails={objectDetails}
          />
        )}

        {currentStep === STEP_3 && <WriteObservationStep3 onHide={onHide} />}
      </Fragment>
    );
  }
}
