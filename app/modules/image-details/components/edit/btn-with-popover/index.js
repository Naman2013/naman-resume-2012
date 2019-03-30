import { Popover } from 'app/modules/image-details/components/edit/popover';
import React, { Fragment, useState } from 'react';
import { Button } from 'react-bootstrap';
import './styles.scss';
import { Tooltip } from 'react-tippy';

export const BtnWithPopover = props => {
  const { icon, tooltip, popover, className = '' } = props;
  const [isOpen, open] = useState(false);

  return (
    <div className={`btn-with-popover ${className}`}>
      <Tooltip title={tooltip}>
        <Button className="icon-btn" onClick={() => open(!isOpen)}>
          {icon}
        </Button>
      </Tooltip>

      <Popover isOpen={isOpen} onHide={() => open(!isOpen)}>
        {popover}
      </Popover>
    </div>
  );
};
