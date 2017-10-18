import pollySagas from './polly'

export default function* rootSaga() {
  yield* pollySagas
}
