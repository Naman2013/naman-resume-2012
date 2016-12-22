import React from 'react';

const SCIENCE_LOG = 'SCIENCE_LOG';
const ART_CULTURE = 'ART_CULTURE';
const HUMAN_SPIRIT = 'HUMAN_SPIRIT';
const DIY = 'DIY';

export const iconCategory = {
  title: {
    [ART_CULTURE]: 'Art & culture',
    [SCIENCE_LOG]: 'Science log',
    [DIY]: 'DIY',
    [HUMAN_SPIRIT]: 'Human spirit'
  },
  icon: {
    [ART_CULTURE]: 'https://vega.slooh.com/icons/community/art_culture.svg',
    [SCIENCE_LOG]: 'https://vega.slooh.com/icons/community/science_log.svg',
    [DIY]: 'https://vega.slooh.com/icons/community/DIY.svg',
    [HUMAN_SPIRIT]: 'https://vega.slooh.com/icons/community/human_spirit.svg'
  },
  contentKey: {
    [ART_CULTURE]: 'art-culture',
    [SCIENCE_LOG]: 'science-log',
    [DIY]: 'diy',
    [HUMAN_SPIRIT]: 'human-spirit'
  }
};

const jupiter =
  <svg width="53px" height="53px" viewBox="178 45 53 53" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <rect x="178" y="45.0434749" width="53" height="52.2094823" id="rect-1"></rect>
    </defs>
    <g id="galaxy_icon" stroke="none" fill="none">
      <image x="178" y="45.0434749" width="53" height="52.2094823"
             href="data:image/png;base64,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"></image>
    </g>
  </svg>;

const galaxy =
  <svg width="47px" height="47px" viewBox="177 44 47 47" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <rect x="177" y="44" width="47" height="47" id="rect-1"></rect>
    </defs>
    <g id="Jupiter" stroke="none" fill="none">
      <image x="177" y="44" width="47" height="47"
             href="data:image/png;base64,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"></image>
    </g>
  </svg>;

export const iconPlanet = { jupiter: jupiter, galaxy: galaxy };
