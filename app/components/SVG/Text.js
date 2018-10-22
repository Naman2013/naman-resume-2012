import React from 'react';

/**
 *
 * available style props
 * font-family
 * font-size
 * fill (ex: #595959)
 * white-space
 */

const Text = ({ style, x, y, text }) => (
  <text
    style={style}
    x={x}
    y={y}
  >
    {text}
  </text>
);

export default Text;
