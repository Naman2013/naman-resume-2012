import React from 'react';
import uniqueId from 'lodash/uniqueId';
import PrimaryButton from './partials/buttons/PrimaryButton';
import SecondaryButton from './partials/buttons/SecondaryButton';

export const PRIMARY_CONFIGURATION = (primaryLinks = []) => ({
  render: props => (<PrimaryButton {...props} />),
  content: primaryLinks.map(link => ({
    _ID: uniqueId(),
    text: link.name,
    anchor: link.link,
  })),
});

export const SECONDARY_CONFIGURATION = (secondaryLinks = []) => ({
  render: props => (<SecondaryButton {...props} />),
  content: secondaryLinks.map(link => ({
    _ID: uniqueId(),
    text: link.name,
    anchor: link.link,
  })),
});
