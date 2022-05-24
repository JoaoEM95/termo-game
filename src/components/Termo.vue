<template>
  <div class="back">
    <div>{{ jogo }}</div>
    <button @click="game('TERMO',6,1)">TERMO</button>
    <button @click="game('DUETO',7,2)">DUETO</button>
    <button @click="game('TRIETO',8,3)">TRIETO</button>
    <button @click="game('QUARTETO',9,4)">QUARTETO</button>
    <button @click="game('QUINTETO',10,5)">QUINTETO</button>

    <div class="flex-row">
      <div class="flex-column" v-for="n in numberOfTerms" :key="n">
        <Letters
          v-for="chances in maxChances"
          :key="chances"
          :confirm="confirm"
          :indexa="chances"
          :atualRound="atualRound"
          :testeWord="testWords[n - 1]"
          :numberTerm="n"
          @confirmSelection="confirm = false"
        />
      </div>
    </div>

    <button @click="handleConfirm()">CONFIRMAR</button>

    <div>Atual round: {{ atualRound }}</div>
  </div>
</template>

<script>
import Letters from "./Letters.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    Letters,
  },
  data() {
    return {
      confirm: false,
      maxChances: 6,
      atualRound: 1,
      testWords: ["PODER", "MORAL", "BOLSO", "TEAMO","LINDA"],
      jogo: "TERMO",
      numberOfTerms: 1,
    };
  },
  computed: {
    ...mapGetters(["word"]),
  },
  methods: {
    handleConfirm() {
      setTimeout(() => {
        this.atualRound = this.atualRound + 1;
      }, 1000);
      this.confirm = true;
    },
    game(name,chances,terms) {
      this.jogo = name;
      this.maxChances = chances;
      this.atualRound = 1;
      this.numberOfTerms = terms;
    },
  },
};
</script>

<style>
body{
 background-color: #504a4b;
}
button {
  margin: 20px;
  color: green;
  font-weight: 600;
  height: 50px;
  width: 200px;
  font-size: 30px;
  background: darkgray;
}
.flex-column {
  display: flex;
  flex-direction: column;
  margin-right: 50px;
  border: solid;
  border-radius: 10px;
  padding: 10px;
}
.flex-row {
  display: flex;
  flex-direction: row;
}
</style>