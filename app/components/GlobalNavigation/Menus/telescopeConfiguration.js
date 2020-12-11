import React from 'react';
import uniqueId from 'lodash/uniqueId';
import flatten from 'lodash/flatten';
import Telescope from './partials/buttons/Telescope';

export const modelTelescopesFromObsList = {
  name: 'TELESCOPES_ONLY',
  model: function modelTelescopes(API_RAW) {
    const { observatoryList } = API_RAW;
    const telescopesByObservatory = observatoryList.map(
      _observatory => _observatory.obsTelescopes
    );
    return flatten(telescopesByObservatory);
  },
};

export default (telescopes = [], user) => ({
  render: props => <Telescope {...props} />,
  content: telescopes.map(_telescope => ({
    _ID: uniqueId(),
    text: _telescope.teleName,
    anchor: _telescope.teleDetailsURL,
    isOnline: _telescope.teleOnlineStatus === 'online',
    logoURL: _telescope.teleLogoURL,
    user: user,
  })),  
});
