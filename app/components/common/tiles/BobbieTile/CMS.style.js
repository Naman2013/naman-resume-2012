import css from 'styled-jsx/css';
import { resetMarginPadding } from 'styles/variables/utils';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { lightHeadedAstronaut, geyser } from 'styles/variables/colors_tiles_v4';
import { screenMedium, screenLarge } from 'styles/variables/breakpoints';

const stylePrefix = '.__html-blob-content-container__';

export default css`
   ${stylePrefix} :global(*) {
     ${resetMarginPadding}
     font-family: ${secondaryFont};
     color: ${lightHeadedAstronaut};
     vertical-align: top;
     font-size: 1.1em;
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
     font-size: 14px;
     margin-bottom: 30px;
   }

   ${stylePrefix} :global(.videoEmbedDIV) {
     text-align: center;
   }

   ${stylePrefix} :global() {}

   ${stylePrefix} :global() {}

   ${stylePrefix} :global() {}

   .__html-blob-content-container__,
   .read-duration {
     /* display: none; */
   }

   .__html-blob-content-container__ :global(hr) {
     width: 100%;
     border-color: black;
     border-width: 1px;
     margin-top: 10px;
     margin-bottom: 10px;
   }

   .__html-blob-content-container__ :global(ol) {
     margin-left: 40px;
     margin-bottom: 20px;
   }

   .__html-blob-content-container__ :global(ul) {
     margin-left: 40px;
     margin-bottom: 20px;
   }

   .__html-blob-content-container__ :global(li) {
     margin-bottom: 10px;
   }

   .__html-blob-content-container__ :global(p) {
     margin-top: 20px;
     margin-bottom: 20px;
   }

   .__html-blob-content-container__ :global(h1) {
     margin-top: 10px;
     margin-bottom: 10px;
   }

   .__html-blob-content-container__ :global(h2) {
     margin-top: 10px;
     margin-bottom: 10px;
   }

   .__html-blob-content-container__ :global(h3) {
     margin-top: 10px;
     margin-bottom: 10px;
   }

   .__html-blob-content-container__ :global(h4) {
     margin-top: 10px;
     margin-bottom: 10px;
   }

   .__html-blob-content-container__ :global(h5) {
     margin-top: 10px;
     margin-bottom: 10px;
   }

   .__html-blob-content-container__ :global(table) {
     margin-top: 30px;
     margin-bottom: 30px;
   }

   .__html-blob-content-container__ :global(a) {
     text-decoration: underline;
   }

   @media ${screenMedium} {
     .__html-blob-content-container__,
     .read-duration {
       display: block;
     }

     .author-name img,
     .author-name span { display: none; }

     .tile-content-container {
       padding: 40px 50px;
     }

     ul {
       display: flex;
       padding: 10px 0;
       margin-bottom: 20px;
       border-bottom: 1px solid ${geyser};
     }

     .read-duration {
       border-right: 1px solid ${geyser};
       padding-right: 10px;
       margin-right: 10px;
     }
   }
`;
