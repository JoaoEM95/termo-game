<template>
  <div v-if="indexa == atualRound && !youWin" class="flexColumn">
    <input
      type="text"
      maxlength="1"
      v-model="$store.state._firstLetter"
      :style="{
        backgroundColor: localConfirm
          ? getColor($store.state._firstLetter, 0)
          : '',
      }"
      :disabled="indexa !== atualRound || youWin"
    />
    <input
      type="text"
      maxlength="1"
      v-model="$store.state._secondLetter"
      :style="{
        backgroundColor: localConfirm
          ? getColor($store.state._secondLetter, 1)
          : '',
      }"
      :disabled="indexa !== atualRound || youWin"
    />
    <input
      type="text"
      maxlength="1"
      v-model="$store.state._thirdLetter"
      :style="{
        backgroundColor: localConfirm
          ? getColor($store.state._thirdLetter, 2)
          : '',
      }"
      :disabled="indexa !== atualRound || youWin"
    />
    <input
      type="text"
      maxlength="1"
      v-model="$store.state._fourthLetter"
      :style="{
        backgroundColor: localConfirm
          ? getColor($store.state._fourthLetter, 3)
          : '',
      }"
      :disabled="indexa !== atualRound || youWin"
    />
    <input
      type="text"
      maxlength="1"
      v-model="$store.state._fifthLetter"
      :style="{
        backgroundColor: localConfirm
          ? getColor($store.state._fifthLetter, 4)
          : '',
      }"
      :disabled="indexa !== atualRound || youWin"
    />
  </div>

  <div v-else class="flexColumn">
    <input
      type="text"
      maxlength="1"
      v-model="firstLetter"
      :style="{ backgroundColor: localConfirm ? getColor(firstLetter, 0) : '' }"
      disabled
    />
    <input
      type="text"
      maxlength="1"
      v-model="secondLetter"
      :style="{
        backgroundColor: localConfirm ? getColor(secondLetter, 1) : '',
      }"
      disabled
    />
    <input
      type="text"
      maxlength="1"
      v-model="thirdLetter"
      :style="{ backgroundColor: localConfirm ? getColor(thirdLetter, 2) : '' }"
      disabled
    />
    <input
      type="text"
      maxlength="1"
      v-model="fourthLetter"
      :style="{
        backgroundColor: localConfirm ? getColor(fourthLetter, 3) : '',
      }"
      disabled
    />
    <input
      type="text"
      maxlength="1"
      v-model="fifthLetter"
      :style="{ backgroundColor: localConfirm ? getColor(fifthLetter, 4) : '' }"
      disabled
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    confirm: { type: Boolean, default: false },
    indexa: { type: Number, default: 0 },
    atualRound: { type: Number, default: 0 },
    testeWord: String,
    numberTerm: Number,
    deuCerto: false,
  },
  data() {
    return {
      typedWord: [],
      firstLetter: "",
      secondLetter: "",
      thirdLetter: "",
      fourthLetter: "",
      fifthLetter: "",
      localConfirm: false,
      youWin: false,
    };
  },
  computed: {
    ...mapGetters(["word", "winners"]),
  },
  watch: {
    confirm() {
      let verifyWinner = this.winners.indexOf(this.numberTerm);
      if (verifyWinner == -1) {
        if (this.confirm && this.indexa == this.atualRound) {
          this.localConfirm = true;
          this.confirmSelection();
        }
      } else {
        this.youWin = true;
      }
    },
  },
  methods: {
    confirmSelection() {
      this.$store.dispatch("addWord");
      setTimeout(() => {
        if (this.word.toUpperCase() == this.testeWord.toUpperCase()) {
          this.$store.dispatch("addWinner", this.numberTerm);
        }
      }, 10);
      this.getCopyLetters();

      setTimeout(() => {
        this.$store.dispatch("resetLetters");
      }, 1);

      setTimeout(() => {
        this.$emit("confirmSelection");
      }, 500);
    },
    verifyLetters(letter) {
      let numOfLetters = 0;
      let position = [];
      let letters = this.testeWord.split("");
      for (let i = 0; i < 5; i++) {
        if (letter == letters[i]) {
          numOfLetters++;
          position.push(i);
        }
      }
      return { numOfLetters, position };
    },
    getColor(letter = "", position) {
      let color = "gray";
      let letters = this.testeWord.split("");
      if (letter.toUpperCase() == this.testeWord[position].toUpperCase()) {
        color = "#43CD80";
      } else if (letters.indexOf(letter) !== -1) {
        color = "yellow";
      }
      return color;
    },
    getCopyLetters() {
      if (this.indexa == this.atualRound) {
        this.firstLetter = this.word[0].toUpperCase();
        this.secondLetter = this.word[1].toUpperCase();
        this.thirdLetter = this.word[2].toUpperCase();
        this.fourthLetter = this.word[3].toUpperCase();
        this.fifthLetter = this.word[4].toUpperCase();
      }
    },
  },
};
</script>

<style scoped>
input {
  height: 50px;
  width: 50px;
  font-size: 40px;
  text-align: center;
  border-radius: 10px;
  margin-right: 5px;
  background-color: darkgray;
  border-style: solid;
  border-width: 5px;
  border-color: #312a2c;
}
.flexColumn {
  display: flex;
  flex-direction: row;
  margin: 5px;
}
</style>