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
