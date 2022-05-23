import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'


const store = createStore({
    state: {
        _word: 'TESTE'
    },
    getters: {
        word(state) {
            return state._word;
        }
    },
    mutations: {
        setWord(state, data) {
            state._word = data;
        },

    },
    actions: {
        addWord({commit},data){
            commit('setWord',data)
        }
    }
})

const app = createApp(App)
app.use(store)
app.mount('#app')