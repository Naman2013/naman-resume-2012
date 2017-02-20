export default {
  STATIC_HERO: {
    backgroundImageUrl: 'assets/images/graphics/stargazers-bg.png',
    mainHeadingText: 'WELCOME TO SPACE FOR EVERYONE.',
    subHeadingText: 'Slooh.com is Online Telescopes, LIVE Streaming Events, Original Video Programming, and more.',
    funFactText: 'That light started towards earth 2 million years ago? Seriously?',
    funFactImage: 'assets/icons/Emoji_FL@33_MindBlown_F_1308x1976.png',
    actionUrl: '#',
    actionText: 'Watch Video Tour'
  },
  RECENT_STUFF: [
    {
      key: 1,
      title: 'Lunar Eclipse',
      content: 'A supposedly ho-hum penumbral lunar eclipse is anything but in Slooh’s Chile telescope, covered live with Gerry Monteux and Paul Cox on February 10th.',
      imageUrl: 'assets/images/samples/bobpubjpg.png',
      videoUrl: 'https://www.youtube.com/embed/Ttm-PjbAAQE'
    },
    {
      key: 2,
      title: 'Total Solar Eclipse',
      content: 'Road Trip with Slooh to Stanley, Idaho to witness the Total Solar Eclipse on August 21st, or watch our coverage live right here on Slooh.',
      imageUrl: 'assets/images/samples/perseid-meteor-shower.png',
      videoUrl: 'https://www.youtube.com/embed/ZU4Nt_-nLFY'
    },
    {
      key: 3,
      title: 'Star of Bethlehem',
      content: 'Do you believe in miracles? Slooh looked back in time to ponder what the ancients might have seen that fateful night.',
      imageUrl: 'assets/images/samples/perseids.png',
      videoUrl: 'https://www.youtube.com/embed/lzseVZk6Sx0'
    }
  ],
  promoBandContent: 'Slooh Membership: An All-Access Pass to the Night Sky.',
  SLOOH_FEATURES: [
    {
      key: Math.random() * 100,
      icon: 'assets/icons/observatory.png',
      title: 'REMOTELY CONTROL POWERFUL ONLINE TELESCOPES.',
      content: 'Slooh allows Members to remotely control professional-grade telescopes in both the Canary Islands and Chile. It’s easy to take deep space photos and share them with others!',
      actionUrl: '#',
      actionText: 'Explore Pricing'
    },
    {
      key: Math.random() * 100,
      icon: 'assets/icons/jupiter-icon.png',
      title: 'EXPERIENCE MAJOR CELESTIAL EVENTS ALONGSIDE MILLIONS.',
      content: 'Slooh will keep you up-to-date on what’s about to happen and how best to see it. During LIVE streaming events, Slooh’s knowledgable exerts guide you through the night sky and its wonders.',
      actionUrl: '#',
      actionText: 'See Full Schedule'
    },
    {
      key: Math.random() * 100,
      icon: 'assets/icons/three-amigos.png',
      title: 'PARTICIPATE IN A COMMUNITY OF FELLOW EXPLORERS.',
      content: 'Whether you are a high school or college student, practicing astronomer, or a passionate “prosumer” hobbyist, Slooh has something for you. Register today and get one step closer to the cosmos.',
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
        title: 'Perseid Meteor Shower',
        imageUrl: 'assets/images/objects/meteor-shower.png',
        type: 'external',
        url: 'https://www.slooh.com/Total_Solar_Eclipse_2017.php',
      },
      {
        key: Math.random() * 100,
        title: 'St. Patrick\'s Day Aurora',
        imageUrl: 'assets/images/objects/blood-moon.png',
        url: '/shows/event-details/404',
      },
      {
        key: Math.random() * 100,
        title: 'Comet 41P Close Approach',
        imageUrl: 'assets/images/objects/cassiopeia.png',
        url: '/shows/event-details/405',
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
      imageUrl: 'assets/images/sponsors/ABC_News_Logo.png',
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
      imageUrl: 'assets/images/sponsors/Celestron_Logo_as_of_2015.png',
      size: '100%'
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
  ]
};
