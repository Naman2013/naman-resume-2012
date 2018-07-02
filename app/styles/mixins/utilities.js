import { primaryFont } from 'styles/variables/fonts';

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
