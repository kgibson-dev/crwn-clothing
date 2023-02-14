import { initializeApp } from "firebase/app"
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
} from "firebase/auth"

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"

const firebaseConfig = {
	apiKey: "AIzaSyB3Y_vqywjkJqnSyyomJRQJuUh4STdsfFg",
	authDomain: "crwn-clothing-db-e8087.firebaseapp.com",
	projectId: "crwn-clothing-db-e8087",
	storageBucket: "crwn-clothing-db-e8087.appspot.com",
	messagingSenderId: "232961176796",
	appId: "1:232961176796:web:1ff4ace977628372c63019",
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
	prompt: "select_account",
})

export const auth = getAuth()
export const singInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const singInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)


export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef)

    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
			})
		} catch (error) {
             console.log('error creating user', error.message)
        } 

    }
    return userDocRef
}