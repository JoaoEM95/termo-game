import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'


const store = createStore({
    state: {
        _word: 'TESTE',
        _winners: []
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
        setWord(state, data) {
            state._word = data;
        },
        setWinner(state, data) {
            state._winners.push(data);
        },

    },
    actions: {
        addWord({ commit }, data) {
            commit('setWord', data)
        },
        addWinner({ commit }, data) {
            commit('setWinner', data)

        }
    }
})

const app = createApp(App)
app.use(store)
app.mount('#app')