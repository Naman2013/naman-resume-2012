import css from 'styled-jsx/css';
import { astronaut } from 'styles/variables/colors_tiles_v4';
import { secondaryFont } from 'styles/variables/fonts';

export default css`
.root {
  padding: 0;
}

.content {
  padding: 30px 0;
  color: ${astronaut};
  font-family: ${secondaryFont};
}

.meta-data {
  padding: 0 40px;
}

.copy {
  font-size: 19px;
  padding-top: 30px;
}
`;
