import css from 'styled-jsx/css';
import { astronaut } from 'styles/variables/colors_tiles_v4';

export default css`
  .circle-timer {
    display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox;      /* TWEENER - IE 10 */
    display: -webkit-flex;     /* NEW - Chrome */
    display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

  }

  .circle-timer img{
    height: 22px;
    margin: 0 5px;
  }

  .circle-timer :global(.circle) {
    position: relative;
    display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox;      /* TWEENER - IE 10 */
    display: -webkit-flex;     /* NEW - Chrome */
    display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    margin-right: 10px;
    font-size: 12px;
  }

  .circle-timer :global(.circle)  svg {
    position: absolute;
    top: 0;
    left: 0;
  }

  .counter-number {
    position: absolute;
    color: ${astronaut};
  }
`;
