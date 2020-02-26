import React, { useEffect } from 'react';
import cx from 'classnames';
import Slider from 'react-slick';
import { IAnimationFrame } from 'app/modules/quests/types';
import './styles.scss';

type FrameListProps = {
  frameList: Array<IAnimationFrame>;
  activeFrame: any;
  setActiveFrame: Function;
  readOnly: boolean;
};

type SliderArrowProps = {
  className?: string;
  style?: any;
  onClick?: Function;
};

const SLIDES_TO_SHOW = 3;

const sliderSettings = {
  draggable: false,
  infinite: false,
  swipeToSlide: false,
  speed: 500,
  slidesToShow: SLIDES_TO_SHOW,
  slidesToScroll: 3,
};

const NextArrow: React.FC<SliderArrowProps> = (props: SliderArrowProps) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`icon-slider-right ${className}`}
      style={{ ...style, display: 'flex' }}
      onClick={e => {
        if (onClick) {
          onClick(e);
        }
      }}
      tabIndex={0}
      role="button"
    />
  );
};

const PrevArrow: React.FC<SliderArrowProps> = (props: SliderArrowProps) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`icon-slider-left ${className}`}
      style={{ ...style, display: 'flex' }}
      onClick={e => {
        if (onClick) {
          onClick(e);
        }
      }}
      tabIndex={0}
      role="button"
    />
  );
};

export const FrameList: React.FC<FrameListProps> = React.memo(props => {
  const { frameList, activeFrame, setActiveFrame, readOnly } = props;
  const { frameId, frameIndex } = activeFrame;
  const isArrowsVisible = frameList.length > 3;

  let slider: any = null;

  useEffect(() => {
    if (frameIndex > SLIDES_TO_SHOW && slider) {
      slider.slickGoTo(
        Math.ceil(frameIndex / SLIDES_TO_SHOW - 1) * SLIDES_TO_SHOW
      );
    }
  }, [slider, frameIndex]);

  return (
    <div className="frame-list">
      <Slider
        {...sliderSettings}
        nextArrow={<NextArrow />}
        prevArrow={<PrevArrow />}
        arrows={isArrowsVisible}
        className={cx({ 'arrows-visible': isArrowsVisible })}
        ref={(node: any): void => {
          slider = node;
        }}
      >
        {frameList.map((frame: IAnimationFrame) => (
          <div key={frame.frameId}>
            <div
              className={cx('frame-list-item', {
                active:
                  frameId === frame.frameId ||
                  (readOnly && frame.frameIndex === 1),
              })}
              onClick={(): void => {
                if (!readOnly) {
                  setActiveFrame(frame, true);
                }
              }}
              tabIndex={0}
              role="button"
            >
              {frame.caption}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
});
