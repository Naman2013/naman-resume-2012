import * as React from 'react';
import cx from 'classnames';
import Slider from 'react-slick';
import { IAnimationFrame } from 'app/modules/quests/types';
import './styles.scss';

type FrameListProps = {
  frameList: Array<IAnimationFrame>;
  activeFrame: any;
  setActiveFrame: Function;
};

type SliderArrowProps = {
  className?: string;
  style?: any;
  onClick?: Function;
};

const sliderSettings = {
  draggable: false,
  infinite: false,
  swipeToSlide: false,
  speed: 500,
  slidesToShow: 3,
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
  const { frameList, activeFrame, setActiveFrame } = props;
  const { frameId } = activeFrame;
  const isArrowsVisible = frameList.length > 3;

  return (
    <div className="frame-list">
      <Slider
        {...sliderSettings}
        nextArrow={<NextArrow />}
        prevArrow={<PrevArrow />}
        arrows={isArrowsVisible}
        className={cx({ 'arrows-visible': isArrowsVisible })}
      >
        {frameList.map((frame: IAnimationFrame) => (
          <div key={frame.frameId}>
            <div
              className={cx('frame-list-item', {
                active: frameId === frame.frameId,
              })}
              onClick={(): void => setActiveFrame(frame)}
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
