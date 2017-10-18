import { fork, call, take, put } from 'redux-saga/effects'
import { Types as POLLY_ACTION_TYPES } from 'reducers/actions/polly'
import getProfile from 'api/profile/get'

export function* handleRequestGetPoly() {
  while (true) {
    const action = yield take(GET_PROFILE_TYPES.REQUEST)
    const { username } = action.payload
    const result = yield call(getProfile(username), action)
    if (!result.ng) {
      yield put({ type: GET_PROFILE_TYPES.SUCCESS, payload: result })
    } else {
      yield put({ type: GET_PROFILE_TYPES.FAILURE })
    }
  }
}

export function* handleSuccessGetPoly() {
  while (true) {
    const { payload } = yield take(GET_PROFILE_TYPES.SUCCESS)
    yield put({ type: 'SOME ACTION WHEN SUCCESS' })
  }
}

export function* handleFailureGetPoly() {
  while (true) {
    const { payload } = yield take(GET_PROFILE_TYPES.FAILURE)
    yield put({ type: 'SOME ACTION WHEN FAILURE' })
  }
}

export default [
  fork(handleRequestGetPoly),
  fork(handleSuccessGetPoly),
  fork(handleFailureGetPoly),
]
