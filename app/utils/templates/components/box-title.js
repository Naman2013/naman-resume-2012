import { primaryFont } from '../../../styles/variables/fonts';
import { white } from '../../../styles/variables/colors';

export default function boxTitle(content = 'Box Title') {
  return (`
    <h1
      style="
        font-family: ${primaryFont};
        font-size: 65px;
        font-weight: 800;
        color: ${white};
        text-transform: uppercase;
      "
    >${content}</h1>
  `);
}
