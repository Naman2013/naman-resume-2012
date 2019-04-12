import css from 'styled-jsx/css';
import { shadyBottomShadow } from 'app/styles/variables/shadows';

export default css`
  .star-share-camera-root {
    ${shadyBottomShadow}
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
