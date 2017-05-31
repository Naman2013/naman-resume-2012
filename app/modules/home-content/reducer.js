import createReducer from '../utils/createReducer';

import {
  GET_HOME_PAGE_START,
  GET_HOME_PAGE_SUCCESS,
  GET_HOME_PAGE_FAIL,
} from './actions';

const initialState = {
  refreshIntervalSec: 600,
  membershipTierArray: [],
  RECENT_STUFF: [
    {
      key: 1,
      title: 'Lunar Eclipse',
      content: 'On February 26th we witnessed the ring of fire solar eclipse with Slooh host Gerry Monteux and special guests including Burnie Burns of Rooster Teeth',
      contentLink: '',
      imageUrl: 'assets/images/samples/bobpubjpg.png',
      videoUrl: 'https://www.youtube.com/embed/rQMCVtyvsOQ?rel=0&amp;showinfo=0'
    },
    {
      key: 2,
      title: 'Total Solar Eclipse',
      content: 'Road Trip with Slooh to Stanley, Idaho to witness the Total Solar Eclipse on August 21st, or watch our coverage live right here on Slooh.',
      contentLink: 'https://www.slooh.com/#/road-trip?_k=8u86a2',
      imageUrl: 'assets/images/samples/perseid-meteor-shower.png',
      videoUrl: 'https://www.youtube.com/embed/ZU4Nt_-nLFY?rel=0&amp;showinfo=0'
    },
    {
      key: 3,
      title: 'Gazing at the Milky Way',
      content: 'How does light pollution affect your view of the universe? On May 25th, we explored the importance of dark skies while looking live at the Milky Way with special guests, Julie Fletcher and Athena Brensberger.',
      contentLink: '',
      imageUrl: 'assets/images/samples/perseids.png',
      videoUrl: 'https://www.youtube.com/embed/Mr8qK-aM9JE?rel=0&amp;showinfo=0'
    }
  ],
  promoBandContent: 'Slooh Membership: An All-Access Pass to the Night Sky.',
  ADDITIONAL_OFFERING_HEADER: 'CHECK OUT MORE OF WHAT SLOOH HAS TO OFFER:',
  VIEWABLE_OBJECTS: {
    ADDITIONAL_OFFERING_BAND: 'Currently Featured Events and Objects',
    title: 'OK, there are billions of items out there to choose from, but we have to start somewhere...',
    objects: [
      {
        key: Math.random() * 100,
        title: 'Saturn',
        imageUrl: 'assets/images/objects/planet-saturn.png',
        url: '/objects/latest-entries/3/all',
      },
      {
        key: Math.random() * 100,
        title: 'Jupiter',
        imageUrl: 'assets/images/objects/planet-jupiter.png',
        url: '/objects/latest-entries/6/all',
      },
      {
        key: Math.random() * 100,
        title: 'Total solar eclipse',
        imageUrl: 'assets/images/photos/eclipse.png',
        type: '',
        url: '/road-trip',
      },
      {
        key: Math.random() * 100,
        title: 'Exploding Galaxy M82',
        imageUrl: 'assets/images/photos/exploding-galaxy-M82.png',
        url: '/objects/latest-entries/7/all',
      },
      {
        key: Math.random() * 100,
        title: 'Comets',
        imageUrl: 'assets/images/photos/comets.jpg',
        url: '/objects/latest-entries/562/all',
      },
    ],
    latestNews: 'We\'ve curated a catalog of our members\' favorite objects and events in the night sky which we call the Slooh 500. These are the best looking objects to see through our telescopes which also have the most interesting folklore created in their name. Our community forms around them.',
    action: {
      text: 'See Object',
      url: '#'
    }
  },
  COMMUNITY_CONTENT_BAND: 'A Sampling of Slooh Community Content',
  SPONSORS_CONTENT_BAND: 'A World-Class Network of Partners',
  SPONSORS_SUB_TITLE: 'Our partners help to bring live telescope feeds of the cosmos to the world.',
  SPONSOR_IMAGES: [
    {
      imageUrl: 'assets/images/sponsors/ABC_News_Logo.jpg',
      size: '90%'
    },
    {
      imageUrl: 'assets/images/sponsors/42_digital_logo_dark_blue_HI.png',
      size: '80%'
    },
    {
      imageUrl: 'assets/images/sponsors/Wanderlust-truenorth-web-1.png',
      size: '90%'
    },
    {
      imageUrl: 'assets/images/sponsors/logo-iac.png',
      size: '60%'
    },
    {
      imageUrl: 'assets/images/sponsors/pontificia.png',
      size: '90%'
    },
    {
      imageUrl: 'assets/images/sponsors/ASP-logo.png',
      size: '70%'
    },
    {
      imageUrl: 'assets/images/sponsors/OFA-logo.png',
      size: '70%'
    },
    {
      imageUrl: 'assets/images/sponsors/TimeandDate.png',
      size: '90%'
    },
    {
      imageUrl: 'assets/images/sponsors/fiat-physica.png',
      size: '90%'
    },
    {
      imageUrl: 'assets/images/sponsors/ctinnovations.jpg',
      size: '90%'
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
