import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'


const store = createStore({
    state: {
        _word: '',
        _winners: [],
        _firstLetter: "",
        _secondLetter: "",
        _thirdLetter: "",
        _fourthLetter: "",
        _fifthLetter: "",
    },
    getters: {
        word(state) {
            return state._word;
        },
        winners(state) {
            return state._winners;
        }
    },
    mutations: {
        setWord(state) {
            state._word = state._firstLetter +
                state._secondLetter +
                state._thirdLetter +
                state._fourthLetter +
                state._fifthLetter;
        },
        setWinner(state, data) {
            state._winners.push(data);
        },
        reset(state) {
            state._firstLetter = "";
            state._secondLetter = "";
            state._thirdLetter = "";
            state._fourthLetter = "";
            state._fifthLetter = "";
        }

    },
    actions: {
        addWord({ commit }) {

            commit('setWord')
        },
        addWinner({ commit }, data) {
            commit('setWinner', data)

        },
        resetLetters({ commit }) {
            commit("reset")
        }
    }
})

const app = createApp(App)
app.use(store)
app.mount('#app')