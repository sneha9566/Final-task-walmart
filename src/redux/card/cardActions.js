import axios from 'axios'
import {
  FETCH_CARD_REQUEST,
  FETCH_CARD_SUCCESS,
  FETCH_CARD_FAILURE
} from './cardTypes'

export const fetchCards = (value) => {
  return (dispatch) => {
    dispatch(fetchCardsRequest())
    axios
      .get(`https://mobile-tha-server-8ba57.firebaseapp.com/walmartproducts/${value}/8`)
      .then(response => {
        // response.data is the users
        const cards = response.data.products
        dispatch(fetchCardsSuccess(cards))
        
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchCardsFailure(error.message))
      })
  }
}

export const fetchCardsRequest = () => {
  return {
    type:  FETCH_CARD_REQUEST,
  }
}

export const fetchCardsSuccess = cards => {
  return {
    type: FETCH_CARD_SUCCESS,
    payload: cards
  }
}

export const fetchCardsFailure = error => {
  return {
    type: FETCH_CARD_FAILURE,
    payload: error
  }
}
