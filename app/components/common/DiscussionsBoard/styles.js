import { darkBlueGray, white, gray } from 'styles/variables/colors';
import { profilePhotoStyle } from 'styles/mixins/utilities';

export const fullWidthBtn = (`
  width: 100%;
  background-color: ${darkBlueGray};
  color: ${white};
  font-weight: bold;
  text-align: center;
  padding: 15px 0;
`);

export const profPic = photoUrl => Object.assign(profilePhotoStyle(photoUrl), {
  height: '50px',
  width: '50px',
  backgroundSize: 'cover',
});
