import * as React from 'react';
import { Button } from 'react-bootstrap';
import { Tooltip } from 'react-tippy';
import { IQuestAnimation } from 'app/modules/quests/types';
import './styles.scss';

type AnimationCompletedProps = {
  questAnimation: IQuestAnimation;
  onEdit: () => void;
};
const onDownloadClick = (): void => {};

export const AnimationCompleted: React.FC<AnimationCompletedProps> = React.memo(
  props => {
    const { questAnimation, onEdit } = props;
    const {
      outputHeading,
      outputSubheading,
      editAnimationButtonCaption,
    } = questAnimation;
    const imageURL =
      'https://polaris2.slooh.com/teide/4/highmag/2019/06/14/2230_2pallas/2pallas_20190614_223009_0_k8aksn_l.png';

    return (
      <>
        <div className="animation-completed__card">
          <div className="animation-completed__card-image">
            <img src={imageURL} alt="" />
          </div>
          <div className="animation-completed__card-title">{outputHeading}</div>
          <div className="animation-completed__card-subtitle">
            {outputSubheading}
          </div>
        </div>
        <div className="animation-completed__actions">
          <div className="animation-completed__actions-edit">
            <Tooltip
              theme="dark"
              title="Tooltip text will be there soon"
              distance={10}
              position="top"
            >
              <Button className="dc-slot-card-find-btn" onClick={onEdit}>
                {editAnimationButtonCaption}
              </Button>
            </Tooltip>
          </div>
          <div className="animation-completed__actions-separator" />
          <div className="animation-completed__actions-download">
            <Tooltip
              title="Tooltip text will be there soon"
              distance={10}
              position="top"
            >
              <Button className="btn-circle" onClick={onDownloadClick}>
                <span className="icon-download" />
              </Button>
            </Tooltip>
          </div>
        </div>
      </>
    );
  }
);
