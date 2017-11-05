import { uniqueId } from 'lodash';
import createReducer from '../utils/createReducer';
import generateInlineURL from '../../utils/generateInlineURL';

import {
  GET_HOME_PAGE_START,
  GET_HOME_PAGE_SUCCESS,
  GET_HOME_PAGE_FAIL,
} from './actions';

const initialState = {
  refreshIntervalSec: 600,
  membershipTierArray: [],
  loadHeroTypes: [],
  RECENT_STUFF: [
    {
      key: uniqueId(),
      title: 'Total Solar Eclipse: Totality',
      content: 'Slooh watched the Total Solar Eclipse on August 21st out in Stanley, ID! Check out our totality with our exclusive shots of the beautiful eclipse!',
      contentLink: '',
      imageUrl: 'https://vega.slooh.com/assets/images/samples/perseid-meteor-shower.png',
      videoUrl: 'https://www.youtube.com/embed/9zS8i9EV3L0?rel=0&amp;showinfo=0',
    },
    {
      key: uniqueId(),
      title: 'Delta Aquariids',
      content: 'When we watched the Delta Aquariids this year we caught a great moment with a bright fireball as it flashed through the sky! Check it out!',
      contentLink: '',
      imageUrl: 'https://vega.slooh.com/assets/images/samples/perseid-meteor-shower.png',
      videoUrl: 'https://www.youtube.com/embed/DtuwMbR2BgM?rel=0&amp;showinfo=0',
    },
    {
      key: uniqueId(),
      title: 'Nashville Zoo Observation highlight',
      content: 'Did you know animals are affected by the eclipse just like people are? On August 21st, we got a look at how the animals at the Nashville Zoo reacted to their near totality!',
      contentLink: '',
      imageUrl: 'https://vega.slooh.com/assets/images/samples/perseids.png',
      videoUrl: 'https://www.youtube.com/embed/My-5U-xI3cY?rel=0&amp;showinfo=0',
    },
  ],
  promoBandContent: 'Slooh Membership: An All-Access Pass to the Night Sky.',
  ADDITIONAL_OFFERING_HEADER: 'CHECK OUT MORE OF WHAT SLOOH HAS TO OFFER:',
  VIEWABLE_OBJECTS: {
    ADDITIONAL_OFFERING_BAND: 'Currently Featured Events and Objects',
    title: 'OK, there are billions of items out there to choose from, but we have to start somewhere...',
    objects: [
      {
        key: uniqueId(),
        title: 'Saturn',
        imageUrl: 'https://vega.slooh.com/assets/images/objects/planet-saturn.png',
        url: '/objects/latest-entries/3/all',
      },
      {
        key: uniqueId(),
        title: 'Jupiter',
        imageUrl: 'https://vega.slooh.com/assets/images/objects/planet-jupiter.png',
        url: '/objects/latest-entries/6/all',
      },
      {
        key: uniqueId(),
        title: 'Solar eclipses',
        imageUrl: 'https://vega.slooh.com/assets/images/photos/eclipse.jpg',
        type: '',
        url: '/objects/latest-entries/524/all',
      },
      {
        key: uniqueId(),
        title: 'Exploding Galaxy M82',
        imageUrl: 'https://vega.slooh.com/assets/images/photos/exploding-galaxy-M82.jpg',
        url: '/objects/latest-entries/7/all',
      },
      {
        key: uniqueId(),
        title: 'Comets',
        imageUrl: 'https://vega.slooh.com/assets/images/photos/comets.jpg',
        url: '/objects/latest-entries/562/all',
      },
    ],
    latestNews: 'We\'ve curated a catalog of our members\' favorite objects and events in the night sky which we call the Slooh 500. These are the best looking objects to see through our telescopes which also have the most interesting folklore created in their name. Our community forms around them.',
    action: {
      text: 'See Object',
      url: '#',
    },
  },
  COMMUNITY_CONTENT_BAND: 'A Sampling of Illuminations Content',
  SPONSORS_CONTENT_BAND: 'A World-Class Network of Partners',
  SPONSORS_SUB_TITLE: 'Our partners help to bring live telescope feeds of the cosmos to the world.',
  SPONSOR_IMAGES: [
    {
      imageUrl: 'https://vega.slooh.com/assets/images/sponsors/ABC_News_Logo.jpg',
      size: '90%',
    },
    {
      imageUrl: 'https://vega.slooh.com/assets/images/sponsors/42_digital_logo_dark_blue_HI.png',
      size: '80%',
    },
    {
      imageUrl: 'https://vega.slooh.com/assets/images/sponsors/Wanderlust-truenorth-web-1.png',
      size: '90%',
    },
    {
      imageUrl: 'https://vega.slooh.com/assets/images/sponsors/logo-iac.png',
      size: '60%',
    },
    {
      imageUrl: 'https://vega.slooh.com/assets/images/sponsors/pontificia.png',
      size: '90%',
    },
    {
      imageUrl: 'https://vega.slooh.com/assets/images/sponsors/ASP-logo.png',
      size: '70%',
    },
    {
      imageUrl: 'https://vega.slooh.com/assets/images/sponsors/OFA-logo.png',
      size: '70%',
    },
    {
      imageUrl: 'https://vega.slooh.com/assets/images/sponsors/TimeandDate.png',
      size: '90%',
    },
    {
      imageUrl: 'https://vega.slooh.com/assets/images/sponsors/fiat-physica.png',
      size: '90%',
    },
    {
      imageUrl: 'https://vega.slooh.com/assets/images/sponsors/ctinnovations.jpg',
      size: '90%',
    },
    {
      imageUrl: 'https://vega.slooh.com/logos/PSLogo.png',
      size: '90%',
    },
  ],
};

export default createReducer(initialState, {
  [GET_HOME_PAGE_START](state) {
    return state;
  },
  [GET_HOME_PAGE_SUCCESS](state, { data }) {
    return {
      ...state,
      ...data,
    };
  },
  [GET_HOME_PAGE_FAIL](state, { error }) {
    return {
      ...state,
      error,
    };
  },
});
