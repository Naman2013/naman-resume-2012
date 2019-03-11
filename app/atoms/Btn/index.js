// @flow
import React from 'react';
import classNames from 'classnames';
import './index.scss';

type TButton = {
  type?: string,
  children: any,
  onClick: Function,
  mod?: string,
};

const Btn = (props: TButton) => {
  const { type = 'button', children, onClick, mod = null } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames('i-btn', mod && `i-btn-${mod}`)}
    >
      {children}
    </button>
  );
};

export default Btn;
