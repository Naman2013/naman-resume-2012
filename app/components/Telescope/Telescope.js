// @flow
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Measure from 'react-measure';
import noop from 'lodash/noop';
import { setPreviousInstrument } from 'app/modules/starshare-camera/starshare-camera-actions';
import Fade from '../common/Fade';
import FadeSVG from '../common/Fade/FadeSVG';
import easingFunctions, { animateValues } from '../../utils/easingFunctions';
import Button from '../common/style/buttons/Button';

import TelescopeFrame from './TelescopeFrame';
import Mask from './Mask';
import Scale from './Scale';
import UnitText from './TelescopeFrame/UnitText';
import HowBig from './HowBig';

import { getTelescope } from './telescopeConfig';
import FieldOfView from './FieldOfView/FieldOfView';
import { Modal } from '../modal';

import { moodyBleu, romance } from '../../styles/variables/colors_tiles_v4';

const MAX_RESOLUTION = 250;
const MAX_DURATION = 10000;
const ZOOM_OUT_DURATION = MAX_DURATION / 2;
const MAX_FOV_FLIPS = 5;

const menuButtonTheme = {
  fontSize: '18px',
  borderWidth: '3px',
  background: 'black',
};

const inactiveButtonTheme = {
  ...menuButtonTheme,
  color: moodyBleu,
  borderColor: moodyBleu,
};

const activeButtonTheme = {
  ...menuButtonTheme,
  color: romance,
  borderColor: romance,
};

type TTelescope = {
  activeInstrumentID: string,
  previousInstrumentID: string | void,
  missionMetaData?: {
    missionTargetID?: number,
    referenceObjectScale?: number,
    domain?: string,
    targetObjectScale?: number,
    targetObjectURL?: string,
    targetObjectName?: string,
  },
  render?: Function,
  increment?: number,
  disableFullscreen?: boolean,
};

class Telescope extends PureComponent<TTelescope> {
  static defaultProps = {
    increment: 5,
    render: noop,
    missionMetaData: { missionTargetID: 0 },
  };

  state = {
    activeInstrumentID: this.props.activeInstrumentID,
    previousInstrumentID: this.props.previousInstrumentId,
    telescopeId: this.props.activeInstrumentID,
    timesFlippedInstrumentBorder: 0,
    isTransitioningTelescope: false,
    horizontalResolution: getTelescope(this.props.activeInstrumentID).FOV
      .horizontal,
    verticalResolution: getTelescope(this.props.activeInstrumentID).FOV
      .vertical,
    increment: this.props.increment,
    awaitingMission: this.props.missionMetaData.missionTargetID === 0,
    transitionScale: false,
    isMaskActive: false,
    isModalActive: false,
    isGridActive: true,
    showTitleMessage: false,
    transitionStrokeColor: 'aqua',
    showArrows: false,
    portalDimensions: {
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
      x: 0,
      y: 0,
    },
    radius: 0,
  };

  componentWillReceiveProps({
    activeInstrumentID,
    previousInstrumentId,
    missionMetaData,
  }) {
    this.props.setPreviousInstrument(activeInstrumentID);
    if (
      previousInstrumentId !== null &&
      previousInstrumentId !== activeInstrumentID
    ) {
      const tele = getTelescope(previousInstrumentId);
      this.setState(() => ({
        activeInstrumentID: previousInstrumentId,
        previousInstrumentID: activeInstrumentID,
        telescopeId: previousInstrumentId,
        horizontalResolution: tele.FOV.horizontal,
        verticalResolution:tele.FOV.vertical
      }));
      this.showTitleMessage();
    }

    if (missionMetaData.missionTargetID === 0) {
      this.setState(() => ({
        awaitingMission: true,
        transitionScale: false,
      }));
    }

    if (missionMetaData.missionTargetID !== 0) {
      this.setState(() => ({
        awaitingMission: false,
        transitionScale:
          missionMetaData.missionTargetID !==
          this.props.missionMetaData.missionTargetID,
      }));
    }
  }

  currentZoomInTransition = null;

  currentZoomOutTransition = null;

  doFOVTransitionInterval = null;

  showTitleMessage = () => {
    this.setState({ showTitleMessage: true }, () => {
      setTimeout(() => {
        this.transitionZoomOut();
      }, 3000);
    });
  };

  transitionZoomOut() {
    let remainingDuration = 0;

    this.setState(() => ({
      isTransitioningTelescope: true,
      showTitleMessage: false,
      showArrows: true,
    }));

    if (this.currentZoomOutTransition) {
      remainingDuration = this.currentZoomOutTransition
        .cancel()
        .getRemainingTime();
    }

    if (this.currentZoomInTransition) {
      remainingDuration =
        ZOOM_OUT_DURATION -
        this.currentZoomInTransition.cancel().getRemainingTime();
    }

    this.currentZoomInTransition = null;
    this.currentZoomOutTransition = null;

    this.currentZoomOutTransition = this.transitionTo(
      this.transitionPOV,
      {
        horizontal: MAX_RESOLUTION,
        vertical: MAX_RESOLUTION,
      },
      remainingDuration > 0 ? remainingDuration : ZOOM_OUT_DURATION
    );
  }

  transitionPOV() {
    this.setState({
      timesFlippedInstrumentBorder: 0,
      transitionStrokeColor: 'aqua',
      showArrows: false,
    });
    this.doFOVTransitionInterval = setInterval(() => {
      this.setState(prevState => {
        const {
          activeInstrumentID,
          previousInstrumentID,
          timesFlippedInstrumentBorder,
          transitionStrokeColor,
        } = prevState;

        if (timesFlippedInstrumentBorder >= MAX_FOV_FLIPS) {
          this.tearDownTransitionPOV();
          this.transitionZoomIn();
          return {};
        }

        const updatedFOVFlipState = {
          timesFlippedInstrumentBorder: timesFlippedInstrumentBorder + 1,
          activeInstrumentID:
            activeInstrumentID === this.state.activeInstrumentID
              ? previousInstrumentID
              : activeInstrumentID,
          previousInstrumentID:
            previousInstrumentID === this.state.previousInstrumentID
              ? activeInstrumentID
              : previousInstrumentID,
          transitionStrokeColor:
            transitionStrokeColor === 'aqua' ? '#FAD59A' : 'aqua',
          telescopeId:
            this.state.telescopeId === this.state.previousInstrumentID
              ? activeInstrumentID
              : previousInstrumentID,
        };
        return updatedFOVFlipState;
      });
    }, 500);
  }

  tearDownTransitionPOV() {
    if (this.doFOVTransitionInterval) {
      clearInterval(this.doFOVTransitionInterval);
    }
  }

  transitionZoomIn() {
    this.setState({ showArrows: true });
    const targetTelescope = getTelescope(this.state.activeInstrumentID);
    this.currentZoomInTransition = this.transitionTo(
      this.telescopeTransitionComplete,
      {
        horizontal: targetTelescope.PORTAL.horizontal,
        vertical: targetTelescope.PORTAL.vertical,
      }
    );
    this.setState({ transitionStrokeColor: 'aqua' });
  }

  telescopeTransitionComplete() {
    this.setState(() => ({ isTransitioningTelescope: false }));
  }

  transitionTo(
    onCompleteCallback,
    { horizontal, vertical },
    duration = ZOOM_OUT_DURATION
  ) {
    const { horizontalResolution, verticalResolution } = this.state;

    return animateValues(
      { hr: horizontalResolution, vr: verticalResolution },
      duration,
      {
        hr: horizontal,
        vr: vertical,
        onUpdate: values => {
          this.setState(() => ({
            horizontalResolution: values.hr,
            verticalResolution: values.vr,
          }));
        },
        onComplete: onCompleteCallback.bind(this),
        ease: easingFunctions.easeInOutQuint,
      }
    );
  }

  handlePortalResize = contentBox => {
    this.setState({ portalDimensions: { ...contentBox.bounds } });
  };

  handleCompleteHowBigAnimation = () => {
    this.setState(() => ({ transitionScale: false }));
  };

  onHideModal = () => {
    this.setState({ isModalActive: false });
  };

  render() {
    const {
      portalDimensions: { width, height },
      increment,
      horizontalResolution,
      verticalResolution,
      isTransitioningTelescope,
      activeInstrumentID,
      previousInstrumentID,
      transitionScale,
      awaitingMission,
      isMaskActive,
      isModalActive,
      isGridActive,
      radius,
      missionTitle,
    } = this.state;

    const { missionMetaData, disableFullscreen } = this.props;

    const activeInstrument = getTelescope(activeInstrumentID);
    console.log(horizontalResolution);
    const tickSpacing = width / horizontalResolution;
    const midPoint = width / 2;
    const arcMinuteLabelLetterSpacing = width * 0.03;

    return (
      <Measure bounds onResize={this.handlePortalResize}>
        {({ measureRef }) => (
          <div className="telescope">
            <div
              ref={measureRef}
              style={{
                backgroundColor: isTransitioningTelescope
                  ? 'black'
                  : 'transparent',
              }}
              className="portal"
            >
              {!isTransitioningTelescope && !this.state.showTitleMessage && (
                <div className="telescope-float-menu">
                  <Button
                    renderIcon={() => <i className="fa fa-table" />}
                    isActive={isGridActive}
                    onClickEvent={() => {
                      this.setState({ isGridActive: !isGridActive });
                    }}
                    theme={{
                      ...(isGridActive
                        ? activeButtonTheme
                        : inactiveButtonTheme),
                      marginBottom: '10px',
                    }}
                  />
                  <Button
                    renderIcon={() => <i className="fa fa-eye" />}
                    isActive={isMaskActive}
                    onClickEvent={() => {
                      this.setState({ isMaskActive: !isMaskActive });
                    }}
                    theme={{
                      ...(isMaskActive
                        ? activeButtonTheme
                        : inactiveButtonTheme),
                      marginBottom: '10px',
                    }}
                  />
                  {!disableFullscreen && (
                    <Button
                      renderIcon={() => <i className="fa fa-arrows-alt" />}
                      onClickEvent={() =>
                        this.setState({
                          isModalActive: true,
                          isMaskActive: false,
                        })
                      }
                      theme={inactiveButtonTheme}
                    />
                  )}
                </div>
              )}
              <Fade
                isHidden={
                  isTransitioningTelescope || this.state.showTitleMessage
                }
              >
                <div>
                  {this.props.render({ viewportHeight: width }, imageData => {
                    const { imageWidth, imageHeight, missionTitle } = imageData;

                    const radiusSize = (imageHeight * 0.65) / 2;

                    this.setState({
                      radius: radiusSize,
                      missionTitle,
                    });
                  })}
                </div>
              </Fade>
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                className="telescope-svg"
              >
                {/**
                 TODO:
                 move non-scale transition elements into a component to keep this more readable
                 */}
                <FadeSVG isHidden={transitionScale}>
                  <FadeSVG
                    isHidden={
                      isTransitioningTelescope || this.state.showTitleMessage
                    }
                  >
                    {isMaskActive && <Mask radius={radius} />}
                  </FadeSVG>
                  {(this.state.showTitleMessage ||
                    isTransitioningTelescope) && (
                    <g>
                      <rect
                        x="0"
                        y="0"
                        width={width}
                        height={height}
                        style={{ fill: 'black' }}
                      />
                    </g>
                  )}
                  {this.state.showTitleMessage && (
                    <UnitText
                      text="Changing Field-Of-View..."
                      x={width / 2}
                      y={80}
                      fontSize={width / 20}
                      style={{
                        fill: 'aqua',
                        width: '100%',
                        fontFamily: 'BrandonGrotesque-Black',
                      }}
                    />
                  )}
                  {activeInstrumentID && previousInstrumentID && isGridActive && (
                    <FadeSVG isHidden={!isTransitioningTelescope}>
                      <FieldOfView
                        activeInstrumentID={activeInstrumentID}
                        previousInstrumentID={previousInstrumentID}
                        telescopeId={this.state.telescopeId}
                        tickSpacing={tickSpacing}
                        canvasWidth={width}
                        currentZoomIn={this.currentZoomInTransition}
                        currentZoomOut={this.currentZoomOutTransition}
                        stroke={this.state.transitionStrokeColor}
                        showArrows={this.state.showArrows}
                      />
                    </FadeSVG>
                  )}
                  {isGridActive && (
                    <Fragment>
                      <TelescopeFrame
                        isGridVisible={isTransitioningTelescope}
                        isScaleVisible={
                          !isTransitioningTelescope &&
                          !this.state.showTitleMessage
                        }
                        horizontalResolution={horizontalResolution}
                        verticalResolution={verticalResolution}
                        increment={increment}
                        length={width}
                      />

                      <FadeSVG
                        isHidden={
                          isTransitioningTelescope ||
                          this.state.showTitleMessage
                        }
                      >
                        <Scale
                          dimension={width}
                          scale={
                            tickSpacing *
                            activeInstrument.directionMarkerLengthArcMinutes
                          }
                          scaleText={
                            activeInstrument.directionMarkerLengthArcMinutes
                          }
                          style={{ stroke: 'aqua' }}
                        />

                        <UnitText
                          text="arcminutes"
                          x={midPoint}
                          y={40}
                          style={{ letterSpacing: arcMinuteLabelLetterSpacing }}
                        />

                        <UnitText
                          text="arcminutes"
                          x={-midPoint}
                          y={width - 40}
                          style={{
                            letterSpacing: arcMinuteLabelLetterSpacing,
                            transform: 'rotate(-90)',
                          }}
                        />
                      </FadeSVG>
                    </Fragment>
                  )}
                </FadeSVG>
                {isModalActive && (
                  <Modal
                    show
                    size="lg"
                    dialogClassName="telescope-modal"
                    centered
                    onHide={this.onHideModal}
                  >
                    <h3
                      style={{
                        color: 'white',
                        marginTop: '-60px',
                        marginBottom: '15px',
                      }}
                    >
                      {missionTitle || 'No mission available'}
                    </h3>
                    <Telescope {...this.props} disableFullscreen />
                  </Modal>
                )}

                {transitionScale && (
                  <HowBig
                    dimension={width}
                    referenceObjectScale={missionMetaData.referenceObjectScale}
                    domain={missionMetaData.domain}
                    targetObjectScale={missionMetaData.targetObjectScale}
                    targetObjectURL={missionMetaData.targetObjectURL}
                    targetObjectName={missionMetaData.targetObjectName}
                    onComplete={this.handleCompleteHowBigAnimation}
                  />
                )}
              </svg>

              <style jsx>
                {`
                  .portal {
                    width: 100%;
                    overflow: hidden;
                    background: none;
                    position: relative;
                  }

                  .portal:before {
                    content: '';
                    padding-top: 100%;
                    float: left;
                  }

                  .portal :global(.telescope-svg) {
                    z-index: 5;
                  }

                  .portal :global(.telescope-float-menu) {
                    position: absolute;
                    top: 40px;
                    left: 26px;
                    z-index: 3000;
                  }

                  :global(.telescope-modal) {
                    max-width: 90vh;
                    width: 100%;
                  }

                  svg {
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                  }
                `}
              </style>
            </div>
          </div>
        )}
      </Measure>
    );
  }
}

const mapStateToProps = ({ starshareCamera }) => ({
  previousInstrumentId: starshareCamera.previousInstrumentId,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setPreviousInstrument,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Telescope);
