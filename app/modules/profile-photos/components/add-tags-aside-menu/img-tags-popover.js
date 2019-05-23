// @flow

import React from 'react';
import './img-tags-popover.scss';
import useOnClickOutside from 'use-onclickoutside';

type TImgTagsPopover = {
  hide: Function,
};

export const ImgTagsPopover = (props: TImgTagsPopover) => {
  const { hide } = props;

  const ref = React.useRef(null);
  useOnClickOutside(ref, hide);

  return (
    <div className="img-tags-popover" ref={ref}>
      POPOVER
    </div>
  );
};
