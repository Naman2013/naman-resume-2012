import { Popover } from 'app/modules/image-details/components/edit/popover';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Tooltip } from 'react-tippy';
import './styles.scss';

// https://medium.com/@pitipatdop/little-neat-trick-to-capture-click-outside-with-react-hook-ba77c37c7e82

export const BtnWithPopover = props => {
  const { icon, tooltip, popover, className = '', popoverHeader } = props;
  const node = useRef();

  const [open, setOpen] = useState(false);

  const handleClick = e => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setOpen(false);
  };

  const handleChange = selectedValue => {
    // onChange(selectedValue);
    setOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <div className={`btn-with-popover ${className}`} ref={node}>
      <Tooltip title={tooltip}>
        <Button className="icon-btn" onClick={() => setOpen(!open)}>
          {icon}
        </Button>
      </Tooltip>

      <Popover isOpen={open} onHide={() => setOpen(!open)}>
        {popoverHeader ? (
          <h2 className="popover-header">{popoverHeader}</h2>
        ) : null}
        {popover}
      </Popover>
    </div>
  );
};
