import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    updateProfile,
} from "firebase/auth";

import { getFirestore, collection, doc, setDoc, getDoc, updateDoc, getDocs, query, orderBy } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Fonction pour créer un nouvel utilisateur lors de sa première inscription

export const createUser = async (email, password, additionalData, avatarUrl) => {
    const auth = getAuth();
    const db = getFirestore();
    const storage = getStorage();
    try {
        const credentials = await createUserWithEmailAndPassword(auth, email, password);
        const user = credentials.user;

        // Stocker l'avatar dans Firebase Storage
        let photoURL = null;
        if (avatarUrl) {
            const storageRef = ref(storage, `avatars/${user.uid}/${avatarUrl.name}`);
            await uploadBytes(storageRef, avatarUrl);
            photoURL = await getDownloadURL(storageRef);
        }

        // Stocker les informations supplémentaires dans Firestore
        await setDoc(doc(db, 'users', user.uid), {
            email: user.email,
            ...additionalData,
            photoURL,
        });

        return credentials;
    } catch (error) {
        throw error; // Propager l'erreur
    }
}

// Fonction pour connecter un utilisateur déjà existant

export const signInUser = async (email, password) => {
    const auth = getAuth();
    try {
        const credentials = await signInWithEmailAndPassword(auth, email, password);
        return credentials;
    } catch (error) {
        throw error; // Propager l'erreur
    }
}

// Fonction pour définir un observateur d'état d'authentification et obtenir les données utilisateur

export const initUser = async () => {
    const auth = getAuth();
    const firebaseUser = useFirebaseUser();
    firebaseUser.value = auth.currentUser;
    onAuthStateChanged(auth, async (user) => {
        if (user) {
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
            const userData = userDoc.data();
            return {
                ...userData,
                photoURL: userData.photoURL || null, // Assurez-vous que photoURL est défini ou null si non défini
            };
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        throw error;
    }
}

// Fonction pour déconnecter un utilisateur
export const signOutUser = async () => {
    const auth = getAuth();
    try {
        await signOut(auth);
        // Sign-out successful.
    } catch (error) {
        throw error;
    }
}

// Fonction pour inscrire un utilisateur avec Google
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

// Fonction pour mettre à jour les informations de l'utilisateur
export const updateUser = async (uid, updatedData) => {
    const db = getFirestore();
    try {
        await updateDoc(doc(db, 'users', uid), updatedData);
        console.log("User information updated successfully!");
    } catch (error) {
        console.error("Error updating user information: ", error);
        throw error;
    }
};

//Fonction pour changer la photo de profil de l'utilisateur

export const updateProfilePhoto = async (uid, file) => {
    const storage = getStorage();
    const auth = getAuth();
    const user = auth.currentUser;
    try {
        const fileRef = ref(storage, `avatars/${uid}/${file.name}`);
        const snapshot = await uploadBytes(fileRef, file);
        const photoURL = await getDownloadURL(snapshot.ref);
        await updateProfile(user, { photoURL });

        // Mettre à jour Firestore avec la nouvelle URL de la photo
        await updateDoc(doc(getFirestore(), 'users', uid), { photoURL });

        return photoURL;
    } catch (error) {
        throw error;
    }
};

// Fonction pour ajouter un recette dans la base de  donnée

export const addRecipe = async (recipeData, image) => {
    const auth = getAuth();
    const db = getFirestore();
    const storage = getStorage();
    try {
        let imageURL = null;
        if (image) {
            const storageRef = ref(storage, `recettes/${auth.currentUser.uid}/${image.name}`);
            await uploadBytes(storageRef, image);
            imageURL = await getDownloadURL(storageRef);
        }

        const newRecipeRef = doc(collection(db, "recettes")); // Generate a new document reference
        await setDoc(newRecipeRef, {
            ...recipeData,
            imageURL,
        });
        console.log("Recipe added successfully!");
    } catch (error) {
        console.error("Error adding document: ", error);
        throw error;
    }
};

// Fonction pour récupérer toutes les recettes

export const getAllRecipes = async () => {
    const db = getFirestore();
    try {
        const recipesQuery = query(
            collection(db, 'recettes'),
        );
        
        const querySnapshot = await getDocs(recipesQuery);
        
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate().toLocaleDateString() || 'Date inconnue'
        }));
    } catch (error) {
        console.error('Erreur lors de la récupération des recettes:', error);
        throw new Error('Impossible de récupérer les recettes');
    }
};

// Fonction pour récupérer une recette spécifique par son ID
export const getRecipeById = async (recipeId) => {
    const db = getFirestore();
    try {
        const recipeRef = doc(db, 'recettes', recipeId)
        const recipeDoc = await getDoc(recipeRef);
        
        if (!recipeDoc.exists()) {
            return null;
        }

        return {
            id: recipeDoc.id,
            ...recipeDoc.data(),
            createdAt: recipeDoc.data().createdAt?.toDate().toLocaleDateString() || 'Date inconnue'
        };
    } catch (error) {
        console.error('Erreur lors de la récupération de la recette:', error);
        throw new Error('Impossible de récupérer la recette');
    }
};
