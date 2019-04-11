// @flow
import React from 'react';
import cn from 'classnames';
import './index.scss';

type TButton = {
  type?: string,
  className?: string,
  children: any,
  onClick: Function,
  mod?: string,
};

const Btn = (props: TButton) => {
  const { type = 'button', className = '', children, onClick, mod = '' } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(`${className} i-btn`, mod && `i-btn-${mod}`)}
    >
      {children}
    </button>
  );
};

export default Btn;
