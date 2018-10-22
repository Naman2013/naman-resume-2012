import css from 'styled-jsx/css';
import { resetMarginPadding } from 'styles/variables/utils';
import { secondaryFont } from 'styles/variables/fonts';
import { lightHeadedAstronaut, geyser } from 'styles/variables/colors_tiles_v4';

const stylePrefix = '.__html-blob-content-container__';

export default css`
   ${stylePrefix} :global(*) {
     ${resetMarginPadding}
     font-family: ${secondaryFont};
     color: ${lightHeadedAstronaut};
     vertical-align: top;
   }

   ${stylePrefix} :global(p) {
     line-height: 1.5;
   }

   ${stylePrefix} :global(.contentImageEmbedDIV) {
     text-align: center;
   }

   ${stylePrefix} :global(.contentImageEmbedDIV .contentImageEmbed) {
     padding: 1px;
     border: 1px solid ${geyser};
     margin-bottom: 10px;
     width: 90%;
   }

   ${stylePrefix} :global(.videoEmbedIFrame ) {
     margin-bottom: 10px;
     width: 90%;
   }

   ${stylePrefix} :global(.contentImageEmbedCaption, .videoEmbedCaption) {
     font-size: 10px;
   }

   ${stylePrefix} :global(.videoEmbedDIV) {
     text-align: center;
   }

   ${stylePrefix} :global() {}

   ${stylePrefix} :global() {}

   ${stylePrefix} :global() {}
`;
