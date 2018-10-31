import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { toggleReadingListState, GUIDE } from 'services/reading-lists';
import GenericButton from 'components/common/style/buttons/Button';
import style from './resources-button.style';

const ResourcesButton = ({ resourcesIconUrl, resourcesButtonText }) => (
  <ul className="button-container">
    <li>
      <GenericButton
        onClickEvent={() => {
          browserHistory.push('/');
        }}
        text={resourcesButtonText}
        icon={resourcesIconUrl}
      />
    </li>

    <style jsx>{style}</style>
  </ul>
);

ResourcesButton.propTypes = {
  resourcesIconUrl: PropTypes.string.isRequired,
  resourcesButtonText: PropTypes.string.isRequired,
};

export default ResourcesButton;
