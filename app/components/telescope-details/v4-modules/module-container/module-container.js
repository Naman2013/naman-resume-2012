import React from 'react';
import PropTypes from 'prop-types';
import { ModuleHeader } from './module-header';
import style from './module-container.style';

const ModuleContainer = () => (
  <div className="container">
    <ModuleHeader title="Where in the sky" />
    <style jsx>{style}</style>
  </div>
);

export { ModuleContainer };
