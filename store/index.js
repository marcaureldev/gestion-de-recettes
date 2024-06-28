// store/index.js
import { reactive } from 'vue';

const state = reactive({
    user: {
        uid: '',
        email: '',
        nom: '',
        prenom: '',
        numero: '',
        photoURL: ''
    }
});

const setUser = (userData) => {
    state.user = { ...state.user, ...userData };
};

const updatePhotoURL = (photoURL) => {
    state.user.photoURL = photoURL;
};

export { state, setUser, updatePhotoURL };
