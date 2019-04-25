import React from 'react';
import PropTypes from 'prop-types';
import GenericButton from 'app/components/common/style/buttons/Button';
import style from './resources-button.style';

const ResourcesButton = ({
  resourcesIconUrl,
  resourcesButtonText,
  openResources,
}) => (
  <ul className="button-container">
    <li>
      <GenericButton
        onClickEvent={openResources}
        text={resourcesButtonText}
        icon={resourcesIconUrl}
      />
    </li>

    <style jsx>{style}</style>
  </ul>
);

ResourcesButton.propTypes = {
  openResources: PropTypes.func.isRequired,
  resourcesIconUrl: PropTypes.string.isRequired,
  resourcesButtonText: PropTypes.string.isRequired,
};

export default ResourcesButton;
