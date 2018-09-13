import React from 'react';
import uniqueId from 'lodash/uniqueId';
import flatten from 'lodash/flatten';
import PrimaryButton from './partials/buttons/PrimaryButton';


export default (userLinks = []) => ({
  render: props => (<PrimaryButton {...props} />),
  content: userLinks.map(link => ({
    _ID: uniqueId(),
    text: link.name,
    anchor: link.link,
  })),
});
