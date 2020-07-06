import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCXgId72NG-gOesAZpuEXXCv1sW41ddbmQ",
  authDomain: "assignment-2d590.firebaseapp.com",
  databaseURL: "https://assignment-2d590.firebaseio.com",
  projectId: "assignment-2d590",
  storageBucket: "assignment-2d590.appspot.com",
  messagingSenderId: "190898282449",
  appId: "1:190898282449:web:08a55a0f1d7865f0758af0",
  measurementId: "G-L3QTQ30WJ8"
};

class Firebase {
	constructor() {
		app.initializeApp(firebaseConfig)
		this.auth = app.auth()
		this.db = app.firestore()
	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}

	logout() {
		return this.auth.signOut()
	}

	async register(name, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password)
		return this.auth.currentUser.updateProfile({
			displayName: name
		})
	}

	addQuote(quote) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).set({
			quote
		})
	}

	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName
	}

	async getCurrentUserQuote() {
		const quote = await this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).get()
		return quote.get('quote')
	}
}

export default new Firebase()