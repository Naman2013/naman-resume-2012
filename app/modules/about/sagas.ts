import { takeLatest, select, call, put } from 'redux-saga/effects';
import { getAboutDataApi, getSectionApi } from 'app/modules/about/api';
import { SagaIterator } from '@redux-saga/core';
import { TYPE, ACTION } from './reducer';

export default function* watchAbout() {
  yield takeLatest(TYPE.GET_ABOUT_DATA, getAboutData);
  yield takeLatest(TYPE.GET_SECTION_DATA, getSectionData);
  yield takeLatest(TYPE.GET_SUB_SECTION_DATA, getSubSectionData);
}

export function* getAboutData(action: any): SagaIterator {
  try {
    const { at, token, cid } = yield select(state => state.user);
    const payload = { at, token, cid, ...action.payload };
    const resp = yield call(getAboutDataApi, payload);
    yield put(ACTION.getAboutDataSuccess(resp.data));
  } catch (error) {
    yield put(ACTION.getAboutDataError(error));
  }
}

export function* getSectionData(action: any): SagaIterator {
  try {
    const { at, token, cid } = yield select(state => state.user);
    const payload = { at, token, cid, ...action.payload };
    const resp = yield call(getSectionApi, payload);
    yield put(ACTION.getSectionDataSuccess(resp.data));

    if (resp.data.subMenuCount) {
      const { linkUrl } = resp.data.subMenuItems[0];
      const sectionTag = linkUrl.substr(linkUrl.lastIndexOf('/') + 1);

      yield put(
        ACTION.getSubSectionData({
          sectionTag,
        })
      );
    }
  } catch (error) {
    yield put(ACTION.getSectionDataError(error));
  }
}

export function* getSubSectionData(action: any): SagaIterator {
  try {
    const { at, token, cid } = yield select(state => state.user);
    const payload = { at, token, cid, ...action.payload };
    const resp = yield call(getSectionApi, payload);
    yield put(ACTION.getSubSectionDataSuccess(resp.data));
  } catch (error) {
    yield put(ACTION.getSubSectionDataError(error));
  }
}
