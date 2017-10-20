import { white } from '../../styles/variables/colors';

export default (`
  .my-pictures-container {
    padding: 20px;
  }
  .container {
    width: 100%;
    display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox;      /* TWEENER - IE 10 */
    display: -webkit-flex;     /* NEW - Chrome */
    display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    -ms-flex-wrap: wrap;
  }
  .left {
    flex: 3;
    padding-right: 25px;
  }
  .right {
    flex: 1.5;
    background-color: ${white};
    padding: 10px;
  }
  .right-top {
    flex: 1.5;
    padding: 10px;
  }
`);
