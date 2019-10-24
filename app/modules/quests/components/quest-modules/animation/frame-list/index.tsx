import * as React from 'react';
import cx from 'classnames';
import './styles.scss';

type FrameListProps = {
  frameList: Array<any>;
  activeFrame: any;
  setActiveFrame: Function;
};

export const FrameList: React.FC<FrameListProps> = React.memo(props => {
  const { frameList, activeFrame, setActiveFrame } = props;
  const { frameId } = activeFrame;

  return (
    <div className="frame-list">
      {frameList.map(frame => (
        <div
          key={frame.frameId}
          className={cx('frame-list-item', {
            active: frameId === frame.frameId,
          })}
          onClick={() => setActiveFrame(frame)}
          onKeyDown={e => {
            if (e.keyCode === 13) {
              setActiveFrame(frame);
            }
          }}
          tabIndex={0}
          role="button"
        >
          {frame.caption}
        </div>
      ))}
    </div>
  );
});
