export function rootReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_LS':
      const filed = Object.keys(action.data.value).join('')
      const pervState = action.data.value[filed]
      return { ...state, [filed]: pervState }
    default: return state
  }
}
