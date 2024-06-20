import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth";

//Fonction pour créer un nouvel utilisateur lors de sa première inscription 

export const createUser = async (email: string, password: string) => {
    const auth = getAuth();
    try {
        const credentials = await createUserWithEmailAndPassword(auth, email, password);
        return credentials;
    } catch (error) {
        throw error; // Propager l'erreur
    }
}

//Fonction pour connecter un utilisateur déjà existant 

export const signInUser = async (email: string, password: string) => {
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
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            console.log(user);
        } else {
            console.log('User is signed out');
        }
    });
}

//Fonction pour déconnecter un utilisateur

export const signOutUser = async () => {
    const auth = getAuth();
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        throw error;
    });

}

//Fonction pour inscrire un utilisateur avec google 

export const signUpWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    try {
        const result = await signInWithPopup(auth, provider);
        return result
    } catch (error) {
        console.error('Error during Google sign in:', error);
        throw error;
    }
};

//

