import { primaryFont } from 'styles/variables/fonts';
import { shadows } from 'styles/variables/colors_tiles_v4';

export const profilePhotoStyle = photoUrl => ({
  backgroundImage: `url(${photoUrl})`,
  height: '100px',
  width: '100px',
  borderRadius: '50%',
  backgroundSize: '100%',
  backgroundPosition: 'center',
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

export const borderRadius = radius => (`
  -moz-border-radius: ${radius};
  -webkit-border-radius: ${radius};
  -ms-border-radius: ${radius};
  border-radius: ${radius};
`);

export const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '650px',
    padding: '50px 25px',
    fontFamily: primaryFont,
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
};

export const customModalStylesV4 = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '650px',
    padding: '50px 25px',
    fontFamily: primaryFont,
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
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
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
};

export const dropShadowContainer = `
  -moz-box-shadow: 0 2px 4px 1px ${shadows};
  -webkit-box-shadow: 0 2px 4px 1px ${shadows};
  box-shadow: 0 2px 4px 1px ${shadows};
`;

export const smallProfPic = photoUrl => Object.assign(profilePhotoStyle(photoUrl), {
  height: '50px',
  width: '50px',
  backgroundSize: 'cover',
});
