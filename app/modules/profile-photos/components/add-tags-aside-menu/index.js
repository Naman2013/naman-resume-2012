// @flow

import { ImgTagsPopover } from 'app/modules/profile-photos/components/add-tags-aside-menu/img-tags-popover';
import React, { useState } from 'react';

type TAddTagsAsideMenu = {
  label: string,
  tagList: any,
  setTag: any,
  getTags: any,
  deleteTag: any,
  customerImageId: string,
  isFetching: Boolean,
};

export const AddTagsAsideMenu = (props: TAddTagsAsideMenu) => {
  const [isOpen, setOpen] = useState(false);
  const {
    label,
    getTags,
    tagList,
    customerImageId,
    deleteTag,
    setTag,
    isFetching,
  } = props;
  
  return (
    <div>
      <div role="presentation" onClick={() => setOpen(!isOpen)}>
        {label}
      </div>

      {isOpen && (
        <ImgTagsPopover
          hide={() => setOpen(false)}
          tagList={tagList}
          getTags={getTags}
          customerImageId={customerImageId}
          deleteTag={deleteTag}
          setTag={setTag}
          isFetching={isFetching}
        />
      )}
    </div>
  );
};
