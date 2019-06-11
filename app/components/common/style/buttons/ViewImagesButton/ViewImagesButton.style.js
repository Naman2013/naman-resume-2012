import css from 'styled-jsx/css';
import { astronaut, romance } from 'app/styles/variables/colors_tiles_v4';
import { primaryFont } from 'app/styles/variables/fonts';

export default css`
  .modal-img-wrapper {
    background-color: #fff;
    padding: 50px;
    margin: auto;
    display: inline-block;
    max-width: 100%;
  }
  .modal-img-wrapper img {
    max-width: 100%;
    max-height: calc(100vh - 100px - 100px);
  }

  :global(.view-uploaded-image-modal.custom-modal-backdrop) {
    z-index: 10060;
  }

  :global(.view-uploaded-image-modal.modal) {
    z-index: 10070;
  }
`;
