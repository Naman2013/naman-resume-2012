// @flow
import React from 'react';
import classNames from 'classnames';
import './index.scss';

type Props = {
  type?: string,
  children: any,
  onClick: Function,
  mod?: string,
};

const Btn = ({ type = 'button', children, onClick, mod }: Props) => {
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

Btn.defaultProps = {
  type: 'button',
  mod: null,
};

export default Btn;
