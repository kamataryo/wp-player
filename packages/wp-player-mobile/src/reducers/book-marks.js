import URLList from '../../assets/initial-url-list.json'

export const initialState = {
  data: URLList,
}

export const bookMarksReducer = (state = initialState, action) => {
  const { type } = action

  return state
}

export default bookMarksReducer
