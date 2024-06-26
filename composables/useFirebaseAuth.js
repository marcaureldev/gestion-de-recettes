import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

//Fonction pour créer un nouvel utilisateur lors de sa première inscription 

export const createUser = async (email, password, additionalData) => {
    const auth = getAuth();
    const db = getFirestore();
    try {
        const credentials = await createUserWithEmailAndPassword(auth, email, password);
        const user = credentials.user;

        // Stocker les informations supplémentaires dans Firestore
        await setDoc(doc(db, 'users', user.uid), {
            email: user.email,
            ...additionalData
        });

        return credentials;
    } catch (error) {
        throw error; // Propager l'erreur
    }
}

//Fonction pour connecter un utilisateur déjà existant 

export const signInUser = async (email, password) => {
    const auth = getAuth();
    try {
        const credentials = await signInWithEmailAndPassword(auth, email, password);
        return credentials;
    } catch (error) {
        throw error; // Propager l'erreur
    }
}

//Fonction pour définir un observateur d'état d'authentification et obtenir les données utilisateur

export const initUser = async () => {
    const auth = getAuth();
    const firebaseUser = useFirebaseUser();
    firebaseUser.value = auth.currentUser;
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // Récupérer les informations utilisateur supplémentaires
            const userData = await getUserData(user.uid);
            firebaseUser.value = { ...user, ...userData };
        } else {
            console.log('User is signed out');
            firebaseUser.value = null;
        }
    });
}


// Fonction pour récupérer les informations utilisateur supplémentaires
export const getUserData = async (uid) => {
    const db = getFirestore();
    try {
        const userDoc = await getDoc(doc(db, 'users', uid));
        if (userDoc.exists()) {
            return userDoc.data();
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        throw error;
    }
}


//Fonction pour déconnecter un utilisateur

export const signOutUser = async () => {
    const auth = getAuth();
    try {
        await signOut(auth);
        // Sign-out successful.
    } catch (error) {
        throw error;
    }
}


//Fonction pour inscrire un utilisateur avec google 

export const signUpWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const db = getFirestore();

    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Vérifiez si l'utilisateur existe déjà dans Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (!userDoc.exists()) {
            // Stocker les informations utilisateur dans Firestore si l'utilisateur n'existe pas déjà
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                nom: user.displayName.split(' ')[1] || "",
                prenom: user.displayName.split(' ')[0] || "",
                numero: "" // Champ vide ou à définir selon vos besoins
            });
        }

        return result;
    } catch (error) {
        console.error('Error during Google sign in:', error);
        throw error;
    }
};

//