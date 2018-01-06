import { primaryFont } from '../../../styles/variables/fonts'
import { pink, white } from '../../../styles/variables/colors';

export default function primaryButton(content = 'Primary button', anchorAddress = '#') {
  return (`
    <a
      style="
        display: block;
        margin: 0 auto;
        width: 60%;
        font-family: ${primaryFont};
        color: ${white};
        background-color: ${pink};
        padding: 10px 50px;
      "
      href=${anchorAddress}
      reload="true"
    >${content}</a>
  `);
}
