// @flow

import { ImgTagsPopover } from 'app/modules/profile-photos/components/add-tags-aside-menu/img-tags-popover';
import React, { useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';

type TAddTagsAsideMenu = {
  label: string,
};

export const AddTagsAsideMenu = (props: TAddTagsAsideMenu) => {
  const [isOpen, setOpen] = useState(false);
  const { label } = props;
  return (
    <div>
      <span onClick={() => setOpen(!isOpen)}>{label}</span>

      {isOpen && <ImgTagsPopover hide={()=>setOpen(false)} />}
    </div>
  );
};
