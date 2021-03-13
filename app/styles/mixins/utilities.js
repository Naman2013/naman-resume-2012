import { primaryFont } from 'app/styles/variables/fonts';
import { shadows, romance } from 'app/styles/variables/colors_tiles_v4';

export const defaultModalContent = {
  top: '50%',
  left: '50%',
  right: 'auto',
  bottom: 'auto',
  marginRight: '-50%',
  transform: 'translate(-50%, -50%)',
};

export const profilePhotoStyle = photoUrl => ({
  backgroundImage: `url(${photoUrl})`,
  height: '100px',
  width: '100px',
  borderRadius: '50%',
  backgroundSize: '100%',
  backgroundPosition: 'center',
  fontFamily: primaryFont,
});

export const backgroundImageCover = `
  background-repeat: no-repeat;
  background-position: center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
`;

export const backgroundImageCoverMap = {
  backgroundRepeat: 'no-repeat',
  WebkitBackgroundSize: 'cover',
  MozBackgroundSize: 'cover',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
};

export const borderRadius = radius => `
  -moz-border-radius: ${radius};
  -webkit-border-radius: ${radius};
  -ms-border-radius: ${radius};
  border-radius: ${radius};
`;

export const customModalStyles = {
  content: {
    ...defaultModalContent,
    maxWidth: '650px',
    padding: '25px',
    width: '90vw',
    borderRadius: '0px',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
};

export const customModalStylesV4 = {
  content: {
    ...defaultModalContent,
    maxWidth: '650px',
    padding: '50px 25px',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
};

export const customModalStylesFitContent = {
  content: {
    ...defaultModalContent,
    maxWidth: '91vw',
    height: 'fit-content',
    width: 'fit-content',
    padding: '3px',
    // backgroundColor: darkGrey,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, .7)',
  },
};

export const customModalStylesBlackOverlay = {
  content: {
    ...defaultModalContent,
    maxWidth: '650px',
    minWidth: '300px',
    border: 0,
    padding: '20px 25px',
  },
  overlay: {
    backgroundColor: 'rgba(60,70,85, 0.9)',
  },
};

export const customModalStylesBlackOverlayBadge = {
  content: {
    ...defaultModalContent,
    maxWidth: '650px',
    minWidth: '300px',
    border: 0,
    padding: '20px 5px',
  },
  overlay: {
    backgroundColor: 'rgba(60,70,85, 0.9)',
  },
};

export const customModalStylesBlackHalfOverlay = {
  content: {
    ...defaultModalContent,
    maxWidth: '820px',
    minWidth: '300px',
    border: 0,
    padding: '20px 25px',
  },
  overlay: {
    backgroundColor: 'rgba(60,70,85, 0.5)',
  }
}

export const customModalStylesSloohBlueOverlay = {
  content: {
    ...defaultModalContent,
    maxWidth: '250px',
    minHeight: '300px',
    // minWidth: '300px',
    border: 0,
    padding: '20px 25px',
    backgroundColor: '#253446',
  },
  overlay: {
    backgroundColor: 'rgba(60,70,85, 0.9)',
  },
};

export const customModalStylesPublicProfileCardBlueOverlay = {
  content: {
    ...defaultModalContent,
    width: window.innerWidth < 768 ? '90%' : '650px',
    minHeight: '300px',
    minWidth: '300px',
    maxHeight: '80%',
    border: 0,
    padding: '20px 25px',
    backgroundColor: '#253446',
    // overflowY: 'scroll',
  },
  overlay: {
    backgroundColor: 'rgba(60,70,85, 0.9)',
  },
};

export const customModalStylesChartPopupBlueOverlay = {
  content: {
    ...defaultModalContent,
    width: window.innerWidth < 768 ? '90%' : '80%',
    minHeight: '300px',
    minWidth: '300px',
    maxHeight: '80%',
    border: 0,
    padding: '20px 25px',
    backgroundColor: '#253446',
    // overflowY: 'scroll',
  },
  overlay: {
    backgroundColor: 'rgba(60,70,85, 0.9)',
  },
};

export const customModalStylesFitDevice = {
  content: {
    ...defaultModalContent,
    maxWidth: '90vw',
    minWidth: '300px',
    border: 0,
    padding: '20px 25px',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, .7)',
  },
};

export const customModalStylesFitDeviceScrollable = {
  content: {
    ...defaultModalContent,
    maxWidth: '90vw',
    minWidth: '300px',
    maxHeight: '95vh',
    border: 0,
    padding: '50px 25px',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, .7)',
  },
};

export const modalStyleFullPage = {
  content: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    padding: 0,
    fontFamily: primaryFont,
    borderRadius: 0,
    backgroundColor: romance,
  },
  overlay: {
    backgroundColor: romance,
  },
};

export const dropShadowContainer = `
  -moz-box-shadow: 0 2px 4px 1px ${shadows};
  -webkit-box-shadow: 0 2px 4px 1px ${shadows};
  box-shadow: 0 2px 4px 1px ${shadows};
`;

export const smallProfPic = photoUrl =>
  Object.assign(profilePhotoStyle(photoUrl), {
    height: '50px',
    width: '50px',
    backgroundSize: 'cover',
  });
