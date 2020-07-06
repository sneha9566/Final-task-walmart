import {
  FETCH_CARD_REQUEST,
  FETCH_CARD_SUCCESS,
  FETCH_CARD_FAILURE
} from './cardTypes'

const initialState = {
  loading: false,
  cardresponse: [],
  error: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CARD_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_CARD_SUCCESS:
      return {
        loading: false,
        cards: action.payload,
        error: ''
      }
    case FETCH_CARD_FAILURE:
      return {
        loading: false,
        cards: [],
        error: action.payload
      }
    default: return state
  }
}

export default reducer
