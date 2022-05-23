<template>
  <div class="flexColumn">
    <div>
    </div>
    <input
      type="text"
      maxlength="1"
      v-model="firstLetter"
      :style="{ backgroundColor: localConfirm ? getColor(firstLetter, 0) : '' }"
      :disabled="indexa !== atualRound"
    />
    <input
      type="text"
      maxlength="1"
      v-model="secondLetter"
      :style="{
        backgroundColor: localConfirm ? getColor(secondLetter, 1) : '',
      }"
      :disabled="indexa !== atualRound"
    />
    <input
      type="text"
      maxlength="1"
      v-model="thirdLetter"
      :style="{ backgroundColor: localConfirm ? getColor(thirdLetter, 2) : '' }"
      :disabled="indexa !== atualRound"
    />
    <input
      type="text"
      maxlength="1"
      v-model="fourthLetter"
      :style="{
        backgroundColor: localConfirm ? getColor(fourthLetter, 3) : '',
      }"
      :disabled="indexa !== atualRound"
    />
    <input
      type="text"
      maxlength="1"
      v-model="fifthLetter"
      :style="{ backgroundColor: localConfirm ? getColor(fifthLetter, 4) : '' }"
      :disabled="indexa !== atualRound"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    confirm: { type: Boolean, default: false },
    indexa: { type: Number, default: 0 },
    atualRound: { type: Number, default: 0 },
    testeWord:''
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
      index: undefined,
    };
  },
  computed: {
    ...mapGetters(["word"]),
  },
  watch: {
    confirm() {
      if (this.confirm && this.indexa == this.atualRound) {
        this.localConfirm = true;
        this.confirmSelection();
        this.addWord();
        this.compareWord();
      }
    },
  },
  methods: {
    confirmSelection() {
      const atualWord =
        this.firstLetter +
        this.secondLetter +
        this.thirdLetter +
        this.fourthLetter +
        this.fifthLetter;
      this.typedWord.push(atualWord);
      if (atualWord == this.testeWord) {
        setTimeout(() => {
          alert("Acertou, parabens!");
        }, 1000);
      }
      setTimeout(() => {
        this.$emit("confirmSelection");
      }, 1000);
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
      if (letter == this.testeWord[position]) {
        color = "green";
      } else if (letters.indexOf(letter) !== -1) {
        color = "yellow";
      }
      return color;
    },
    addWord() {
      setTimeout(() => {
        if (this.indexa == this.atualRound && this.firstLetter.length) {
          const atualWord =
            this.firstLetter +
            this.secondLetter +
            this.thirdLetter +
            this.fourthLetter +
            this.fifthLetter;
          this.$store.dispatch("addWord", atualWord);
        }
      }, 500);
    },
    compareWord() {
      if (this.indexa == this.atualRound) {
        setTimeout(() => {
          console.log("teste2");
          console.log(this.word);
          this.firstLetter = this.word[0];
          this.secondLetter = this.word[1];
          this.thirdLetter = this.word[2];
          this.fourthLetter = this.word[3];
          this.fifthLetter = this.word[4];
        }, 700);
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
  background-color:darkgray;
  border-style: solid;
  border-width: 5px;
  border-color: #312a2c;
}
.flexColumn{
  display: flex;
  flex-direction: row;
  margin: 5px;
}

</style>