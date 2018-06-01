import { darkBlueGray, white } from '../../styles/variables/colors';
import { profilePhotoStyle } from '../../styles/mixins/utilities';
export const fullWidthBtn = (`
  width: 100%;
  background-color: ${darkBlueGray};
  color: ${white};
  font-weight: bold;
  text-align: center;
  padding: 15px 0;
`);

export const dropShadowedContainer = (`
  background-color: ${white};
  margin: 10px;
  padding: 25px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
`);

export const profPic = photoUrl => Object.assign(profilePhotoStyle(photoUrl), {
  height: '50px',
  width: '50px',
  backgroundSize: 'cover',
});
