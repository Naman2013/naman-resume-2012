import css from 'styled-jsx/css';
import { astronaut } from 'app/styles/variables/colors_tiles_v4';
import { secondaryFont } from 'app/styles/variables/fonts';

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
  font-size: 15px;
  padding-top: 40px;
  text-align: center;
}
`;
