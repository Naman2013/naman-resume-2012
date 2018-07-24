import { astronaut, romance } from 'styles/variables/colors_tiles_v4';
import { profilePhotoStyle, dropShadowContainer } from '../../styles/mixins/utilities';

export const fullWidthBtn = (`
  width: 100%;
  background-color: ${astronaut};
  color: ${romance};
  font-weight: bold;
  text-align: center;
  padding: 15px 0;
`);

export const dropShadowedContainer = (`
  background-color: ${romance};
  margin: 10px;
  padding: 25px;
  ${dropShadowContainer}
`);

export const profPic = photoUrl => Object.assign(profilePhotoStyle(photoUrl), {
  height: '50px',
  width: '50px',
  backgroundSize: 'cover',
});
