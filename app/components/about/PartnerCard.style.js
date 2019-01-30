import css from 'styled-jsx/css';
import { screenMedium, screenLarge } from '../../styles/variables/breakpoints';
import { faintShadow } from '../../styles/variables/shadows';

export default css`
  .img-wrapper {
    width: 90%;
    height: 200px;
    margin: 15px 5% 0 5%;
    ${faintShadow}
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .img-wrapper img {
    width:100%;
    height:100%;
    padding: 20px;
    object-fit: contain;
  }

  @media ${screenMedium} {
    .img-wrapper {
      width: 48%;
      height: 200px;
      margin: 15px 0 0 0;
      ${faintShadow}
    }
  }

  @media ${screenLarge} {
    .img-wrapper {
      width: 32%;
      height: 200px;
      margin: 15px 0 0 0;
      ${faintShadow}
    }
  }
`;
