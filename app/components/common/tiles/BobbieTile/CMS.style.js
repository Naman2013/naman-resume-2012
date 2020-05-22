import css from 'styled-jsx/css';
import { resetMarginPadding } from 'app/styles/variables/utils';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import {
  lightHeadedAstronaut,
  geyser,
} from 'app/styles/variables/colors_tiles_v4';
import { screenMedium, screenLarge } from 'app/styles/variables/breakpoints';

const stylePrefix = '.__html-blob-content-container__';

export default css`
  ${stylePrefix} :global(*) {
    ${resetMarginPadding}
    font-family: ${secondaryFont};
    color: ${lightHeadedAstronaut};
    vertical-align: top;
    font-size: 18px;
  }

  ${stylePrefix} :global(p) {
    line-height: 1.5;
    white-space: pre-line;
  }

  
  ${stylePrefix} :global(p + table td .contentImageEmbedDIV:nth-child(1)) {
    margin-top: 0px;
  }
  
  ${stylePrefix} :global(p + table td > p:nth-child(1)) {
    margin-top: 0px;
  }
  
  ${stylePrefix} :global(p + table[border="1"] td .contentImageEmbedDIV:nth-child(1)) {
    margin-top: 20px;
  }

  ${stylePrefix} :global(.contentImageEmbedDIV) {
    text-align: center;
    margin-top: 20px;
  }

  ${stylePrefix} :global(.contentImageEmbedDIV .contentImageEmbed) {
    padding: 1px;
    border: 1px solid ${geyser};
    width: 90%;
  }

  ${stylePrefix} :global(.contentImageEmbedDIV .contentImageEmbedCaption) {
    width: 90%;
    margin: 0 auto;
  }

  ${stylePrefix} :global(.contentImageEmbedDIV .contentImageEmbedCaption p) {
    font-style: italic;
    font-size: 16px;
    line-height: 1;
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
    height: 0;
    width: 100%;
    padding-top: 56.25%;
    position: relative;
    overflow: hidden; 
  }

  ${stylePrefix} :global(.videoEmbedDIV iframe) {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

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
    margin-top: 20px;
  }

  .__html-blob-content-container__ :global(ul) {
    margin-left: 40px;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .__html-blob-content-container__ :global(li) {
    margin-bottom: 10px;
  }

  .__html-blob-content-container__ :global(td) {
    padding: 5px;
  }

  .__html-blob-content-container__ :global(p) {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .__html-blob-content-container__ :global(h1) {
    font-size: 2.1rem;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .__html-blob-content-container__ :global(h1 *) {
    font-size: inherit;
  }

  .__html-blob-content-container__ :global(h2) {
    font-size: 1.95rem;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .__html-blob-content-container__ :global(h3) {
    font-size: 1.85rem;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .__html-blob-content-container__ :global(h4) {
    font-size: 1.75rem;    
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .__html-blob-content-container__ :global(h5) {
    font-size: 1.65rem;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .__html-blob-content-container__ :global(h6) {
    font-size: 1.55rem;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .__html-blob-content-container__ :global(table) {
    margin-top: 0px;
    margin-bottom: 0px;
  }

  .__html-blob-content-container__ :global(table:not([border="1"]) td) {
    border-left: 1.5em solid transparent;
    border-top: 1.5em solid transparent;
  }

  .__html-blob-content-container__ :global(table:not([border="1"]) td:first-child) {
    border-left: 0;
  }

  .__html-blob-content-container__ :global(table:not([border="1"]) tr:first-child td) {
    border-top: 0;
  }

  .__html-blob-content-container__ :global(a) {
    text-decoration: none;
    color: #337ab7;
    font-weight: bold;
  }

  .__html-blob-content-container__ :global(sup) {
    font-size: 0.8em !important;
    top: 0.3em; 
  }

  .__html-blob-content-container__ :global(sub) {
    bottom: -1.35em;
    font-size: 0.8em !important;
    padding-left: 0px !important;
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
