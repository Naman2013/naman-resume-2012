import css from 'styled-jsx/css';
import { white } from 'styles/variables/colors_tiles_v4';
import { shadyBottomShadow } from 'styles/variables/shadows';

export default css`
  .star-share-camera-root {
    ${shadyBottomShadow}
    background-color: ${white};
  }

  .action-list {
    padding: 20px 30px;
    margin: 0;
    list-style-type: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
