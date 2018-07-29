import css from 'styled-jsx/css';
import { resetMarginPadding } from 'styles/variables/utils';

const stylePrefix = '.__html-blob-content-container__';

export default css`
   ${stylePrefix} :global(.contentImageEmbedCaption) {
     border: 1px solid red;
   }
`;
