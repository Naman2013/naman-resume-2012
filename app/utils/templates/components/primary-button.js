import { primaryFont } from '../../../styles/variables/fonts'
import { pink, white } from '../../../styles/variables/colors';

export default function primaryButton(content = 'Primary button', anchorAddress = '#') {
  return (`
    <a
      style="
        font-family: ${primaryFont};
        color: ${white};
        background-color: ${pink};
      "
      href=${anchorAddress}
    >${content}</a>
  `);
}
