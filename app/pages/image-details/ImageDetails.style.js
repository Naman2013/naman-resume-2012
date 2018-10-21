import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import { astronaut, romance, shadows, seashell } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenMedium, screenLarge } from 'styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'styles/mixins/utilities';

export default css`

.root {
  width: 100%;
  font-family: ${primaryFont};
  color: ${astronaut};
  background-color: ${seashell};
}



.is-hidden {
  visibility: hidden;
}

.obs-img-container {
  text-align: center;
  padding: 0;
  background-color: ${romance};
  ${dropShadowContainer}
}

.obs-header {
  padding: 50px;
}

.obs-img-header {
  padding: 25px;
  font-size: 10px;
  font-weight: bold;
  text-transform: uppercase;

}

.obs-img-subheader {
  font-family: ${secondaryFont};
  font-size: 40px;

}

.obs-image-container {
  width: 100%;
}

.obs-image {
  ${backgroundImageCover}
  background-position: center;
  margin: 0 auto;
  margin-bottom: 20px;
  display: block;
  width: 100%;
  max-width: 800px;
}

.obs-image:before {
  display: block;
  content: "";
  width: 100%;
  padding-top: 68.49%;
}
.content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.object-details {
  display: none;
}

@media ${screenMedium} {

  .object-details {
    display: block;
  }


}

`;
