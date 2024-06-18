import { createStore } from 'vuex';
import emojis from './emojis';

export default createStore({
    modules: {
        emojis,
    }
})