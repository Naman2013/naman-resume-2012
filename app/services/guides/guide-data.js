import axios from 'axios';

export const GUIDE_ENDPOINT_URL = '/api/page/guide';
export const GUIDES_PAGE_ENDPOINT_URL = '/api/page/guidesHub';
export const GUIDES_ENDPOINT_URL = '/api/guides/getGuides';
export const GUIDE_PANEL_ENDPOINT_URL = '/api/guides/getGuidePanels';
export const GUIDE_OBJECTS_ENDPOINT_URL = '/api/guides/getGuideObjects';
export const GUIDE_PANEL_IMAGE_ENDPOINT_URL = '/api/page/contentPanelImage';

export default function fetchGuideDataService({ token, at, cid, guideId }) {
  return axios.post('/api/page/guide', {
    token,
    at,
    cid,
    guideId,
  });
}

export const fetchImageDetailsService = ({ customerImageId }) => (
  dispatch,
  getState
) => {
  const { at, token, cid } = getState().user;
  dispatch(fetchMyPicturesImageDetailsStart());

  return axios
    .post('/api/images/getImageDetails', {
      at,
      cid,
      token,
      customerImageId,
    })
    .then(result =>
      dispatch(
        fetchMyPicturesImageDetailsSuccess(
          Object.assign({ customerImageId }, result.data)
        )
      )
    )
    .catch(error => dispatch(fetchMyPicturesImageDetailsFail(error)));
};
