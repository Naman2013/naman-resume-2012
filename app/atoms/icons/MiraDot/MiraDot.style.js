import css from 'styled-jsx/css';
import { astronaut } from 'styles/variables/colors_tiles_v4';
import { faintShadow } from 'styles/variables/shadows';

export default css`
  ${faintShadow}
  display: inline-block;
  background-color: ${astronaut};
  border: 2px solid white;
  border-radius: 50%;
`;
