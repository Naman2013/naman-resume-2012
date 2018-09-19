import React from 'react';
import PropTypes from 'prop-types';

const Foo = ({ name, value }) => (
  <option className="foo-option" value={value}>{name}</option>
);

Foo.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
};

export default Foo;
