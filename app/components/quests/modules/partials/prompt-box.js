import React from 'react';
import PropTypes from 'prop-types';
import { faintShadow } from 'app/styles/variables/shadows';

const {
  arrayOf,
  bool,
  number,
  shape,
  string,
} = PropTypes;

const PromptBox = ({
  children,
}) => (
  <div className="root">
    {children}
    <style jsx>{`
      .root {
        padding: 15px;
        ${faintShadow}
      }
    `}</style>
  </div>
);


PromptBox.propTypes = {
};

PromptBox.defaultProps = {
};

export default PromptBox;
