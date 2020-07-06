import React , { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import './App.css'
import PaginationControlled from './components/Pagination'
import { CircularProgress } from '@material-ui/core'
import HomePage from './components/HomePage'
import Login from './components/Login'
import Register from './components/Register'
import store from './redux/store'
import Skeleton from '@material-ui/lab/Skeleton';
import firebase from './components/firebase'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CardContainer from './components/CardContainer'
import Productdetails from './components/Productdetails'
import ProductslistNext from './components/ProductslistNext'

function App () {

  const [firebaseInitialized, setFirebaseInitialized] = useState(false)

	useEffect(() => {
		firebase.isInitialized().then(val => {
			setFirebaseInitialized(val)
		})
	})
  return firebaseInitialized !== false ? (
    <Provider store={store}>
    <Router>
        <Switch>
            <Route path="/main" exact component={CardContainer}/>
            <Route path="/" exact component={HomePage}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/register" exact component={Register}/>
            <Route path="/ProductslistNext/" component={ProductslistNext} />
            <Route path="/Productsdetails/:id" component={Productdetails} />
       </Switch>
      </Router>
    </Provider>
  ) : <div id="loader"><Skeleton /></div>
}

export default App
