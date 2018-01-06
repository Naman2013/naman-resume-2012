import { secondaryFont } from '../../../styles/variables/fonts';
import { white } from '../../../styles/variables/colors';

export default function boxSubtitle(content) {
  return (`
    <h2
      style="
        font-family: ${secondaryFont};
        color: ${white};
        font-size: 22px;
      "
    >${content}</h2>
  `);
}
