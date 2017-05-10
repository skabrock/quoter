const initialState = [];

export default function history (state = initialState, action) {
  if (action.type === 'ADD_TO_HISTORY') {
    return [
      ...state,
      action.payload
    ]
  }
  return state;
}
