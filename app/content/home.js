export default {
  STATIC_HERO: {
    backgroundImageUrl: 'assets/images/graphics/stargazers-bg.png',
    mainHeadingText: 'WELCOME TO SPACE FOR EVERYONE.',
    subHeadingText: 'Slooh.com is Online Telescopes, LIVE Streaming Events, Community and more.',
    funFactText: 'That light started towards earth 2 million years ago? Seriously?',
    funFactImage: 'assets/icons/Emoji_FL@33_MindBlown_F_1308x1976.png',
    actionUrl: '#',
    actionText: 'Watch Video Tour'
  },
  RECENT_STUFF: [
    {
      key: 1,
      title: 'Lunar Eclipse',
      content: 'A penumbral lunar eclipse from Slooh’s Chile observatory exciting Slooh hosts Gerry Monteux and Paul Cox on February 10th',
      imageUrl: 'assets/images/samples/bobpubjpg.png',
      videoUrl: 'https://www.youtube.com/embed/Ttm-PjbAAQE?rel=0&amp;showinfo=0'
    },
    {
      key: 2,
      title: 'Total Solar Eclipse',
      content: 'Road Trip with Slooh to Stanley, Idaho to witness the Total Solar Eclipse on August 21st, or watch our coverage live right here on Slooh.',
      imageUrl: 'assets/images/samples/perseid-meteor-shower.png',
      videoUrl: 'https://www.youtube.com/embed/ZU4Nt_-nLFY?rel=0&amp;showinfo=0'
    },
    {
      key: 3,
      title: 'Star of Bethlehem',
      content: 'Do you believe in miracles? Slooh looked back in time to ponder what the ancients might have seen that fateful night.',
      imageUrl: 'assets/images/samples/perseids.png',
      videoUrl: 'https://www.youtube.com/embed/lzseVZk6Sx0?rel=0&amp;showinfo=0'
    }
  ],
  promoBandContent: 'Slooh Membership: An All-Access Pass to the Night Sky.',
  SLOOH_FEATURES: [
    {
      key: Math.random() * 100,
      icon: 'assets/icons/observatory.png',
      title: 'REMOTELY CONTROL POWERFUL ONLINE TELESCOPES.',
      content: 'Slooh allows Members to remotely control professional-grade telescopes in both the Canary Islands and Chile. It’s easy to take deep space photos and share them with others!',
      actionUrl: '#/about/pricing',
      actionText: 'Explore Pricing'
    },
    {
      key: Math.random() * 100,
      icon: 'assets/icons/jupiter-icon.png',
      title: 'EXPERIENCE MAJOR CELESTIAL EVENTS IN THE SPACE SITUATION ROOM.',
      content: 'Slooh will keep you up-to-date on what’s happening in space with LIVE streaming events and feeds from observatory partners around the world. Slooh’s knowledgeable experts guide you through the night sky and its wonders.',
      actionUrl: '#/shows/event-details',
      actionText: 'See Upcoming'
    },
    {
      key: Math.random() * 100,
      icon: 'assets/icons/three-amigos.png',
      title: 'PARTICIPATE IN A COMMUNITY OF FELLOW EXPLORERS.',
      content: 'Space is more interesting as a social experience. Register today to see and share diverse perspectives about what is "out there", including the spiritual, the artistic, the imaginative, along with the scientific.',
      actionUrl: '#',
      actionText: 'Free Registration'
    }
  ],
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
        url: '/shows/event-details/393',
      },
      {
        key: Math.random() * 100,
        title: 'Exploding Galaxy M82',
        imageUrl: 'assets/images/photos/exploding-galaxy-M82.png',
        url: '/objects/latest-entries/7/all',
      },
      {
        key: Math.random() * 100,
        title: '"The Rock" Asteroid',
        imageUrl: 'assets/images/photos/asteroid-circle.png',
        url: '/shows/event-details/422',
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
