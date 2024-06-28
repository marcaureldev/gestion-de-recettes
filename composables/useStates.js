// export const useFirebaseUser = () => useState('firebaseUser', () => null);


import { ref } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const user = ref(null);
const photoUrl = ref(null);

export const useFirebaseUser = () => {
    const auth = getAuth();
    const db = getFirestore();

    onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
            user.value = firebaseUser;
            const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                photoUrl.value = userData.photoURL || null; // Assurez-vous que le champ photoURL est bien défini dans Firestore
            }
        } else {
            user.value = null;
            photoUrl.value = null;
        }
    });

    return { user, photoUrl };
};
