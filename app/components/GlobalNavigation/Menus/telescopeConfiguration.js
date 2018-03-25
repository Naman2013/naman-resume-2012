import React from 'react';
import uniqueId from 'lodash/uniqueId';
import flatten from 'lodash/flatten';
import PrimaryButton from './partials/buttons/PrimaryButton';

export const modelTelescopesFromObsList = {
  name: 'TELESCOPES_ONLY',
  model: function modelTelescopes(API_RAW) {
    const { observatoryList } = API_RAW;
    const telescopesByObservatory = observatoryList.map(_observatory => _observatory.obsTelescopes);
    return flatten(telescopesByObservatory);
  },
};

export default (telescopes = []) => ({
  component: <PrimaryButton />,
  content: telescopes.map(_telescope => ({
    _ID: uniqueId(),
    text: _telescope.teleName,
    anchor: _telescope.teleDetailsURL,
    isOnline: _telescope.teleOnlineStatus === 'online',
    logo: _telescope.teleLogoURL,
    telescopeID: _telescope.teleId,
  })),
});
