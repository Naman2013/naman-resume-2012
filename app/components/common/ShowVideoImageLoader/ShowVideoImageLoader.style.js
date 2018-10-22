import css from 'styled-jsx/css';

export default css`
.video-image-loader.clipped {

  width: 250px;
  height: 250px;
  margin: 0 auto;
  overflow: hidden;
  -webkit-clip-path: circle(115px at center);
  -moz-clip-path: circle(115px);
  clip-path: circle(115px, 115px, 115px);

}

.video-image-loader.clipped .video-iframe {
  position: relative;
  left: -40%;
}

`;
