import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyCEfpM6q9uyOrg33qKm5h08FmP4pvAkeZU",
  authDomain: "crwn-db-e13d9.firebaseapp.com",
  databaseURL: "https://crwn-db-e13d9.firebaseio.com",
  projectId: "crwn-db-e13d9",
  storageBucket: "",
  messagingSenderId: "735741395997",
  appId: "1:735741395997:web:acd93eaa3bfed6ec"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get();
  if(!snapShot.exists){
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch(error){
        console.log('error creating user')
    }
  }
  return userRef;
}

firebase.initializeApp(config)


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt: 'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;