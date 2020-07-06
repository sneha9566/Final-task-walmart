import { combineReducers } from 'redux'
import reducer from './card/cardReducer'

const rootReducer = combineReducers({
  card: reducer
})

export default rootReducer
